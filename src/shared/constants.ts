export const IC_HOST = process.env.REACT_APP_IC_HOST ?? "http://localhost:8000";
export const IC_ENVIRON = process.env.REACT_APP_IC_ENVIRON;
export const CANISTER_IDS_URL = process.env.REACT_APP_CANISTER_IDS_URL ?? "";
export const WALLET_GUIDE_URL =
  "https://www.blog.infinityswap.one/getting-started-with-infinityswap-wallet-a-step-by-step-guide/";

export const CoinIcons: { [key: string]: string } = {
  aave: "https://raw.githubusercontent.com/infinity-swap/cryptocurrency-icons/master/16/aave.png",
  bnb: "https://raw.githubusercontent.com/infinity-swap/cryptocurrency-icons/master/16/bnb.png",
  icp: "https://raw.githubusercontent.com/infinity-swap/cryptocurrency-icons/master/16/internet-computer.png",
};
