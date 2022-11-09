import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../contexts/themeContext";
import useStore, {
  icNetworkSelector,
  setAccountSelector,
  setIcNetworkSelector,
  setInputTokenSymbolSelector,
  setOutputTokenSymbolSelector,
  setPrincipalSelector,
} from "../../store";
import { defaultIcNetwork } from "../../store/widget.slice";
import { SwapProps, WidgetProps } from "../../types";
import SwapWidgetComponent from "./SwapWidgetComponent";

export default function SwapWidget({
  theme,
  icNetwork,
  onConnectWallet,
  defaultInputAmount = 0,
  defaultOutputTokenSymbol,
  defaultInputTokenSymbol,
  principalId,
  accountId,
}: WidgetProps & SwapProps) {
  const setIcNetwork = useStore(setIcNetworkSelector);
  const setInputSymbol = useStore(setInputTokenSymbolSelector);
  const setOutputSymbol = useStore(setOutputTokenSymbolSelector);
  setIcNetwork(icNetwork ? icNetwork : defaultIcNetwork);
  setInputSymbol(defaultInputTokenSymbol);
  setOutputSymbol(defaultOutputTokenSymbol);

  return (
    <div>
      <SwapWidgetComponent
        theme={theme}
        defaultInputAmount={defaultInputAmount}
        onConnectWallet={onConnectWallet}
        defaultInputTokenSymbol={defaultInputTokenSymbol}
        defaultOutputTokenSymbol={defaultOutputTokenSymbol}
      />
    </div>
  );
}
