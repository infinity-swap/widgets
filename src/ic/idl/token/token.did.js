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
  const AuctionInfo = IDL.Record({
    auction_time: IDL.Nat64,
    auction_id: IDL.Nat64,
    first_transaction_id: IDL.Nat64,
    last_transaction_id: IDL.Nat64,
    tokens_distributed: IDL.Nat,
    cycles_collected: IDL.Nat64,
    fee_ratio: IDL.Float64,
  });
  const AuctionError = IDL.Variant({
    NoBids: IDL.Null,
    TooEarlyToBeginAuction: IDL.Nat64,
    Unauthorized: IDL.Text,
    BiddingTooSmall: IDL.Null,
    AuctionNotFound: IDL.Null,
  });
  const Result = IDL.Variant({ Ok: AuctionInfo, Err: AuctionError });
  const Account = IDL.Record({
    owner: IDL.Principal,
    subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const BatchTransferArgs = IDL.Record({
    amount: IDL.Nat,
    receiver: Account,
  });
  const TxError = IDL.Variant({
    SelfTransfer: IDL.Null,
    NothingToClaim: IDL.Null,
    AccountNotFound: IDL.Null,
    Duplicate: IDL.Record({ duplicate_of: IDL.Nat64 }),
    BadFee: IDL.Record({ expected_fee: IDL.Nat }),
    Unauthorized: IDL.Null,
    CreatedInFuture: IDL.Record({ ledger_time: IDL.Nat64 }),
    TooOld: IDL.Record({ allowed_window_nanos: IDL.Nat64 }),
    AmountOverflow: IDL.Null,
    InsufficientFunds: IDL.Record({ balance: IDL.Nat }),
    AmountTooSmall: IDL.Null,
  });
  const Result_3 = IDL.Variant({ Ok: IDL.Vec(IDL.Nat64), Err: TxError });
  const Result_1 = IDL.Variant({ Ok: IDL.Nat64, Err: AuctionError });
  const BiddingInfo = IDL.Record({
    caller_cycles: IDL.Nat64,
    auction_period: IDL.Nat64,
    last_auction: IDL.Nat64,
    total_cycles: IDL.Nat64,
    fee_ratio: IDL.Float64,
  });
  const Result_4 = IDL.Variant({ Ok: IDL.Nat, Err: TxError });
  const TokenInfo = IDL.Record({
    holderNumber: IDL.Nat64,
    deployTime: IDL.Nat64,
    fee_to: IDL.Principal,
    history_size: IDL.Nat64,
    metadata: Metadata,
    cycles: IDL.Nat64,
  });
  const TransactionStatus = IDL.Variant({
    Failed: IDL.Null,
    Succeeded: IDL.Null,
  });
  const Operation = IDL.Variant({
    Approve: IDL.Null,
    Burn: IDL.Null,
    Mint: IDL.Null,
    Auction: IDL.Null,
    Transfer: IDL.Null,
    Claim: IDL.Null,
    TransferFrom: IDL.Null,
  });
  const TxRecord = IDL.Record({
    to: Account,
    fee: IDL.Nat,
    status: TransactionStatus,
    from: Account,
    memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
    operation: Operation,
    timestamp: IDL.Nat64,
    caller: IDL.Principal,
    index: IDL.Nat64,
    amount: IDL.Nat,
  });
  const PaginatedResult = IDL.Record({
    result: IDL.Vec(TxRecord),
    next: IDL.Opt(IDL.Nat64),
  });
  const Value = IDL.Variant({
    Int: IDL.Int,
    Nat: IDL.Nat,
    Blob: IDL.Vec(IDL.Nat8),
    Text: IDL.Text,
  });
  const StandardRecord = IDL.Record({ url: IDL.Text, name: IDL.Text });
  const TransferArgs = IDL.Record({
    to: Account,
    fee: IDL.Opt(IDL.Nat),
    memo: IDL.Opt(IDL.Vec(IDL.Nat8)),
    from_subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
    created_at_time: IDL.Opt(IDL.Nat64),
    amount: IDL.Nat,
  });
  const TransferError = IDL.Variant({
    GenericError: IDL.Record({
      message: IDL.Text,
      error_code: IDL.Nat,
    }),
    TemporarilyUnavailable: IDL.Null,
    BadBurn: IDL.Record({ min_burn_amount: IDL.Nat }),
    Duplicate: IDL.Record({ duplicate_of: IDL.Nat }),
    BadFee: IDL.Record({ expected_fee: IDL.Nat }),
    CreatedInFuture: IDL.Record({ ledger_time: IDL.Nat64 }),
    TooOld: IDL.Null,
    InsufficientFunds: IDL.Record({ balance: IDL.Nat }),
  });
  const Result_5 = IDL.Variant({ Ok: IDL.Nat, Err: TransferError });
  const Interval = IDL.Variant({
    PerHour: IDL.Null,
    PerWeek: IDL.Null,
    PerDay: IDL.Null,
    Period: IDL.Record({ seconds: IDL.Nat64 }),
    PerMinute: IDL.Null,
  });
  const Result_2 = IDL.Variant({ Ok: IDL.Null, Err: AuctionError });
  const Result_6 = IDL.Variant({ Ok: IDL.Null, Err: TxError });
  const CandidHeader = IDL.Record({
    version: IDL.Nat32,
    header: IDL.Vec(IDL.Nat8),
  });
  return IDL.Service({
    auction_info: IDL.Func([IDL.Nat64], [Result], []),
    batch_transfer: IDL.Func(
      [IDL.Opt(IDL.Vec(IDL.Nat8)), IDL.Vec(BatchTransferArgs)],
      [Result_3],
      []
    ),
    bid_cycles: IDL.Func([IDL.Principal], [Result_1], []),
    bidding_info: IDL.Func([], [BiddingInfo], []),
    burn: IDL.Func(
      [IDL.Opt(IDL.Principal), IDL.Opt(IDL.Vec(IDL.Nat8)), IDL.Nat],
      [Result_4],
      []
    ),
    claim: IDL.Func(
      [IDL.Principal, IDL.Opt(IDL.Vec(IDL.Nat8))],
      [Result_4],
      []
    ),
    get_claim_subaccount: IDL.Func(
      [IDL.Principal, IDL.Opt(IDL.Vec(IDL.Nat8))],
      [IDL.Vec(IDL.Nat8)],
      ['query']
    ),
    get_claimable_amount: IDL.Func(
      [IDL.Principal, IDL.Opt(IDL.Vec(IDL.Nat8))],
      [IDL.Nat],
      ['query']
    ),
    get_holders: IDL.Func(
      [IDL.Nat64, IDL.Nat64],
      [IDL.Vec(IDL.Tuple(Account, IDL.Nat))],
      ['query']
    ),
    get_min_cycles: IDL.Func([], [IDL.Nat64], []),
    get_token_info: IDL.Func([], [TokenInfo], ['query']),
    get_transaction: IDL.Func([IDL.Nat64], [TxRecord], ['query']),
    get_transactions: IDL.Func(
      [IDL.Opt(IDL.Principal), IDL.Nat64, IDL.Opt(IDL.Nat64)],
      [PaginatedResult],
      ['query']
    ),
    get_user_transaction_count: IDL.Func(
      [IDL.Principal],
      [IDL.Nat64],
      ['query']
    ),
    history_size: IDL.Func([], [IDL.Nat64], ['query']),
    icrc1_balance_of: IDL.Func([Account], [IDL.Nat], ['query']),
    icrc1_decimals: IDL.Func([], [IDL.Nat8], ['query']),
    icrc1_fee: IDL.Func([], [IDL.Nat], ['query']),
    icrc1_metadata: IDL.Func(
      [],
      [IDL.Vec(IDL.Tuple(IDL.Text, Value))],
      ['query']
    ),
    icrc1_minting_account: IDL.Func([], [IDL.Opt(Account)], ['query']),
    icrc1_name: IDL.Func([], [IDL.Text], ['query']),
    icrc1_supported_standards: IDL.Func(
      [],
      [IDL.Vec(StandardRecord)],
      ['query']
    ),
    icrc1_symbol: IDL.Func([], [IDL.Text], ['query']),
    icrc1_total_supply: IDL.Func([], [IDL.Nat], ['query']),
    icrc1_transfer: IDL.Func([TransferArgs], [Result_5], []),
    is_test_token: IDL.Func([], [IDL.Bool], ['query']),
    list_subaccounts: IDL.Func(
      [],
      [IDL.Vec(IDL.Tuple(IDL.Vec(IDL.Nat8), IDL.Nat))],
      ['query']
    ),
    logo: IDL.Func([], [IDL.Text], ['query']),
    mint: IDL.Func(
      [IDL.Principal, IDL.Opt(IDL.Vec(IDL.Nat8)), IDL.Nat],
      [Result_4],
      []
    ),
    owner: IDL.Func([], [IDL.Principal], ['query']),
    run_auction: IDL.Func([], [Result], []),
    set_auction_period: IDL.Func([Interval], [Result_2], []),
    set_controller: IDL.Func([IDL.Principal], [Result_2], []),
    set_fee: IDL.Func([IDL.Nat], [Result_6], []),
    set_fee_to: IDL.Func([IDL.Principal], [Result_6], []),
    set_logo: IDL.Func([IDL.Text], [Result_6], []),
    set_min_cycles: IDL.Func([IDL.Nat64], [Result_2], []),
    set_name: IDL.Func([IDL.Text], [Result_6], []),
    set_owner: IDL.Func([IDL.Principal], [Result_6], []),
    set_symbol: IDL.Func([IDL.Text], [Result_6], []),
    state_check: IDL.Func([], [CandidHeader], ['query']),
    transfer: IDL.Func([TransferArgs], [Result_4], []),
  });
};
export const init = ({ IDL }) => {
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
  return [Metadata, IDL.Nat];
};
