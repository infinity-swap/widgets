import { useQuery } from "react-query";
import axios from "axios";

type CanisterIds = { [key: string]: string };

const extractCanisterIds = (data: CanisterIds) => {
  const canisterIds: CanisterIds = {};
  Object.entries(data).forEach(([key, value]) => {
    if (/ledger/.test(key)) {
      canisterIds.ledger = value;
    } else if (["token_factory", "is20-factory"].includes(key)) {
      canisterIds.token_factory = value;
    } else if (["pair_factory", "pair-factory"].includes(key)) {
      canisterIds.pair_factory = value;
    } else {
      canisterIds[key] = value;
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
