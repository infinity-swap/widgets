import { useEffect, useState } from "react";
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
import { PoolStatsType } from "../types";

interface fetchTokensProps {
  tokenFactory: string;
  ledger: string;
  ledgerTest: string;
  pools: PoolStatsType[];
}
const fetchTokens = ({
  tokenFactory,
  ledger,
  ledgerTest,
  pools,
}: fetchTokensProps) => {};

export default function useTokens() {
  const { ledger, ledgerTest, tokenFactory } = useCanisterIds();
  const pools = usePools();
  const { data } = useQuery(
    ["tokens", tokenFactory, ledger, ledgerTest],
    async () => fetchTokens({ tokenFactory, ledger, ledgerTest, pools }),
    { enabled: !!((ledger || ledgerTest) && tokenFactory) }
  );

  return [];
}
