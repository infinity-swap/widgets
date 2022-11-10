import type { Principal } from "@dfinity/principal";
import type { ActorMethod } from "@dfinity/agent";

export interface Account {
  owner: Principal;
  subaccount: [] | [Array<number>];
}
export interface BatchTransferArgs {
  amount: bigint;
  receiver: Account;
}
export interface BurnDetails {
  amm_tx_id: bigint;
  burned_amounts: [bigint, bigint];
  transit_reserves: [bigint, bigint];
  transfer_details: Array<Result>;
}
export interface CandidHeader {
  version: number;
  header: Array<number>;
}
export interface CumulativePrice {
  timestamp: number;
  price0: bigint;
  price1: bigint;
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
export interface Metadata {
  fee: bigint;
  decimals: number;
  fee_to: Principal;
  owner: Principal;
  logo: string;
  name: string;
  is_test_token: [] | [boolean];
  symbol: string;
}
export interface MintDetails {
  amm_tx_id: bigint;
  minted_amounts: [bigint, bigint];
  transit_reserves: [bigint, bigint];
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
export type PairError =
  | { InsufficientLiquidityToSwap: null }
  | { GenericError: string }
  | { ExpectedSwapAmountLow: [bigint, bigint] }
  | { InsufficientTransitTokens: null }
  | { ZeroAmountToMintOrBurn: null }
  | { MultiSwap: null }
  | { ZeroReserves: null }
  | { ZeroTokenBalance: null }
  | { IntegerOverflow: null }
  | { Unauthorized: null }
  | { MintZeroTransit: [bigint, bigint] }
  | { InvalidArgument: string }
  | { TokenNotInPair: Principal }
  | { InsufficientLiquidity: { got: bigint; expected: bigint } }
  | { Is20TransferFailed: string }
  | { OnCooldown: null }
  | { NothingToTransfer: null }
  | { LiquidityExceedsCap: bigint }
  | { AmountOverflow: null }
  | { InsufficientSwapTokens: null };
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
export interface ReceiveICPResult {
  transit: Result_4;
  mint_details: [] | [Result_3];
}
export interface Reserves {
  block_timestamp_last: number;
  reserve0: bigint;
  reserve1: bigint;
}
export type Result = { Ok: TokenTransferInfo } | { Err: PairError };
export type Result_1 = { Ok: BurnDetails } | { Err: PairError };
export type Result_10 = { Ok: bigint } | { Err: TransferError };
export type Result_11 = { Ok: null } | { Err: TxError };
export type Result_2 = { Ok: null } | { Err: PairError };
export type Result_3 = { Ok: MintDetails } | { Err: PairError };
export type Result_4 = { Ok: bigint } | { Err: PairError };
export type Result_5 = { Ok: ReceiveICPResult } | { Err: PairError };
export type Result_6 = { Ok: [bigint, bigint] } | { Err: PairError };
export type Result_7 = { Ok: SwapDetails } | { Err: PairError };
export type Result_8 = { Ok: Array<bigint> } | { Err: TxError };
export type Result_9 = { Ok: bigint } | { Err: TxError };
export type Standard = { Erc20: null } | { Ledger: null };
export interface StandardRecord {
  url: string;
  name: string;
}
export interface SwapDetails {
  amm_tx_id: bigint;
  transit_reserves: [bigint, bigint];
  swap_out_amounts: [bigint, bigint];
  swap_in_amounts: [bigint, bigint];
  transfer_details: [] | [Array<Result>];
}
export interface SwapOptions {
  swap_out_estimate: bigint;
  token_in: SwapToken;
  slippage_pct: number;
  amount_in: bigint;
}
export type SwapToken = { Token0: null } | { Token1: null };
export interface TokenInfo {
  principal: Principal;
  standard: Standard;
}
export interface TokenInfo_1 {
  holderNumber: bigint;
  deployTime: bigint;
  fee_to: Principal;
  history_size: bigint;
  metadata: Metadata;
  cycles: bigint;
}
export interface TokenTransferInfo {
  amm_tx_id: bigint;
  amount_transferred: bigint;
  token_tx_id: bigint;
  token_principal: Principal;
}
export interface TokenWeightsInfo {
  weight0: number;
  weight1: number;
  original_weight0: number;
  original_weight1: number;
  current_ts: bigint;
  target_weight0: number;
  target_weight1: number;
  weights_can_change: boolean;
  change_started: bigint;
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
export interface TransferArgs {
  to: Account;
  fee: [] | [bigint];
  memo: [] | [Array<number>];
  from_subaccount: [] | [Array<number>];
  created_at_time: [] | [bigint];
  amount: bigint;
}
export type TransferError =
  | {
      GenericError: { message: string; error_code: bigint };
    }
  | { TemporarilyUnavailable: null }
  | { BadBurn: { min_burn_amount: bigint } }
  | { Duplicate: { duplicate_of: bigint } }
  | { BadFee: { expected_fee: bigint } }
  | { CreatedInFuture: { ledger_time: bigint } }
  | { TooOld: null }
  | { InsufficientFunds: { balance: bigint } };
export type TxError =
  | { SelfTransfer: null }
  | { NothingToClaim: null }
  | { AccountNotFound: null }
  | { Duplicate: { duplicate_of: bigint } }
  | { BadFee: { expected_fee: bigint } }
  | { Unauthorized: null }
  | { CreatedInFuture: { ledger_time: bigint } }
  | { TooOld: { allowed_window_nanos: bigint } }
  | { AmountOverflow: null }
  | { InsufficientFunds: { balance: bigint } }
  | { AmountTooSmall: null };
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
export interface UserBalance {
  liquidity: bigint;
  transit: [bigint, bigint];
}
export type Value =
  | { Int: bigint }
  | { Nat: bigint }
  | { Blob: Array<number> }
  | { Text: string };
export interface WeightsConfig {
  change_allowed: boolean;
  weight0: number;
  weight1: number;
}
export interface _SERVICE {
  burn: ActorMethod<[[] | [bigint]], Result_1>;
  change_weights_gradual: ActorMethod<[number, number], Result_2>;
  disable_weight_changing: ActorMethod<[], Result_2>;
  get_cap: ActorMethod<[], bigint>;
  get_cumulative_price: ActorMethod<[], CumulativePrice>;
  get_current_price: ActorMethod<[], [number, number]>;
  get_last_skim_timestamp: ActorMethod<[], bigint>;
  get_last_sync_timestamp: ActorMethod<[], bigint>;
  get_latest_transactions: ActorMethod<
    [bigint, [] | [Principal]],
    Array<TransactionInfo>
  >;
  get_ledger_account_id: ActorMethod<[], string>;
  get_notify_principal: ActorMethod<[], [] | [Principal]>;
  get_owner: ActorMethod<[], Principal>;
  get_reserves: ActorMethod<[], Reserves>;
  get_skim_cooldown_interval: ActorMethod<[], Interval>;
  get_skim_cooldown_left: ActorMethod<[], bigint>;
  get_stats_intervals: ActorMethod<
    [bigint, bigint, [] | [Interval]],
    Array<IntervalStats>
  >;
  get_supply: ActorMethod<[Principal], bigint>;
  get_sync_cooldown_interval: ActorMethod<[], Interval>;
  get_sync_cooldown_left: ActorMethod<[], bigint>;
  get_token0: ActorMethod<[], Principal>;
  get_token1: ActorMethod<[], Principal>;
  get_total_supply: ActorMethod<[], bigint>;
  get_transactions: ActorMethod<
    [[] | [Principal], bigint, [] | [bigint]],
    PaginatedResult
  >;
  get_transit: ActorMethod<[[] | [Principal]], [bigint, bigint]>;
  get_user_balance: ActorMethod<[[] | [Principal]], UserBalance>;
  get_weights: ActorMethod<[], TokenWeightsInfo>;
  git_tag: ActorMethod<[], string>;
  last_tx_id: ActorMethod<[], bigint>;
  mint: ActorMethod<[], Result_3>;
  notify_state: ActorMethod<[], undefined>;
  receive_icp: ActorMethod<[boolean], Result_5>;
  receive_icrc1: ActorMethod<[Principal, bigint], Result_2>;
  refund_transfer: ActorMethod<[], Array<Result>>;
  set_cap: ActorMethod<[[] | [bigint]], Result_2>;
  set_notify_principal: ActorMethod<[[] | [Principal]], Result_2>;
  set_owner: ActorMethod<[Principal], Result_2>;
  set_pair_fee_to: ActorMethod<[Principal], Result_2>;
  set_skim_cooldown_interval: ActorMethod<[Interval], undefined>;
  set_sync_cooldown_interval: ActorMethod<[Interval], undefined>;
  set_weights: ActorMethod<[number, number], Result_2>;
  skim: ActorMethod<[Principal], Result_6>;
  state_header: ActorMethod<[], CandidHeader>;
  stats: ActorMethod<[], PairStats>;
  swap: ActorMethod<[[] | [SwapOptions], boolean], Result_7>;
  sync: ActorMethod<[], Result_6>;
  top_up_token: ActorMethod<[], bigint>;
  weights_change_allowed: ActorMethod<[], boolean>;
}

type T0 = Parameters<IDL.InterfaceFactory>;
export function idlFactory({ IDL }: T0[0]): ReturnType<IDL.InterfaceFactory>;
