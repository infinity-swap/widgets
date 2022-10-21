import { StoreSlice, AuthSliceType } from "../types";
const createAuthSlice: StoreSlice<AuthSliceType> = (set, get) => ({
  principal: null,
  accountId: null,
});

export default createAuthSlice;
