import { StoreSlice, WidgetSliceProps } from "../types";

export const icNetworkSelector = (state: WidgetSliceProps) => state.icNetwork;
export const setIcNetworkSelector = (state: WidgetSliceProps) =>
  state.setIcNetwork;
export const customActionSelector = (state: WidgetSliceProps) =>
  state.customActions;
export const setCustomActionSelector = (state: WidgetSliceProps) =>
  state.setCustomAction;

export const defaultIcNetwork = {
  icHost: "http://localhost:8001",
  icEnviron: "local",
  MAINNET_LEDGER_CANISTER_ID: "ryjl3-tyaaa-aaaaa-aaaba-cai",
  CANISTER_IDS_URL: "http://localhost:8001/static/canister_ids.json",
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
