import { ReactComponent as PlugIcon } from "../assets/svg/wallets/plug.svg";
import { ReactComponent as InfinityWalletIcon } from "../assets/svg/wallets/infinitylogo.svg";
import { walletType } from "../types";
import numbro from "numbro";

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

export const getIcpPriceUSD = async () => {
  const res = await fetch(
    "https://api.binance.com/api/v3/avgPrice?symbol=ICPUSDT"
  );
  const priceJson = await res.json();
  return Number(priceJson.price);
};

export const isInvalidNum = (value: string | bigint | number | undefined) =>
  typeof value === "undefined" || Number.isNaN(value);

export const formatNum = ({
  value,
  decimals,
  average,
  prefix,
  postfix,
  fallback,
  truncate,
  trimMantissa,
  options = {},
  mine,
}: any) => {
  if (isInvalidNum(value)) {
    return isUndefined(fallback) ? "--" : fallback;
  }
  if (isInvalidNum(decimals)) {
    return value;
  }
  let newValue = value;
  if (truncate) {
    newValue = getFlooredFixed(newValue, decimals);
  }
  const formattedNumber = numbro(Number(newValue)).format({
    mantissa: decimals,
    average: average || false,
    trimMantissa: trimMantissa || false,
    ...options,
  });
  if (
    formattedNumber === "NaN" ||
    isInvalidNum(formattedNumber)
    // formattedNumber.length > 10
  ) {
    // console.log(
    //   `original number ${value} when formatted to ${formattedNumber} is invalid or out of bounds`
    // );
    return isUndefined(fallback) ? "--" : fallback;
  }

  return formattedNumber
    ? `${prefix || ""}${formattedNumber}${postfix || ""}`
    : formattedNumber;
};

export const isUndefined = (value: any) => typeof value === "undefined";

const getFlooredFixed = (value: any, decimals: any) => {
  return (Math.floor(value * 10 ** decimals) / 10 ** decimals).toFixed(
    decimals
  );
};

export const toDecimal = (
  amount: string | number,
  decimal: string | number
) => {
  return Math.round(Number(amount) * 10 ** Number(decimal ?? 0));
};

export const toActual = (
  amount: string | number | bigint,
  decimal: string | number
) => {
  return Number(amount) / 10 ** Number(decimal ?? 0);
};
