import type { Principal } from "@dfinity/principal";
import type { ActorMethod } from "@dfinity/agent";

export interface Account {
  owner: Principal;
  subaccount: [] | [Uint8Array];
}
export type AuctionError =
  | { NoBids: null }
  | { TooEarlyToBeginAuction: bigint }
  | { Unauthorized: string }
  | { BiddingTooSmall: null }
  | { AuctionNotFound: null };
export interface AuctionInfo {
  auction_time: bigint;
  auction_id: bigint;
  first_transaction_id: bigint;
  last_transaction_id: bigint;
  tokens_distributed: bigint;
  cycles_collected: bigint;
  fee_ratio: number;
}
export interface BatchTransferArgs {
  amount: bigint;
  receiver: Account;
}
export interface BiddingInfo {
  caller_cycles: bigint;
  auction_period: bigint;
  last_auction: bigint;
  total_cycles: bigint;
  fee_ratio: number;
}
export interface CandidHeader {
  version: number;
  header: Uint8Array;
}
export type Interval =
  | { PerHour: null }
  | { PerWeek: null }
  | { PerDay: null }
  | { Period: { seconds: bigint } }
  | { PerMinute: null };
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
export type Operation =
  | { Approve: null }
  | { Burn: null }
  | { Mint: null }
  | { Auction: null }
  | { Transfer: null }
  | { Claim: null }
  | { TransferFrom: null };
export interface PaginatedResult {
  result: Array<TxRecord>;
  next: [] | [bigint];
}
export type Result = { Ok: AuctionInfo } | { Err: AuctionError };
export type Result_1 = { Ok: bigint } | { Err: AuctionError };
export type Result_2 = { Ok: null } | { Err: AuctionError };
export type Result_3 = { Ok: BigUint64Array } | { Err: TxError };
export type Result_4 = { Ok: bigint } | { Err: TxError };
export type Result_5 = { Ok: bigint } | { Err: TransferError };
export type Result_6 = { Ok: null } | { Err: TxError };
export interface StandardRecord {
  url: string;
  name: string;
}
export interface TokenInfo {
  holderNumber: bigint;
  deployTime: bigint;
  fee_to: Principal;
  history_size: bigint;
  metadata: Metadata;
  cycles: bigint;
}
export type TransactionStatus = { Failed: null } | { Succeeded: null };
export interface TransferArgs {
  to: Account;
  fee: [] | [bigint];
  memo: [] | [Uint8Array];
  from_subaccount: [] | [Uint8Array];
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
  memo: [] | [Uint8Array];
  operation: Operation;
  timestamp: bigint;
  caller: Principal;
  index: bigint;
  amount: bigint;
}
export type Value =
  | { Int: bigint }
  | { Nat: bigint }
  | { Blob: Uint8Array }
  | { Text: string };
export interface _SERVICE {
  auction_info: ActorMethod<[bigint], Result>;
  batch_transfer: ActorMethod<
    [[] | [Uint8Array], Array<BatchTransferArgs>],
    Result_3
  >;
  bid_cycles: ActorMethod<[Principal], Result_1>;
  bidding_info: ActorMethod<[], BiddingInfo>;
  burn: ActorMethod<[[] | [Principal], [] | [Uint8Array], bigint], Result_4>;
  claim: ActorMethod<[Principal, [] | [Uint8Array]], Result_4>;
  get_claim_subaccount: ActorMethod<[Principal, [] | [Uint8Array]], Uint8Array>;
  get_claimable_amount: ActorMethod<[Principal, [] | [Uint8Array]], bigint>;
  get_holders: ActorMethod<[bigint, bigint], Array<[Account, bigint]>>;
  get_min_cycles: ActorMethod<[], bigint>;
  get_token_info: ActorMethod<[], TokenInfo>;
  get_transaction: ActorMethod<[bigint], TxRecord>;
  get_transactions: ActorMethod<
    [[] | [Principal], bigint, [] | [bigint]],
    PaginatedResult
  >;
  get_user_transaction_count: ActorMethod<[Principal], bigint>;
  history_size: ActorMethod<[], bigint>;
  icrc1_balance_of: ActorMethod<[Account], bigint>;
  icrc1_decimals: ActorMethod<[], number>;
  icrc1_fee: ActorMethod<[], bigint>;
  icrc1_metadata: ActorMethod<[], Array<[string, Value]>>;
  icrc1_minting_account: ActorMethod<[], [] | [Account]>;
  icrc1_name: ActorMethod<[], string>;
  icrc1_supported_standards: ActorMethod<[], Array<StandardRecord>>;
  icrc1_symbol: ActorMethod<[], string>;
  icrc1_total_supply: ActorMethod<[], bigint>;
  icrc1_transfer: ActorMethod<[TransferArgs], Result_5>;
  is_test_token: ActorMethod<[], boolean>;
  list_subaccounts: ActorMethod<[], Array<[Uint8Array, bigint]>>;
  logo: ActorMethod<[], string>;
  mint: ActorMethod<[Principal, [] | [Uint8Array], bigint], Result_4>;
  owner: ActorMethod<[], Principal>;
  run_auction: ActorMethod<[], Result>;
  set_auction_period: ActorMethod<[Interval], Result_2>;
  set_controller: ActorMethod<[Principal], Result_2>;
  set_fee: ActorMethod<[bigint], Result_6>;
  set_fee_to: ActorMethod<[Principal], Result_6>;
  set_logo: ActorMethod<[string], Result_6>;
  set_min_cycles: ActorMethod<[bigint], Result_2>;
  set_name: ActorMethod<[string], Result_6>;
  set_owner: ActorMethod<[Principal], Result_6>;
  set_symbol: ActorMethod<[string], Result_6>;
  state_check: ActorMethod<[], CandidHeader>;
  transfer: ActorMethod<[TransferArgs], Result_4>;
}

type T0 = Parameters<IDL.InterfaceFactory>;
export function idlFactory({ IDL }: T0[0]): ReturnType<IDL.InterfaceFactory>;
