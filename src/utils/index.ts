import { ReactComponent as PlugIcon } from "../assets/svg/wallets/plug.svg";
import { ReactComponent as InfinityWalletIcon } from "../assets/svg/wallets/infinitylogo.svg";
import { walletType } from "../types";

export const WALLET_IDS = {
  PLUG: "plug",
  INFINITY_WALLET: "infinityWallet",
};

export const WALLETS: walletType[] = [
  {
    id: WALLET_IDS.INFINITY_WALLET,
    exposedName: "infinityWallet",
    name: "InfinityWallet",
    Icon: InfinityWalletIcon,
    installation:
      "https://chrome.google.com/webstore/detail/infinity-wallet/jnldfbidonfeldmalbflbmlebbipcnle",
  },
  {
    id: WALLET_IDS.PLUG,
    exposedName: "plug",
    name: "Plug",
    Icon: PlugIcon,
    installation: "https://plugwallet.ooo/",
    disabled: true,
  },
];
