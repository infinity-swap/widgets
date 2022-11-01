import { Principal } from '@dfinity/principal';
import { IDL } from '@dfinity/candid';
export type AccountIdentifier = string;
export type AccountIdentifier__1 = string;
export type Balance = bigint;
export interface BalanceRequest { 'token' : TokenIdentifier, 'user' : User }
export type BalanceResponse = { 'ok' : Balance } |
  { 'err' : CommonError__1 };
export interface BetaDeck {
  'balance' : (arg_0: BalanceRequest) => Promise<BalanceResponse>,
  'bearer' : (arg_0: TokenIdentifier__1) => Promise<Result_1>,
  'extensions' : () => Promise<Array<Extension>>,
  'mintNFT' : (arg_0: MintRequest) => Promise<undefined>,
  'readLedger' : () => Promise<Array<[TokenIndex, AccountIdentifier__1]>>,
  'tokens_ext' : (arg_0: AccountIdentifier__1) => Promise<Result>,
  'transfer' : (arg_0: TransferRequest) => Promise<TransferResponse>,
}
export type CommonError = { 'InvalidToken' : TokenIdentifier } |
  { 'Other' : string };
export type CommonError__1 = { 'InvalidToken' : TokenIdentifier } |
  { 'Other' : string };
export type Extension = string;
export interface Listing {
  'subaccount' : [] | [SubAccount__1],
  'locked' : [] | [Time],
  'seller' : Principal,
  'price' : bigint,
}
export type Memo = Array<number>;
export interface MintRequest { 'to' : User, 'metadata' : [] | [Array<number>] }
export type Result = {
    'ok' : Array<[TokenIndex, [] | [Listing], [] | [Array<number>]]>
  } |
  { 'err' : CommonError };
export type Result_1 = { 'ok' : AccountIdentifier__1 } |
  { 'err' : CommonError };
export type SubAccount = Array<number>;
export type SubAccount__1 = Array<number>;
export type Time = bigint;
export type TokenIdentifier = string;
export type TokenIdentifier__1 = string;
export type TokenIndex = number;
export interface TransferRequest {
  'to' : User,
  'token' : TokenIdentifier,
  'notify' : boolean,
  'from' : User,
  'memo' : Memo,
  'subaccount' : [] | [SubAccount],
  'amount' : Balance,
}
export type TransferResponse = { 'ok' : Balance } |
  {
    'err' : { 'CannotNotify' : AccountIdentifier } |
      { 'InsufficientBalance' : null } |
      { 'InvalidToken' : TokenIdentifier } |
      { 'Rejected' : null } |
      { 'Unauthorized' : AccountIdentifier } |
      { 'Other' : string }
  };
export type User = { 'principal' : Principal } |
  { 'address' : AccountIdentifier };
export interface _SERVICE extends BetaDeck {}
type T0 = Parameters<IDL.InterfaceFactory>;
export function idlFactory({ IDL }: T0[0]): ReturnType<IDL.InterfaceFactory>;
