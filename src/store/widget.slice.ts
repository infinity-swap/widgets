import {
  CANISTER_IDS_URL,
  IC_ENVIRON,
  IC_HOST,
  MAINNET_LEDGER_CANISTER_ID,
} from "../shared/constants";
import { StoreSlice, WidgetSliceProps } from "../types";

export const icNetworkSelector = (state: WidgetSliceProps) => state.icNetwork;
export const setIcNetworkSelector = (state: WidgetSliceProps) =>
  state.setIcNetwork;
export const customActionSelector = (state: WidgetSliceProps) =>
  state.customActions;
export const setCustomActionSelector = (state: WidgetSliceProps) =>
  state.setCustomAction;

export const defaultIcNetwork = {
  icHost: IC_HOST,
  icEnviron: IC_ENVIRON,
  MAINNET_LEDGER_CANISTER_ID: MAINNET_LEDGER_CANISTER_ID,
  CANISTER_IDS_URL: CANISTER_IDS_URL,
};

const createWidgetSlice: StoreSlice<WidgetSliceProps> = (set, get) => ({
  icNetwork: { ...defaultIcNetwork },
  InputAmount: 0,
  customActions: {
    onSuccess: () => {},
    onError: () => {},
  },
  setInputAmount: (value) => set({ InputAmount: Number(value) }),
  setIcNetwork: (value) => set({ icNetwork: value }),
  setCustomAction: (value) => set({ customActions: value }),
});

export default createWidgetSlice;
