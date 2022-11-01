import { Principal } from "@dfinity/principal";

export interface AuthSliceType {
  isUnlocked: boolean;
  principal: string | null | Principal;
  accountId: string | null;
  connectedTo: string | null;
  activeConnection: { [key: string]: string | boolean | null | Principal };
  setUnlocked: (value: boolean) => void;
  setConnectedTo: (value: string) => void;
  setPrincipal: (principal: string | Principal | null) => void;
  setAccountId: (accountId: string | null) => void;
  setActiveConnection: (
    key: string,
    value: string | Principal | null,
    reset: boolean
  ) => void;
}
