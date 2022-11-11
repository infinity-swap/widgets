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

  const value = useMemo(
    () => ({
      showModalType,
      forced,
      setForced,
      toggleConnectModal,
      walletStep,
      setWalletStep,
    }),
    [
      toggleConnectModal,
      showModalType,
      forced,
      setForced,
      walletStep,
      setWalletStep,
    ]
  );

  return (
    <ConnectWalletContext.Provider value={value}>
      {children}
    </ConnectWalletContext.Provider>
  );
};
