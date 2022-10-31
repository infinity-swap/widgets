export const idlFactory = ({ IDL }) => {
  const PoolFinancialStats = IDL.Record({
    volume_1d_icp: IDL.Nat,
    accumulated_fees_1d_icp: IDL.Nat,
    liquidity_icp: IDL.Nat,
    volume_7d_icp: IDL.Nat,
    apy_1d: IDL.Float64,
    apy_7d: IDL.Float64,
  });
  const MetricsData = IDL.Record({
    stable_memory_size: IDL.Nat64,
    cycles: IDL.Nat64,
    heap_memory_size: IDL.Nat64,
  });
  const PoolInfo = IDL.Record({
    financial_stats: IDL.Opt(PoolFinancialStats),
    principal: IDL.Principal,
    metrics: IDL.Opt(MetricsData),
    owner: IDL.Principal,
    reserves: IDL.Tuple(IDL.Nat, IDL.Nat),
    last_update_ts: IDL.Nat64,
    weights_are_changing: IDL.Bool,
    weights: IDL.Tuple(IDL.Float64, IDL.Float64),
    total_liquidity: IDL.Nat,
    token0: IDL.Principal,
    token1: IDL.Principal,
    transit_amount: IDL.Tuple(IDL.Nat, IDL.Nat),
    last_tx_id: IDL.Nat64,
    prices: IDL.Tuple(IDL.Float64, IDL.Float64),
    weights_can_change: IDL.Bool,
  });
  const TokenFinancialStats = IDL.Record({
    volume_24h: IDL.Nat,
    amm_reserves: IDL.Nat,
    price_change_24h: IDL.Float64,
    tokens_per_icp: IDL.Opt(IDL.Float64),
  });
  const ExtendedTokenInfo = IDL.Record({
    financial_stats: IDL.Opt(TokenFinancialStats),
    principal: IDL.Principal,
    decimals: IDL.Nat8,
    logo: IDL.Opt(IDL.Text),
    name: IDL.Text,
    symbol: IDL.Text,
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
  const PaginatedResult = IDL.Record({
    result: IDL.Vec(TransactionInfo),
    next: IDL.Opt(IDL.Nat64),
  });
  const SwapSuggestionError = IDL.Variant({
    NoPoolsPresent: IDL.Null,
    NoTokensPresent: IDL.Null,
    TokenNotInPool: IDL.Text,
    EmptyTokenCache: IDL.Null,
    EmptyPoolCache: IDL.Null,
  });
  const UtilityError = IDL.Variant({
    Pair: IDL.Tuple(IDL.Text, IDL.Text),
    Factory: IDL.Tuple(IDL.Text, IDL.Text),
    Token: IDL.Tuple(IDL.Text, IDL.Text),
    SwapSuggestions: SwapSuggestionError,
  });
  const Result = IDL.Variant({ Ok: PaginatedResult, Err: UtilityError });
  const Account = IDL.Record({
    owner: IDL.Principal,
    subaccount: IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const TransactionStatus = IDL.Variant({
    Failed: IDL.Null,
    Succeeded: IDL.Null,
  });
  const Operation_1 = IDL.Variant({
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
    operation: Operation_1,
    timestamp: IDL.Nat64,
    caller: IDL.Principal,
    index: IDL.Nat64,
    amount: IDL.Nat,
  });
  const PaginatedResult_1 = IDL.Record({
    result: IDL.Vec(TxRecord),
    next: IDL.Opt(IDL.Nat64),
  });
  const Result_1 = IDL.Variant({
    Ok: PaginatedResult_1,
    Err: UtilityError,
  });
  const PoolOrdering = IDL.Variant({
    ByTotalValueLocked: IDL.Null,
    Default: IDL.Null,
  });
  const TokenOrdering = IDL.Variant({
    ByName: IDL.Null,
    Default: IDL.Null,
  });
  const CandidHeader = IDL.Record({
    version: IDL.Nat32,
    header: IDL.Vec(IDL.Nat8),
  });
  const Result_2 = IDL.Variant({
    Ok: IDL.Vec(IDL.Principal),
    Err: UtilityError,
  });
  const SwapParameters = IDL.Record({
    fee: IDL.Nat,
    pool: IDL.Principal,
    amount_out: IDL.Nat,
    amount_in: IDL.Nat,
    slippage: IDL.Nat,
  });
  const SwapInfo = IDL.Record({
    token_in: IDL.Principal,
    token_out: IDL.Principal,
    pools: IDL.Vec(SwapParameters),
  });
  const TokenStatsAtPeriod = IDL.Record({
    amm_reserves: IDL.Nat,
    price_change: IDL.Float64,
    circulating_supply_change: IDL.Int,
    price: IDL.Float64,
    tokens_per_icp: IDL.Opt(IDL.Float64),
  });
  const Result_3 = IDL.Variant({
    Ok: IDL.Opt(TokenStatsAtPeriod),
    Err: UtilityError,
  });
  const Interval = IDL.Variant({
    PerHour: IDL.Null,
    PerWeek: IDL.Null,
    PerDay: IDL.Null,
    Period: IDL.Record({ minutes: IDL.Nat64 }),
    PerMinute: IDL.Null,
  });
  const TokenStatsSnapshot = IDL.Record({
    ts: IDL.Nat64,
    aggr_fees: IDL.Nat,
    amm_reserves: IDL.Nat,
    price_change: IDL.Float64,
    aggr_swapped_in: IDL.Nat,
    reserves_change: IDL.Int,
    price: IDL.Float64,
    aggr_swapped_out: IDL.Nat,
    tokens_per_icp: IDL.Opt(IDL.Float64),
  });
  const Result_4 = IDL.Variant({
    Ok: IDL.Vec(TokenStatsSnapshot),
    Err: UtilityError,
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
  return IDL.Service({
    get_pools_info: IDL.Func(
      [IDL.Vec(IDL.Principal)],
      [IDL.Vec(PoolInfo)],
      ["query"]
    ),
    get_tokens_info: IDL.Func(
      [IDL.Vec(IDL.Principal)],
      [IDL.Vec(ExtendedTokenInfo)],
      ["query"]
    ),
    latest_pair_transactions: IDL.Func(
      [IDL.Principal, IDL.Nat64, IDL.Opt(IDL.Principal), IDL.Opt(IDL.Nat64)],
      [Result],
      []
    ),
    latest_token_transactions: IDL.Func(
      [IDL.Principal, IDL.Nat64, IDL.Opt(IDL.Principal), IDL.Opt(IDL.Nat64)],
      [Result_1],
      []
    ),
    list_pools: IDL.Func(
      [IDL.Nat64, IDL.Nat64, PoolOrdering],
      [IDL.Vec(PoolInfo)],
      ["query"]
    ),
    list_tokens: IDL.Func(
      [IDL.Nat64, IDL.Nat64, TokenOrdering],
      [IDL.Vec(ExtendedTokenInfo)],
      ["query"]
    ),
    state_header: IDL.Func([], [CandidHeader], ["query"]),
    suggest_swaps: IDL.Func(
      [IDL.Principal, IDL.Principal, IDL.Nat],
      [Result_2],
      ["query"]
    ),
    swap_parameters: IDL.Func(
      [IDL.Principal, IDL.Principal, IDL.Nat],
      [SwapInfo],
      []
    ),
    swap_parameters_reverse: IDL.Func(
      [IDL.Principal, IDL.Principal, IDL.Nat],
      [SwapInfo],
      ["query"]
    ),
    token_stats_at_period: IDL.Func(
      [IDL.Principal, IDL.Nat64, IDL.Nat64],
      [Result_3],
      []
    ),
    token_stats_by_interval: IDL.Func(
      [IDL.Principal, IDL.Nat64, IDL.Nat64, IDL.Opt(Interval)],
      [Result_4],
      []
    ),
    update_pool_info: IDL.Func(
      [PairStats, IDL.Vec(IntervalStats), MetricsData],
      [],
      []
    ),
    update_pool_list: IDL.Func([IDL.Vec(IDL.Principal)], [], []),
  });
};
export const init = ({ IDL }) => {
  return [IDL.Principal, IDL.Opt(IDL.Principal)];
};
