import { useQuery } from "react-query";
import axios from "axios";
import {
  CANISTER_IDS_URL,
  MAINNET_LEDGER_CANISTER_ID,
} from "../shared/constants";
import { ConnectWalletContext } from "../contexts/ConnectWallet";
import { useContext } from "react";
import { icNetworkType } from "../types";

type CanisterIds = { [key: string]: string };

const extractCanisterIds = (data: any, icNetwork: icNetworkType) => {
  const canisterIds: CanisterIds = {
    ledger: icNetwork?.MAINNET_LEDGER_CANISTER_ID,
  };
  Object.entries(data).forEach(([key, value]: any) => {
    const actualValue = value.local ? value.local : value;
    if (/ledger/.test(key)) {
      canisterIds.ledgerTest = actualValue;
    } else if (["token_factory", "is20-factory"].includes(key)) {
      canisterIds.tokenFactory = actualValue;
    } else if (["pair_factory", "pair-factory"].includes(key)) {
      canisterIds.pairFactory = actualValue;
    } else {
      canisterIds[key] = actualValue;
    }
  });
  return canisterIds;
};

export const fetchCanisterIds = async (icNetwork: icNetworkType) => {
  try {
    const url = icNetwork?.CANISTER_IDS_URL;
    const response = await axios.get(url);
    if (response.data) {
      const data = response.data ?? {};
      const ids = Object.fromEntries(
        Object.keys(data).map((key) => [
          key,
          data[key].local ? data[key].local : data[key],
        ])
      );

      return extractCanisterIds(ids, icNetwork);
    }
  } catch (_) {}
};

function useCanisterIds() {
  const { icNetwork } = useContext(ConnectWalletContext);
  const { data } = useQuery(
    "canister_ids",
    async () => fetchCanisterIds(icNetwork),
    {
      enabled: !!icNetwork,
    }
  );
  return data ?? {};
}

export default useCanisterIds;
