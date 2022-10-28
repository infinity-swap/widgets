// @ts-nocheck
import type { Principal } from "@dfinity/principal";
import type { ActorMethod } from "@dfinity/agent";
import { IDL } from "@dfinity/candid";

export interface CandidHeader {
  version: number;
  header: Array<number>;
}
export type FactoryError =
  | { CanisterCreateFailed: string }
  | { GenericError: string }
  | { StateCheckFailed: Array<[Principal, TypeCheckResult]> }
  | { AccessDenied: null }
  | { StableStorageError: string }
  | { NotFound: null }
  | { LedgerError: string }
  | { CanisterWasmNotSet: null }
  | { StateLocked: null }
  | { ManagementError: string }
  | { NotEnoughIcp: [bigint, bigint] }
  | { NotEnoughCycles: [bigint, bigint] };
export type PairFactoryError =
  | { PairNotEmpty: null }
  | { CreatePairFailed: string }
  | { FactoryError: FactoryError }
  | { PairNotFound: Principal }
  | { FailedToSetCap: [Principal, string] }
  | { PairCallError: string }
  | { TokensAreSame: null };
export type Result = { Ok: Principal } | { Err: PairFactoryError };
export type Result_1 = { Ok: null } | { Err: PairFactoryError };
export type Result_2 = { Ok: null } | { Err: FactoryError };
export type Result_3 = { Ok: number } | { Err: FactoryError };
export type Result_4 =
  | { Ok: Array<[Principal, UpgradeResult]> }
  | { Err: FactoryError };
export type Result_5 = { Ok: string } | { Err: FactoryError };
export type Result_6 = { Ok: bigint } | { Err: FactoryError };
export type TypeCheckResult =
  | {
      Ok: { remote_version: number; current_version: number };
    }
  | {
      Error: {
        remote_version: number;
        error_message: string;
        current_version: number;
      };
    };
export type UpgradeResult =
  | { Error: string }
  | { Noop: null }
  | { Upgraded: null };
export interface _SERVICE {
  create_lbp: ActorMethod<
    [
      Principal,
      Principal,
      [number, number],
      [] | [Principal],
      [] | [Principal]
    ],
    Result
  >;
  create_pair: ActorMethod<
    [Principal, Principal, [] | [Principal], [] | [Principal]],
    Result
  >;
  drop_pair: ActorMethod<[Principal, [] | [Principal]], Result_1>;
  forget_pair: ActorMethod<[Principal], Result_2>;
  get_all: ActorMethod<[], Array<Principal>>;
  get_checksum: ActorMethod<[], Result_5>;
  get_controller: ActorMethod<[], Principal>;
  get_cycles: ActorMethod<[[] | [Principal]], [] | [bigint]>;
  get_default_cap: ActorMethod<[], [] | [bigint]>;
  get_fee_to: ActorMethod<[], Principal>;
  get_icp_fee: ActorMethod<[], bigint>;
  get_icp_to: ActorMethod<[], Principal>;
  get_ledger_account_id: ActorMethod<[], string>;
  get_notify_principal: ActorMethod<[], [] | [Principal]>;
  get_pairs: ActorMethod<[Principal, Principal], Array<Principal>>;
  git_tag: ActorMethod<[], string>;
  length: ActorMethod<[], bigint>;
  refund_icp: ActorMethod<[], Result_6>;
  reset_update_lock: ActorMethod<[], Result_2>;
  set_controller: ActorMethod<[Principal], Result_2>;
  set_default_cap: ActorMethod<[[] | [bigint]], undefined>;
  set_fee_to: ActorMethod<[Principal], Result_2>;
  set_icp_fee: ActorMethod<[bigint], Result_2>;
  set_icp_to: ActorMethod<[Principal], Result_2>;
  set_notify_principal: ActorMethod<[[] | [Principal]], Result_2>;
  set_pair_bytecode: ActorMethod<[Array<number>], Result_3>;
  state_header: ActorMethod<[], CandidHeader>;
  top_up: ActorMethod<[], bigint>;
  upgrade: ActorMethod<[], Result_4>;
  version: ActorMethod<[], Result_3>;
}

type T0 = Parameters<IDL.InterfaceFactory>;
export function idlFactory({ IDL }: T0[0]): ReturnType<IDL.InterfaceFactory>;
