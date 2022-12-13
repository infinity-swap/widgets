import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../contexts/themeContext";
import useStore, {
  icNetworkSelector,
  setAccountSelector,
  setIcNetworkSelector,
} from "../../store";
import {
  defaultIcNetwork,
  setCustomActionSelector,
} from "../../store/widget.slice";
import { SwapProps, WidgetProps } from "../../types";
import SwapWidgetComponent from "./SwapWidgetComponent";

export default function SwapWidget({
  theme,
  icNetwork,
  onConnectWallet,
  defaultInputAmount = 0,
  defaultOutputTokenSymbol,
  defaultInputTokenSymbol,

  onSuccess = () => {},
  onError = () => {},
  principalId,
  accountId,
}: WidgetProps & SwapProps) {
  const setIcNetwork = useStore(setIcNetworkSelector);
  const setCustomActions = useStore(setCustomActionSelector);
  setIcNetwork(icNetwork ? icNetwork : defaultIcNetwork);
  // setCustomActions({ onError, onSuccess });

  return (
    <div>
      <SwapWidgetComponent
        theme={theme}
        defaultInputAmount={defaultInputAmount}
        onSuccess={onSuccess}
        onError={onError}
        onConnectWallet={onConnectWallet}
        defaultInputTokenSymbol={defaultInputTokenSymbol}
        defaultOutputTokenSymbol={defaultOutputTokenSymbol}
      />
    </div>
  );
}
