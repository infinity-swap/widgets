import React from "react";
import { CoinIcons } from "../shared/constants";
interface LogoProps {
  logoURI?: string;
  symbol?: string;
}

export default function Logo({ logoURI, symbol }: LogoProps) {
  let className = `bg-white h-[20px] w-[20px] rounded-full`;
  if (logoURI) {
    return <img src={logoURI} alt={`${symbol}-icon`} className={className} />;
  }
  if (symbol && CoinIcons[symbol]) {
    return (
      <img
        src={CoinIcons[symbol]}
        alt={`${symbol}-icon`}
        className={className}
      />
    );
  }
  return null;
}
