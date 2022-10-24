export interface AuthSliceType {
  isUnlocked: boolean;
  principal: string | null;
  accountId: string | null;
  connectedTo: string | null;
  activeConnection: { [key: string]: string | boolean | null };
  setUnlocked: (value: boolean) => void;
  setConnectedTo: (value: string) => void;
  setPrincipal: (principal: string) => void;
  setAccountId: (accountId: string) => void;
  setActiveConnection: (key: string, value: any, reset: boolean) => void;
}
