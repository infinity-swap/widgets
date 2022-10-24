import { useState, useMemo, createContext, ReactNode } from "react";

export const ConnectWalletContext = createContext<any>({} as any);

export const ConnectWalletProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [showModalType, toggleConnectModal] = useState("");
  const [forced, setForced] = useState(false);

  const value = useMemo(
    () => ({
      showModalType,
      forced,
      setForced,
      toggleConnectModal,
    }),
    [toggleConnectModal, showModalType, forced, setForced]
  );

  return (
    <ConnectWalletContext.Provider value={value}>
      {children}
    </ConnectWalletContext.Provider>
  );
};
