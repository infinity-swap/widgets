import React, { useMemo } from "react";
import { useLocalStorage } from "react-use";

const UserWalletStateContext = React.createContext<any>({} as any);
const UserWalletDispatchContext = React.createContext<any>({} as any);

export function useUserWalletState() {
  const context = React.useContext(UserWalletStateContext);
  if (context === undefined) {
    throw new Error(
      "useUserWalletState must be used within a UserWalletProvider"
    );
  }

  return context;
}

export function useUserWalletDispatch() {
  const context = React.useContext(UserWalletDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useUserWalletDispatch must be used within a UserWalletProvider"
    );
  }

  return context;
}

export function UserWalletProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [wallet, setWallet, remove] = useLocalStorage("user_wallet_data", {});
  const value = useMemo(() => ({ setWallet, remove }), [setWallet, remove]);

  return (
    <UserWalletStateContext.Provider value={wallet}>
      <UserWalletDispatchContext.Provider value={value}>
        {children}
      </UserWalletDispatchContext.Provider>
    </UserWalletStateContext.Provider>
  );
}
