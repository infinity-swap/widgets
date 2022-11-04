export const IC_HOST = process.env.REACT_APP_IC_HOST ?? "http://localhost:8000";
export const IC_ENVIRON = process.env.REACT_APP_IC_ENVIRON;
export const CANISTER_IDS_URL = process.env.REACT_APP_CANISTER_IDS_URL ?? "";
export const TRANSACTION_FEES = 10000;
export const defaultDecimal = 8;
export const MAINNET_LEDGER_CANISTER_ID =
  process.env.REACT_APP_MAINNET_LEDGER_CANISTER_ID ??
  "ryjl3-tyaaa-aaaaa-aaaba-cai";

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
export const WALLET_GUIDE_URL =
  "https://www.blog.infinityswap.one/getting-started-with-infinityswap-wallet-a-step-by-step-guide/";

export const CoinIcons: { [key: string]: string } = {
  aave: "https://raw.githubusercontent.com/infinity-swap/cryptocurrency-icons/master/16/aave.png",
  bnb: "https://raw.githubusercontent.com/infinity-swap/cryptocurrency-icons/master/16/bnb.png",
  icp: "https://raw.githubusercontent.com/infinity-swap/cryptocurrency-icons/master/16/internet-computer.png",
  "t-icp":
    "https://raw.githubusercontent.com/infinity-swap/cryptocurrency-icons/master/16/internet-computer.png",
};
