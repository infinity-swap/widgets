export const idlFactory = ({ IDL }) => {
  const Standard = IDL.Variant({ Erc20: IDL.Null, Ledger: IDL.Null });
  const TokenInfo = IDL.Record({
    principal: IDL.Principal,
    standard: Standard,
  });
  const WeightsConfig = IDL.Record({
    change_allowed: IDL.Bool,
    weight0: IDL.Float64,
    weight1: IDL.Float64,
  });
  const TokenTransferInfo = IDL.Record({
    amm_tx_id: IDL.Nat64,
    amount_transferred: IDL.Nat,
    token_tx_id: IDL.Nat64,
    token_principal: IDL.Principal,
  });
  const PairError = IDL.Variant({
    InsufficientLiquidityToSwap: IDL.Null,
    GenericError: IDL.Text,
    ExpectedSwapAmountLow: IDL.Tuple(IDL.Nat, IDL.Nat),
    InsufficientTransitTokens: IDL.Null,
    ZeroAmountToMintOrBurn: IDL.Null,
    MultiSwap: IDL.Null,
    ZeroReserves: IDL.Null,
    ZeroTokenBalance: IDL.Null,
    IntegerOverflow: IDL.Null,
    Unauthorized: IDL.Null,
    MintZeroTransit: IDL.Tuple(IDL.Nat, IDL.Nat),
    InvalidArgument: IDL.Text,
    TokenNotInPair: IDL.Principal,
    InsufficientLiquidity: IDL.Record({
      got: IDL.Nat,
      expected: IDL.Nat,
    }),
    Is20TransferFailed: IDL.Text,
    OnCooldown: IDL.Null,
    NothingToTransfer: IDL.Null,
    LiquidityExceedsCap: IDL.Nat,
    AmountOverflow: IDL.Null,
    InsufficientSwapTokens: IDL.Null,
  });
  const Result = IDL.Variant({ Ok: TokenTransferInfo, Err: PairError });
  const BurnDetails = IDL.Record({
    amm_tx_id: IDL.Nat64,
    burned_amounts: IDL.Tuple(IDL.Nat, IDL.Nat),
    transit_reserves: IDL.Tuple(IDL.Nat, IDL.Nat),
    transfer_details: IDL.Vec(Result),
  });
  const Result_1 = IDL.Variant({ Ok: BurnDetails, Err: PairError });
  const Result_2 = IDL.Variant({ Ok: IDL.Null, Err: PairError });
  const CumulativePrice = IDL.Record({
    timestamp: IDL.Nat32,
    price0: IDL.Nat,
    price1: IDL.Nat,
  });
  const Operation = IDL.Variant({
    TransactionReceived: IDL.Null,
    Burn: IDL.Null,
    Mint: IDL.Null,
    Swap: IDL.Null,
    TransactionSent: IDL.Null,
  });
  const TransactionInfo = IDL.Record({
    id: IDL.Nat64,
    ts: IDL.Nat64,
    weight: IDL.Float64,
    reserves: IDL.Tuple(IDL.Nat, IDL.Nat),
    rolling_in: IDL.Tuple(IDL.Nat, IDL.Nat),
    in_amount: IDL.Tuple(IDL.Nat, IDL.Nat),
    rolling_out: IDL.Tuple(IDL.Nat, IDL.Nat),
    operation: Operation,
    caller: IDL.Principal,
    rolling_fees: IDL.Tuple(IDL.Nat, IDL.Nat),
    out_amount: IDL.Tuple(IDL.Nat, IDL.Nat),
  });
  const Reserves = IDL.Record({
    block_timestamp_last: IDL.Nat32,
    reserve0: IDL.Nat,
    reserve1: IDL.Nat,
  });
  const Interval = IDL.Variant({
    PerHour: IDL.Null,
    PerWeek: IDL.Null,
    PerDay: IDL.Null,
    Period: IDL.Record({ minutes: IDL.Nat64 }),
    PerMinute: IDL.Null,
  });
  const IntervalStats = IDL.Record({
    ts: IDL.Nat64,
    apy: IDL.Float64,
    prices_change: IDL.Tuple(IDL.Float64, IDL.Float64),
    aggr_fees: IDL.Tuple(IDL.Nat, IDL.Nat),
    amm_reserves: IDL.Tuple(IDL.Nat, IDL.Nat),
    liquidity: IDL.Nat,
    weights: IDL.Tuple(IDL.Float64, IDL.Float64),
    aggr_swapped_in: IDL.Tuple(IDL.Nat, IDL.Nat),
    reserves_change: IDL.Tuple(IDL.Int, IDL.Int),
    prices: IDL.Tuple(IDL.Float64, IDL.Float64),
    aggr_swapped_out: IDL.Tuple(IDL.Nat, IDL.Nat),
  });
  const PaginatedResult = IDL.Record({
    result: IDL.Vec(TransactionInfo),
    next: IDL.Opt(IDL.Nat64),
  });
  const UserBalance = IDL.Record({
    liquidity: IDL.Nat,
    transit: IDL.Tuple(IDL.Nat, IDL.Nat),
  });
  const TokenWeightsInfo = IDL.Record({
    weight0: IDL.Float64,
    weight1: IDL.Float64,
    original_weight0: IDL.Float64,
    original_weight1: IDL.Float64,
    current_ts: IDL.Nat64,
    target_weight0: IDL.Float64,
    target_weight1: IDL.Float64,
    weights_can_change: IDL.Bool,
    change_started: IDL.Nat64,
  });
  const MintDetails = IDL.Record({
    amm_tx_id: IDL.Nat64,
    minted_amounts: IDL.Tuple(IDL.Nat, IDL.Nat),
    transit_reserves: IDL.Tuple(IDL.Nat, IDL.Nat),
  });
  const Result_3 = IDL.Variant({ Ok: MintDetails, Err: PairError });
  const Result_4 = IDL.Variant({ Ok: IDL.Nat64, Err: PairError });
  const ReceiveICPResult = IDL.Record({
    transit: Result_4,
    mint_details: IDL.Opt(Result_3),
  });
  const Result_5 = IDL.Variant({ Ok: ReceiveICPResult, Err: PairError });
  const Result_6 = IDL.Variant({
    Ok: IDL.Tuple(IDL.Nat, IDL.Nat),
    Err: PairError,
  });
  const CandidHeader = IDL.Record({
    version: IDL.Nat32,
    header: IDL.Vec(IDL.Nat8),
  });
  const PairStats = IDL.Record({
    owner: IDL.Principal,
    token1_reserve: IDL.Nat,
    token0_price: IDL.Float64,
    weights_are_changing: IDL.Bool,
    weights: IDL.Tuple(IDL.Float64, IDL.Float64),
    token0_reserve: IDL.Nat,
    token1_price: IDL.Float64,
    token0: IDL.Principal,
    token1: IDL.Principal,
    transit_amount: IDL.Tuple(IDL.Nat, IDL.Nat),
    last_tx_id: IDL.Nat64,
    protocol_fee_enabled: IDL.Bool,
    weights_can_change: IDL.Bool,
    total_supply: IDL.Nat,
  });
  const SwapToken = IDL.Variant({ Token0: IDL.Null, Token1: IDL.Null });
  const SwapOptions = IDL.Record({
    swap_out_estimate: IDL.Nat,
    token_in: SwapToken,
    slippage_pct: IDL.Float64,
    amount_in: IDL.Nat,
  });
  const SwapDetails = IDL.Record({
    amm_tx_id: IDL.Nat64,
    transit_reserves: IDL.Tuple(IDL.Nat, IDL.Nat),
    swap_out_amounts: IDL.Tuple(IDL.Nat, IDL.Nat),
    swap_in_amounts: IDL.Tuple(IDL.Nat, IDL.Nat),
    transfer_details: IDL.Opt(IDL.Vec(Result)),
  });
  const Result_7 = IDL.Variant({ Ok: SwapDetails, Err: PairError });
  return IDL.Service({
    burn: IDL.Func([IDL.Opt(IDL.Nat)], [Result_1], []),
    change_weights_gradual: IDL.Func(
      [IDL.Float64, IDL.Float64],
      [Result_2],
      []
    ),
    disable_weight_changing: IDL.Func([], [Result_2], []),
    get_cap: IDL.Func([], [IDL.Nat], ["query"]),
    get_cumulative_price: IDL.Func([], [CumulativePrice], ["query"]),
    get_current_price: IDL.Func([], [IDL.Float64, IDL.Float64], ["query"]),
    get_last_skim_timestamp: IDL.Func([], [IDL.Nat64], ["query"]),
    get_last_sync_timestamp: IDL.Func([], [IDL.Nat64], ["query"]),
    get_latest_transactions: IDL.Func(
      [IDL.Nat64, IDL.Opt(IDL.Principal)],
      [IDL.Vec(TransactionInfo)],
      ["query"]
    ),
    get_ledger_account_id: IDL.Func([], [IDL.Text], ["query"]),
    get_notify_principal: IDL.Func([], [IDL.Opt(IDL.Principal)], ["query"]),
    get_owner: IDL.Func([], [IDL.Principal], ["query"]),
    get_reserves: IDL.Func([], [Reserves], ["query"]),
    get_skim_cooldown_interval: IDL.Func([], [Interval], ["query"]),
    get_skim_cooldown_left: IDL.Func([], [IDL.Nat64], ["query"]),
    get_stats_intervals: IDL.Func(
      [IDL.Nat64, IDL.Nat64, IDL.Opt(Interval)],
      [IDL.Vec(IntervalStats)],
      ["query"]
    ),
    get_supply: IDL.Func([IDL.Principal], [IDL.Nat], ["query"]),
    get_sync_cooldown_interval: IDL.Func([], [Interval], ["query"]),
    get_sync_cooldown_left: IDL.Func([], [IDL.Nat64], ["query"]),
    get_token0: IDL.Func([], [IDL.Principal], ["query"]),
    get_token1: IDL.Func([], [IDL.Principal], ["query"]),
    get_total_supply: IDL.Func([], [IDL.Nat], ["query"]),
    get_transactions: IDL.Func(
      [IDL.Opt(IDL.Principal), IDL.Nat64, IDL.Opt(IDL.Nat64)],
      [PaginatedResult],
      ["query"]
    ),
    get_transit: IDL.Func(
      [IDL.Opt(IDL.Principal)],
      [IDL.Tuple(IDL.Nat, IDL.Nat)],
      ["query"]
    ),
    get_user_balance: IDL.Func(
      [IDL.Opt(IDL.Principal)],
      [UserBalance],
      ["query"]
    ),
    get_weights: IDL.Func([], [TokenWeightsInfo], ["query"]),
    git_tag: IDL.Func([], [IDL.Text], ["query"]),
    last_tx_id: IDL.Func([], [IDL.Nat64], ["query"]),
    mint: IDL.Func([], [Result_3], []),
    notify_state: IDL.Func([], [], []),
    receive_icp: IDL.Func([IDL.Bool], [Result_5], []),
    receive_icrc1: IDL.Func([IDL.Principal, IDL.Nat], [Result_2], []),
    refund_transfer: IDL.Func([], [IDL.Vec(Result)], []),
    set_cap: IDL.Func([IDL.Opt(IDL.Nat)], [Result_2], []),
    set_notify_principal: IDL.Func([IDL.Opt(IDL.Principal)], [Result_2], []),
    set_owner: IDL.Func([IDL.Principal], [Result_2], []),
    set_pair_fee_to: IDL.Func([IDL.Principal], [Result_2], []),
    set_skim_cooldown_interval: IDL.Func([Interval], [], []),
    set_sync_cooldown_interval: IDL.Func([Interval], [], []),
    set_weights: IDL.Func([IDL.Float64, IDL.Float64], [Result_2], []),
    skim: IDL.Func([IDL.Principal], [Result_6], []),
    state_header: IDL.Func([], [CandidHeader], ["query"]),
    stats: IDL.Func([], [PairStats], ["query"]),
    swap: IDL.Func([IDL.Opt(SwapOptions), IDL.Bool], [Result_7], []),
    sync: IDL.Func([], [Result_6], []),
    top_up_token: IDL.Func([], [IDL.Nat64], []),
    weights_change_allowed: IDL.Func([], [IDL.Bool], ["query"]),
  });
};
export const init = ({ IDL }) => {
  const Standard = IDL.Variant({ Erc20: IDL.Null, Ledger: IDL.Null });
  const TokenInfo = IDL.Record({
    principal: IDL.Principal,
    standard: Standard,
  });
  const WeightsConfig = IDL.Record({
    change_allowed: IDL.Bool,
    weight0: IDL.Float64,
    weight1: IDL.Float64,
  });
  return [
    TokenInfo,
    TokenInfo,
    IDL.Principal,
    IDL.Opt(WeightsConfig),
    IDL.Opt(IDL.Nat),
    IDL.Opt(IDL.Principal),
    IDL.Opt(IDL.Principal),
  ];
};
