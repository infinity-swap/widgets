import type { Principal } from "@dfinity/principal";
import type { ActorMethod } from "@dfinity/agent";

export interface Account {
  owner: Principal;
  subaccount: [] | [Array<number>];
}
export interface CandidHeader {
  version: number;
  header: Array<number>;
}
export interface ExtendedTokenInfo {
  financial_stats: [] | [TokenFinancialStats];
  principal: Principal;
  decimals: number;
  logo: [] | [string];
  name: string;
  symbol: string;
}
export type Interval =
  | { PerHour: null }
  | { PerWeek: null }
  | { PerDay: null }
  | { Period: { minutes: bigint } }
  | { PerMinute: null };
export interface IntervalStats {
  ts: bigint;
  apy: number;
  prices_change: [number, number];
  aggr_fees: [bigint, bigint];
  amm_reserves: [bigint, bigint];
  liquidity: bigint;
  weights: [number, number];
  aggr_swapped_in: [bigint, bigint];
  reserves_change: [bigint, bigint];
  prices: [number, number];
  aggr_swapped_out: [bigint, bigint];
}
export interface MetricsData {
  stable_memory_size: bigint;
  cycles: bigint;
  heap_memory_size: bigint;
}
export type Operation =
  | { TransactionReceived: null }
  | { Burn: null }
  | { Mint: null }
  | { Swap: null }
  | { TransactionSent: null };
export type Operation_1 =
  | { Approve: null }
  | { Burn: null }
  | { Mint: null }
  | { Auction: null }
  | { Transfer: null }
  | { Claim: null }
  | { TransferFrom: null };
export interface PaginatedResult {
  result: Array<TransactionInfo>;
  next: [] | [bigint];
}
export interface PaginatedResult_1 {
  result: Array<TxRecord>;
  next: [] | [bigint];
}
export interface PairStats {
  owner: Principal;
  token1_reserve: bigint;
  token0_price: number;
  weights_are_changing: boolean;
  weights: [number, number];
  token0_reserve: bigint;
  token1_price: number;
  token0: Principal;
  token1: Principal;
  transit_amount: [bigint, bigint];
  last_tx_id: bigint;
  protocol_fee_enabled: boolean;
  weights_can_change: boolean;
  total_supply: bigint;
}
export interface PoolFinancialStats {
  volume_1d_icp: bigint;
  accumulated_fees_1d_icp: bigint;
  liquidity_icp: bigint;
  volume_7d_icp: bigint;
  apy_1d: number;
  apy_7d: number;
}
export interface PoolInfo {
  financial_stats: [] | [PoolFinancialStats];
  principal: Principal;
  metrics: [] | [MetricsData];
  owner: Principal;
  reserves: [bigint, bigint];
  last_update_ts: bigint;
  weights_are_changing: boolean;
  weights: [number, number];
  total_liquidity: bigint;
  token0: Principal;
  token1: Principal;
  transit_amount: [bigint, bigint];
  last_tx_id: bigint;
  prices: [number, number];
  weights_can_change: boolean;
}
export type PoolOrdering = { ByTotalValueLocked: null } | { Default: null };
export type Result = { Ok: PaginatedResult } | { Err: UtilityError };
export type Result_1 = { Ok: PaginatedResult_1 } | { Err: UtilityError };
export type Result_2 = { Ok: Array<Principal> } | { Err: UtilityError };
export type Result_3 =
  | { Ok: [] | [TokenStatsAtPeriod] }
  | { Err: UtilityError };
export type Result_4 =
  | { Ok: Array<TokenStatsSnapshot> }
  | { Err: UtilityError };
export interface SwapInfo {
  token_in: Principal;
  token_out: Principal;
  pools: Array<SwapParameters>;
}
export interface SwapParameters {
  fee: bigint;
  pool: Principal;
  amount_out: bigint;
  amount_in: bigint;
  slippage: bigint;
}
export type SwapSuggestionError =
  | { NoPoolsPresent: null }
  | { NoTokensPresent: null }
  | { TokenNotInPool: string }
  | { EmptyTokenCache: null }
  | { EmptyPoolCache: null };
export interface TokenFinancialStats {
  volume_24h: bigint;
  amm_reserves: bigint;
  price_change_24h: number;
  tokens_per_icp: [] | [number];
}
export type TokenOrdering = { ByName: null } | { Default: null };
export interface TokenStatsAtPeriod {
  amm_reserves: bigint;
  price_change: number;
  circulating_supply_change: bigint;
  price: number;
  tokens_per_icp: [] | [number];
}
export interface TokenStatsSnapshot {
  ts: bigint;
  aggr_fees: bigint;
  amm_reserves: bigint;
  price_change: number;
  aggr_swapped_in: bigint;
  reserves_change: bigint;
  price: number;
  aggr_swapped_out: bigint;
  tokens_per_icp: [] | [number];
}
export interface TransactionInfo {
  id: bigint;
  ts: bigint;
  weight: number;
  reserves: [bigint, bigint];
  rolling_in: [bigint, bigint];
  in_amount: [bigint, bigint];
  rolling_out: [bigint, bigint];
  operation: Operation;
  caller: Principal;
  rolling_fees: [bigint, bigint];
  out_amount: [bigint, bigint];
}
export type TransactionStatus = { Failed: null } | { Succeeded: null };
export interface TxRecord {
  to: Account;
  fee: bigint;
  status: TransactionStatus;
  from: Account;
  memo: [] | [Array<number>];
  operation: Operation_1;
  timestamp: bigint;
  caller: Principal;
  index: bigint;
  amount: bigint;
}
export type UtilityError =
  | { Pair: [string, string] }
  | { Factory: [string, string] }
  | { Token: [string, string] }
  | { SwapSuggestions: SwapSuggestionError };
export interface _SERVICE {
  get_pools_info: ActorMethod<[Array<Principal>], Array<PoolInfo>>;
  get_tokens_info: ActorMethod<[Array<Principal>], Array<ExtendedTokenInfo>>;
  latest_pair_transactions: ActorMethod<
    [Principal, bigint, [] | [Principal], [] | [bigint]],
    Result
  >;
  latest_token_transactions: ActorMethod<
    [Principal, bigint, [] | [Principal], [] | [bigint]],
    Result_1
  >;
  list_pools: ActorMethod<[bigint, bigint, PoolOrdering], Array<PoolInfo>>;
  list_tokens: ActorMethod<
    [bigint, bigint, TokenOrdering],
    Array<ExtendedTokenInfo>
  >;
  state_header: ActorMethod<[], CandidHeader>;
  suggest_swaps: ActorMethod<[Principal, Principal, bigint], Result_2>;
  swap_parameters: ActorMethod<[Principal, Principal, bigint], SwapInfo>;
  swap_parameters_reverse: ActorMethod<
    [Principal, Principal, bigint],
    SwapInfo
  >;
  token_stats_at_period: ActorMethod<[Principal, bigint, bigint], Result_3>;
  token_stats_by_interval: ActorMethod<
    [Principal, bigint, bigint, [] | [Interval]],
    Result_4
  >;
  update_pool_info: ActorMethod<
    [PairStats, Array<IntervalStats>, MetricsData],
    undefined
  >;
  update_pool_list: ActorMethod<[Array<Principal>], undefined>;
}

type T0 = Parameters<IDL.InterfaceFactory>;
export function idlFactory({ IDL }: T0[0]): ReturnType<IDL.InterfaceFactory>;
