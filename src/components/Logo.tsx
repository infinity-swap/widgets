import React from "react";
import { CoinIcons } from "../utils/coinIcons";
interface LogoProps {
  logoURI?: string;
  symbol?: string;
}

export default function Logo({ logoURI, symbol }: LogoProps) {
  let className = `bg-white min-h-[20px] min-w-[20px] h-[20px] w-[20px] rounded-full`;
  if (logoURI) {
    return <img src={logoURI} alt={`${symbol}-icon`} className={className} />;
  }
  if (symbol && CoinIcons[symbol.toLowerCase()]) {
    return (
      <img
        src={CoinIcons[symbol.toLowerCase()]}
        alt={`${symbol}-icon`}
        className={className}
      />
    );
  }
  if (symbol?.toLowerCase() === "select token") {
    return null;
  }
  return (
    <img
      src={`https://avatars.dicebear.com/api/initials/${symbol}.svg`}
      alt={`${symbol}-icon`}
      className={className}
    />
  );
}
