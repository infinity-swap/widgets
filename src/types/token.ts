export interface Token {
  id: string;
  name?: string;
  symbol: string;
  decimals?: number;
  fee?: bigint;
  isTestToken?: boolean;
  hide?: boolean;
}
