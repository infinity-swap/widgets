import React from "react";
import { useState, useMemo, createContext, ReactNode } from "react";

export const ConnectWalletContext = createContext<any>({} as any);

export const ConnectWalletProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [showModalType, toggleConnectModal] = useState("");
  const [forced, setForced] = useState(false);
  const [walletStep, setWalletStep] = useState(1);
  const [widgetOptions, setWidgetOptions] = useState();
  const [icNetwork, setIcNetwork] = useState();

  const value = useMemo(
    () => ({
      showModalType,
      forced,
      setForced,
      toggleConnectModal,
      walletStep,
      setWalletStep,
      widgetOptions,
      setWidgetOptions,
      icNetwork,
      setIcNetwork,
    }),
    [
      toggleConnectModal,
      showModalType,
      forced,
      setForced,
      walletStep,
      setWalletStep,
      widgetOptions,
      setWidgetOptions,
      icNetwork,
      setIcNetwork,
    ]
  );

  return (
    <ConnectWalletContext.Provider value={value}>
      {children}
    </ConnectWalletContext.Provider>
  );
};
