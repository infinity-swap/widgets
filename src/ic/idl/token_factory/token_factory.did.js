export const idlFactory = ({ IDL }) => {
  const Metadata = IDL.Record({
    fee: IDL.Nat,
    decimals: IDL.Nat8,
    fee_to: IDL.Principal,
    owner: IDL.Principal,
    logo: IDL.Text,
    name: IDL.Text,
    is_test_token: IDL.Opt(IDL.Bool),
    symbol: IDL.Text,
  });
  const TypeCheckResult = IDL.Variant({
    Ok: IDL.Record({
      remote_version: IDL.Nat32,
      current_version: IDL.Nat32,
    }),
    Error: IDL.Record({
      remote_version: IDL.Nat32,
      error_message: IDL.Text,
      current_version: IDL.Nat32,
    }),
  });
  const FactoryError = IDL.Variant({
    CanisterCreateFailed: IDL.Text,
    GenericError: IDL.Text,
    StateCheckFailed: IDL.Vec(IDL.Tuple(IDL.Principal, TypeCheckResult)),
    AccessDenied: IDL.Null,
    StableStorageError: IDL.Text,
    NotFound: IDL.Null,
    LedgerError: IDL.Text,
    CanisterWasmNotSet: IDL.Null,
    StateLocked: IDL.Null,
    ManagementError: IDL.Text,
    NotEnoughIcp: IDL.Tuple(IDL.Nat64, IDL.Nat64),
    NotEnoughCycles: IDL.Tuple(IDL.Nat64, IDL.Nat64),
  });
  const TokenFactoryError = IDL.Variant({
    FactoryError: FactoryError,
    AlreadyExists: IDL.Null,
    InvalidConfiguration: IDL.Tuple(IDL.Text, IDL.Text),
  });
  const Result = IDL.Variant({
    Ok: IDL.Principal,
    Err: TokenFactoryError,
  });
  const Result_1 = IDL.Variant({ Ok: IDL.Null, Err: TokenFactoryError });
  const Result_4 = IDL.Variant({ Ok: IDL.Text, Err: FactoryError });
  const Result_5 = IDL.Variant({ Ok: IDL.Nat64, Err: FactoryError });
  const Result_6 = IDL.Variant({ Ok: IDL.Null, Err: FactoryError });
  const Result_2 = IDL.Variant({ Ok: IDL.Nat32, Err: FactoryError });
  const CandidHeader = IDL.Record({
    version: IDL.Nat32,
    header: IDL.Vec(IDL.Nat8),
  });
  const UpgradeResult = IDL.Variant({
    Error: IDL.Text,
    Noop: IDL.Null,
    Upgraded: IDL.Null,
  });
  const Result_3 = IDL.Variant({
    Ok: IDL.Vec(IDL.Tuple(IDL.Principal, UpgradeResult)),
    Err: FactoryError,
  });
  return IDL.Service({
    create_token: IDL.Func(
      [Metadata, IDL.Nat, IDL.Opt(IDL.Principal)],
      [Result],
      []
    ),
    forget_token: IDL.Func([IDL.Text], [Result_1], []),
    get_all: IDL.Func([], [IDL.Vec(IDL.Principal)], ['query']),
    get_checksum: IDL.Func([], [Result_4], ['query']),
    get_controller: IDL.Func([], [IDL.Principal], ['query']),
    get_cycles: IDL.Func([IDL.Opt(IDL.Principal)], [IDL.Opt(IDL.Nat)], []),
    get_icp_fee: IDL.Func([], [IDL.Nat64], ['query']),
    get_icp_to: IDL.Func([], [IDL.Principal], ['query']),
    get_ledger_account_id: IDL.Func([], [IDL.Text], ['query']),
    get_token: IDL.Func([IDL.Text], [IDL.Opt(IDL.Principal)], ['query']),
    git_tag: IDL.Func([], [IDL.Text], ['query']),
    length: IDL.Func([], [IDL.Nat64], ['query']),
    refund_icp: IDL.Func([], [Result_5], []),
    reset_update_lock: IDL.Func([], [Result_6], []),
    set_controller: IDL.Func([IDL.Principal], [Result_6], []),
    set_icp_fee: IDL.Func([IDL.Nat64], [Result_6], []),
    set_icp_to: IDL.Func([IDL.Principal], [Result_6], []),
    set_token_bytecode: IDL.Func([IDL.Vec(IDL.Nat8)], [Result_2], []),
    state_header: IDL.Func([], [CandidHeader], ['query']),
    top_up: IDL.Func([], [IDL.Nat64], []),
    upgrade: IDL.Func([], [Result_3], []),
    version: IDL.Func([], [Result_2], ['query']),
  });
};
export const init = ({ IDL }) => {
  return [IDL.Principal, IDL.Opt(IDL.Principal)];
};
