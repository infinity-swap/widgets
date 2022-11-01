import { Principal } from "@dfinity/principal";

export interface PairErrorResponse {
  InsufficientLiquidityToSwap: null;
  enericError: string;
  ExpectedSwapAmountLow: [bigint, bigint];
  InsufficientTransitTokens: null;
}
export interface PoolStatsType {
  id?: string;
  owner: Principal;
  token1_reserve: bigint;
  token0_price: number;
  weights_are_changing: boolean;
  weights: number[];
  token0_reserve: bigint;
  token1_price: number;
  token0: string;
  token1: string;
  transit_amount: bigint[];
  last_tx_id: bigint;
  protocol_fee_enabled: boolean;
  weights_can_change: boolean;
  total_supply: bigint;
}

export interface swapParamsType {
  token_in: Principal;
  token_out: Principal;
  pools: {
    fee: bigint;
    pool: Principal;
    amount_out: bigint;
    amount_in: bigint;
    slippage: bigint;
  }[];
}
