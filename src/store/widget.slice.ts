import { StoreSlice, WidgetSliceProps } from "../types";

export const icNetworkSelector = (state: WidgetSliceProps) => state.icNetwork;
export const setIcNetworkSelector = (state: WidgetSliceProps) =>
  state.setIcNetwork;
export const inputTokenSymbolSelector = (state: WidgetSliceProps) =>
  state.inputTokenSymbol;
export const outputTokenSymbolSelector = (state: WidgetSliceProps) =>
  state.outputTokenSymbol;
export const setOutputTokenSymbolSelector = (state: WidgetSliceProps) =>
  state.setOutputTokenSymbol;
export const setInputTokenSymbolSelector = (state: WidgetSliceProps) =>
  state.setInputTokenSymbol;

export const defaultIcNetwork = {
  icHost: "http://localhost:8001",
  icEnviron: "local",
  MAINNET_LEDGER_CANISTER_ID: "ryjl3-tyaaa-aaaaa-aaaba-cai",
  CANISTER_IDS_URL: "http://localhost:8001/static/canister_ids.json",
};

const createWidgetSlice: StoreSlice<WidgetSliceProps> = (set, get) => ({
  icNetwork: { ...defaultIcNetwork },
  inputTokenSymbol: null,
  outputTokenSymbol: null,
  setInputTokenSymbol: (value) => set({ inputTokenSymbol: value }),
  setOutputTokenSymbol: (value) => set({ outputTokenSymbol: value }),
  setInputAmount: (value) => set({ InputAmount: Number(value) }),
  setIcNetwork: (value) => set({ icNetwork: value }),
});

export default createWidgetSlice;
