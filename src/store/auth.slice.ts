import { StoreSlice, AuthSliceType } from "../types";

export const isUnlockedSelector = (state: AuthSliceType) => state.isUnlocked;
export const setUnlockedSelector = (state: AuthSliceType) => state.setUnlocked;
export const setConnectedToSelector = (state: AuthSliceType) =>
  state.setConnectedTo;
export const setActiveConnectionSelector = (state: AuthSliceType) =>
  state.setActiveConnection;

export const setPrincipalSelector = (state: AuthSliceType) =>
  state.setPrincipal;
export const setAccountSelector = (state: AuthSliceType) => state.setAccountId;
export const principalSelector = (state: AuthSliceType) => state.principal;
export const accountSelector = (state: AuthSliceType) => state.accountId;
export const connectedToSelector = (state: AuthSliceType) => state.connectedTo;
export const activeConnectionSelector = (state: AuthSliceType) =>
  state.activeConnection;

const createAuthSlice: StoreSlice<AuthSliceType> = (set, get) => ({
  isUnlocked: false,
  principal: null,
  accountId: null,
  connectedTo: null,
  activeConnection: {},
  setUnlocked: (value) => set({ isUnlocked: value }),
  setConnectedTo: (value) => set({ connectedTo: value }),
  setActiveConnection: (key, value, reset = false) => {
    if (reset) {
      set({ activeConnection: {} });
    } else {
      const state = get();
      set({ activeConnection: { ...state.activeConnection, [key]: value } });
    }
  },
  setPrincipal: (principal) => set({ principal }),
  setAccountId: (accountId) => set({ accountId }),
});

export default createAuthSlice;
