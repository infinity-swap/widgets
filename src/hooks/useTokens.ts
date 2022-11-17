import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Principal } from "@dfinity/principal";
import useCanisterIds from "./useCanisterIds";
import {
  idlFactory as TokenFactoryIDL,
  _SERVICE as TokenFactoryService,
} from "../ic/idl/token_factory/token_factory.did";
import {
  idlFactory as TokenIDL,
  _SERVICE as TokenService,
} from "../ic/idl/token/token.did";
import {
  idlFactory as LedgerIDL,
  _SERVICE as LedgerService,
} from "../ic/idl/ledger/ledger.did";
import usePools from "./usePools";
import { icNetworkType, PoolStatsType, Token } from "../types";
import {
  LEDGER_SYMBOLS,
  REAL_LEDGER_METADATA,
  TEST_LEDGER_METADATA,
} from "../shared/constants";
import Ic from "../ic";
import { getIcpPriceUSD } from "../utils";

interface fetchTokensProps {
  tokenFactory: string;
  ledger: string;
  ledgerTest: string;
  pools: PoolStatsType[];
}
interface useTokensWithUserBalanceType {
  principalId: string | null;
  accountIdentifier: string | null;
}
const fetchTokens = async ({
  tokenFactory,
  ledger,
  ledgerTest,
  pools,
}: fetchTokensProps) => {
  const ledgers = [];
  if (ledger) {
    ledgers.push({ id: ledger, ...REAL_LEDGER_METADATA });
  }
  if (ledgerTest) {
    ledgers.push({ id: ledgerTest, ...TEST_LEDGER_METADATA });
  }

  const ledgerIds = ledgers.map((l) => l.id);
  const tokenIdPrincipals = await Ic.actor<TokenFactoryService>(
    tokenFactory,
    TokenFactoryIDL
  ).get_all();
  let tokenIds = tokenIdPrincipals.map((tokenId) => tokenId.toText());
  const tokensInfo = await Promise.all(
    tokenIds.map((tokenId) => Ic.actor(tokenId, TokenIDL).get_token_info())
  );
  let tokensMetadata = tokensInfo.map(({ metadata, ...rest }: any) => {
    return { ...rest, ...metadata };
  });
  tokensMetadata = [...tokensMetadata, ...ledgers];

  tokenIds = [...tokenIds, ...ledgerIds];
  let tokens = tokenIds.map((tokenId, index) => {
    const tokenMeta = tokensMetadata[index];
    const notICP = !LEDGER_SYMBOLS.includes(tokenMeta.symbol);
    return {
      id: tokenId,
      ...tokenMeta,
      fee: notICP ? tokenMeta.fee : tokenMeta.fee,
      ...(notICP && { feeTo: tokenMeta.fee_to.toText() }),
      ...(notICP && { owner: tokenMeta.owner.toText() }),
    };
  });

  const icpPrice = await getIcpPriceUSD();
  if (pools.length) {
    tokens = tokens.map((token) => {
      if (token && token.id && !ledgerIds.includes(token.id)) {
        const [activePool] = pools.filter(
          (pool) =>
            (pool.token0 === token.id && ledgerIds.includes(pool.token1)) ||
            (ledgerIds.includes(pool.token0) && pool.token1 === token.id)
        );

        const token0_price = Number.isFinite(activePool?.token0_price)
          ? activePool?.token0_price
          : 0;
        const token1_price = Number.isFinite(activePool?.token1_price)
          ? activePool?.token1_price
          : 0;
        if (ledgerIds.includes(activePool?.token0))
          return { ...token, price: token0_price * icpPrice };
        if (ledgerIds.includes(activePool?.token1))
          return { ...token, price: token1_price * icpPrice };
      }
      if (ledgerIds.includes(token.id)) {
        return { ...token, price: icpPrice };
      }
      return { ...token, price: 0 };
    });
  } else {
    tokens = tokens.map((token) => ({ ...token, price: token.price ?? 0 }));
  }

  return tokens;
};

export default function useTokens() {
  const { ledger, ledgerTest, tokenFactory } = useCanisterIds();
  const pools = usePools();
  const { data } = useQuery(
    ["tokens", tokenFactory, ledger, ledgerTest],
    async () => fetchTokens({ tokenFactory, ledger, ledgerTest, pools }),
    { enabled: !!((ledger || ledgerTest) && tokenFactory) }
  );

  return data ?? [];
}

const getUserBalance = async (
  principal: string | null,
  accountId: string | null,
  token: Token
) => {
  let balance: number | bigint = 0;
  try {
    const isICP = LEDGER_SYMBOLS.includes(token?.symbol);
    if (isICP && accountId) {
      const { e8s = 0 } = await Ic.actor<LedgerService>(
        token.id,
        LedgerIDL
      ).account_balance_dfx({ account: accountId });
      balance = e8s;
    } else if (!isICP && principal) {
      const amount: bigint = await Ic.actor<TokenService>(
        token.id,
        TokenIDL
      ).icrc1_balance_of({
        owner: Principal.fromText(principal),
        subaccount: [],
      });
      balance = amount;
    }
  } catch (error) {}
  return balance;
};

export function useTokensWithUserBalance({
  principalId = null,
  accountIdentifier = null,
}: useTokensWithUserBalanceType) {
  const principal = principalId;
  const accountId = accountIdentifier;
  const tokens = useTokens();
  const [loading, setLoading] = useState(true);
  const [tokensWithBalance, setTokensWithBalance] = useState(() =>
    tokens.map((token) => ({ ...token, balance: 0 }))
  );

  useEffect(() => {
    let mounted = true;
    if ((principal || accountId) && tokens.length) {
      (async () => {
        const promises = tokens.map((token) => {
          return getUserBalance(principal, accountId, token);
        });
        const balances = await Promise.all(promises);
        if (mounted) {
          const tokensB = tokens.map((token, index) => ({
            ...token,
            balance: balances[index],
          }));
          setTokensWithBalance(tokensB);
          setLoading(false);
        }
      })();
    } else if (!principal && !accountId && tokens.length) {
      const btokens = tokens.map((token) => ({ ...token, balance: 0 }));
      setTokensWithBalance(btokens);
      setLoading(false);
    }

    return () => {
      mounted = false;
    };
  }, [principal, accountId, tokens]);

  return { tokens: tokensWithBalance, loading };
}
