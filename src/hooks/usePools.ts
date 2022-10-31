import { useQuery } from "react-query";
import useCanisterIds from "./useCanisterIds";

import {
  idlFactory as PairFactoryIDL,
  _SERVICE as PairFactoryService,
} from "../ic/idl/pair_factory/pair_factory.did";
import {
  idlFactory as TokenIDL,
  _SERVICE as TokenService,
} from "../ic/idl/token/token.did.js";
import {
  idlFactory as PairIDL,
  _SERVICE as PairService,
} from "../ic/idl/pair/pair.did";
import Ic from "../ic";
import { IC_ENVIRON } from "../shared/constants";
import { Principal } from "@dfinity/principal";
import { PoolStatsType } from "../types";
import { useMemo } from "react";

interface fetchPoolsProps {
  pairFactory: string;
  ledger: string;
  ledgerTest: string;
}

interface useFindPoolPayload {
  token0: string;
  token1: string;
  poolId: string;
  fetchWithTokens?: boolean;
}

const fetchPools = async ({
  pairFactory,
  ledger,
  ledgerTest,
}: fetchPoolsProps) => {
  const pairs: Principal[] = await Ic.actor<PairFactoryService>(
    pairFactory,
    PairFactoryIDL
  ).get_all();

  const pairStats = await Promise.all(
    pairs.map((pair) => Ic.actor<PairService>(pair.toText(), PairIDL).stats())
  );

  let pools: PoolStatsType[] = pairStats.map((stats: any, index) => ({
    id: pairs[index].toText(),
    token0: stats.token0.toText(),
    token1: stats.token1.toText(),
    owner: stats.owner,
    token1_reserve: stats.token1_reserve,
    token0_price: stats.token0_price,
    weights_are_changing: stats.weights_are_changing,
    weights: stats.weights,
    token0_reserve: stats.token0_reserve,
    token1_price: stats.token1_price,
    transit_amount: stats.transit_amount,
    last_tx_id: stats.last_tx_id,
    protocol_fee_enabled: stats.protocol_fee_enabled,
    weights_can_change: stats.weights_can_change,
    total_supply: stats.total_supply,
  }));

  const poolSymbols = await Promise.all(
    pools.map((pool) => {
      const promises = [pool.token0, pool.token1].map((token) => {
        if (ledger === token) {
          return Promise.resolve("ICP");
        }

        if (ledgerTest === token) {
          return Promise.resolve("T-ICP");
        }

        return Ic.actor<TokenService>(token, TokenIDL).icrc1_symbol();
      });
      return Promise.all(promises);
    })
  );

  pools = pools.map((pool, index) => {
    const [symbol0, symbol1] = poolSymbols[index];
    return {
      ...pool,
      symbol: `${symbol0} / ${symbol1}`,
    };
  });
  return pools;
};

export default function usePools() {
  const { pairFactory, ledger, ledgerTest } = useCanisterIds();
  const { data } = useQuery(
    ["pools", pairFactory, ledger, ledgerTest],
    async () => fetchPools({ pairFactory, ledger, ledgerTest }),
    {
      enabled: !!(
        pairFactory &&
        (IC_ENVIRON === "testnet" ? ledger && ledgerTest : ledgerTest)
      ),
    }
  );

  return data ?? [];
}

export function useFindPool({
  token0,
  token1,
  poolId,
  fetchWithTokens = false,
}: useFindPoolPayload) {
  const pools = usePools();
  const found = useMemo(() => {
    let selectedPool: PoolStatsType | undefined = pools[0]!;
    if (poolId && !fetchWithTokens) {
      selectedPool = pools.find((pool) => pool.id === poolId);
    } else if (token0 && token1) {
      const poolFound = pools.find((pool) => {
        return pool.token0 === token0 && pool.token1 === token1;
      });
      selectedPool = poolFound;
    }
    return selectedPool;
  }, [token0, token1, poolId, pools]);
  return found;
}
