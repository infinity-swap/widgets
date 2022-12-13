export const IC_HOST = "https://ic0.app";
export const IC_ENVIRON = "mainnet";
export const CANISTER_IDS_URL =
  "https://storage.googleapis.com/dfx-server_ic/testnet/canister_ids.json";
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
