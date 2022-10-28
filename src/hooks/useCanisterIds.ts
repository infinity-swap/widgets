import { useQuery } from "react-query";
import axios from "axios";
import { MAINNET_LEDGER_CANISTER_ID } from "../shared/constants";

type CanisterIds = { [key: string]: string };

const extractCanisterIds = (data: any) => {
  const canisterIds: CanisterIds = {
    ledger: MAINNET_LEDGER_CANISTER_ID,
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

export const fetchCanisterIds = async (url: string) => {
  try {
    const response = await axios.get(url);
    if (response.data) {
      const data = response.data ?? {};
      const ids = Object.fromEntries(
        Object.keys(data).map((key) => [
          key,
          data[key].local ? data[key].local : data[key],
        ])
      );

      return extractCanisterIds(ids);
    }
  } catch (_) {}
};

function useCanisterIds() {
  const url = process.env.REACT_APP_CANISTER_IDS_URL || "";
  const { data } = useQuery("canister_ids", async () => fetchCanisterIds(url));
  return data ?? {};
}

export default useCanisterIds;
