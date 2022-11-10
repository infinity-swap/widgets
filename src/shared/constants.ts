export const IC_HOST = "http://localhost:8000";
export const IC_ENVIRON = "local";
export const CANISTER_IDS_URL =
  "http://localhost:8001/static/canister_ids.json";
export const TRANSACTION_FEES = 10000;
export const defaultDecimal = 8;
export const MAINNET_LEDGER_CANISTER_ID = "ryjl3-tyaaa-aaaaa-aaaba-cai";

export const REAL_LEDGER_METADATA = {
  fee: TRANSACTION_FEES,
  decimals: defaultDecimal,
  name: "ICP",
  symbol: "ICP",
};

export const TEST_LEDGER_METADATA = {
  fee: TRANSACTION_FEES,
  decimals: defaultDecimal,
  name: "T-ICP",
  symbol: "T-ICP",
};

export const LEDGER_SYMBOLS = [
  REAL_LEDGER_METADATA.symbol,
  TEST_LEDGER_METADATA.symbol,
];
