import create, { SetState, GetState } from "zustand";
import { persist, devtools } from "zustand/middleware";
import createAuthSlice, {
  principalSelector,
  accountSelector,
  isUnlockedSelector,
  activeConnectionSelector,
  connectedToSelector,
  setPrincipalSelector,
  setAccountSelector,
  setUnlockedSelector,
  setConnectedToSelector,
  setActiveConnectionSelector,
} from "./auth.slice";
import createSlippageSlice, {
  slippageSelector,
  setSlippageSelector,
} from "./slippage.slice";
import createWidgetSlice, {
  icNetworkSelector,
  setIcNetworkSelector,
  setCustomActionSelector,
  customActionSelector,
} from "./widget.slice";

export const rehydrated =
  (config: any) => (set: SetState<any>, get: GetState<any>, api: any) => {
    const result = config(set, get, api);
    return {
      ...result,
      rehydrated: false,
      setRehydrated: () =>
        set((state: any) => {
          state.rehydrated = true;
        }),
    };
  };

const useStore = create(
  devtools(
    persist(
      rehydrated((set: SetState<any>, get: GetState<any>) => ({
        ...createAuthSlice(set, get),
        ...createSlippageSlice(set, get),
        ...createWidgetSlice(set, get),
      })),
      {
        name: "infinity-swap-widget",
      }
    )
  )
);

export {
  slippageSelector,
  setSlippageSelector,
  principalSelector,
  accountSelector,
  isUnlockedSelector,
  activeConnectionSelector,
  connectedToSelector,
  setPrincipalSelector,
  setAccountSelector,
  setUnlockedSelector,
  setConnectedToSelector,
  setActiveConnectionSelector,
  icNetworkSelector,
  setIcNetworkSelector,
  setCustomActionSelector,
  customActionSelector,
};
export default useStore;
