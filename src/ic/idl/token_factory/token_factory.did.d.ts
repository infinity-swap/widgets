import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface CandidHeader {
  version: number;
  header: Uint8Array;
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
export type Result = { Ok: Principal } | { Err: TokenFactoryError };
export type Result_1 = { Ok: null } | { Err: TokenFactoryError };
export type Result_2 = { Ok: number } | { Err: FactoryError };
export type Result_3 =
  | { Ok: Array<[Principal, UpgradeResult]> }
  | { Err: FactoryError };
export type Result_4 = { Ok: string } | { Err: FactoryError };
export type Result_5 = { Ok: bigint } | { Err: FactoryError };
export type Result_6 = { Ok: null } | { Err: FactoryError };
export type TokenFactoryError =
  | { FactoryError: FactoryError }
  | { AlreadyExists: null }
  | { InvalidConfiguration: [string, string] };
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
  create_token: ActorMethod<[Metadata, bigint, [] | [Principal]], Result>;
  forget_token: ActorMethod<[string], Result_1>;
  get_all: ActorMethod<[], Array<Principal>>;
  get_checksum: ActorMethod<[], Result_4>;
  get_controller: ActorMethod<[], Principal>;
  get_cycles: ActorMethod<[[] | [Principal]], [] | [bigint]>;
  get_icp_fee: ActorMethod<[], bigint>;
  get_icp_to: ActorMethod<[], Principal>;
  get_ledger_account_id: ActorMethod<[], string>;
  get_token: ActorMethod<[string], [] | [Principal]>;
  git_tag: ActorMethod<[], string>;
  length: ActorMethod<[], bigint>;
  refund_icp: ActorMethod<[], Result_5>;
  reset_update_lock: ActorMethod<[], Result_6>;
  set_controller: ActorMethod<[Principal], Result_6>;
  set_icp_fee: ActorMethod<[bigint], Result_6>;
  set_icp_to: ActorMethod<[Principal], Result_6>;
  set_token_bytecode: ActorMethod<[Uint8Array], Result_2>;
  state_header: ActorMethod<[], CandidHeader>;
  top_up: ActorMethod<[], bigint>;
  upgrade: ActorMethod<[], Result_3>;
  version: ActorMethod<[], Result_2>;
}

type T0 = Parameters<IDL.InterfaceFactory>;
export function idlFactory({ IDL }: T0[0]): ReturnType<IDL.InterfaceFactory>;
