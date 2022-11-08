import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type AccountIdentifier = string;
export interface ApproveRequest {
  token: TokenIdentifier;
  subaccount: [] | [SubAccount];
  allowance: Balance;
  spender: Principal;
}
export type Balance = bigint;
export interface BalanceRequest {
  token: TokenIdentifier;
  user: User;
}
export type BalanceResponse = { ok: Balance } | { err: CommonError__1 };
export type Balance__1 = bigint;
export type CommonError = { InvalidToken: TokenIdentifier } | { Other: string };
export type CommonError__1 =
  | { InvalidToken: TokenIdentifier }
  | { Other: string };
export type Extension = string;
export type Memo = Array<number>;
export type Metadata =
  | {
      fungible: {
        decimals: number;
        metadata: [] | [Array<number>];
        name: string;
        symbol: string;
      };
    }
  | { nonfungible: { metadata: [] | [Array<number>] } };
export interface MintRequest {
  to: User__1;
  subaccount: [] | [SubAccount__1];
  amount: Balance__1;
}
export type MintResponse =
  | { ok: Balance__1 }
  | { err: { Rejected: null } | { Other: string } };
export type Result = { ok: Balance__1 } | { err: CommonError };
export type Result_1 = { ok: Metadata } | { err: CommonError };
export type SubAccount = Array<number>;
export type SubAccount__1 = Array<number>;
export type TokenIdentifier = string;
export type TokenIdentifier__1 = string;
export interface TransferRequest {
  to: User;
  token: TokenIdentifier;
  notify: boolean;
  from: User;
  memo: Memo;
  subaccount: [] | [SubAccount];
  amount: Balance;
}
export type TransferResponse =
  | { ok: Balance }
  | {
      err:
        | { CannotNotify: AccountIdentifier }
        | { InsufficientBalance: null }
        | { InvalidToken: TokenIdentifier }
        | { Rejected: null }
        | { Unauthorized: AccountIdentifier }
        | { Other: string };
    };
export type User = { principal: Principal } | { address: AccountIdentifier };
export type User__1 = { principal: Principal } | { address: AccountIdentifier };
export interface erc20_token {
  acceptCycles: ActorMethod<[], undefined>;
  approve: ActorMethod<[ApproveRequest], undefined>;
  availableCycles: ActorMethod<[], bigint>;
  balance: ActorMethod<[BalanceRequest], BalanceResponse>;
  extensions: ActorMethod<[], Array<Extension>>;
  metadata: ActorMethod<[TokenIdentifier__1], Result_1>;
  mint: ActorMethod<[MintRequest], MintResponse>;
  supply: ActorMethod<[TokenIdentifier__1], Result>;
  transfer: ActorMethod<[TransferRequest], TransferResponse>;
}
export interface _SERVICE extends erc20_token {}
type T0 = Parameters<IDL.InterfaceFactory>;
export function idlFactory({ IDL }: T0[0]): ReturnType<IDL.InterfaceFactory>;
