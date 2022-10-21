import { slippageSliceType, StoreSlice } from "../types";

export const slippageSelector = (state: slippageSliceType) => state.slippage;
export const setSlippageSelector = (state: slippageSliceType) =>
  state.setSlippage;
const createSlippageSlice: StoreSlice<slippageSliceType> = (set, get) => ({
  slippage: 0.1,
  setSlippage: (slippage: number) => {
    set({ slippage });
  },
});

export default createSlippageSlice;
