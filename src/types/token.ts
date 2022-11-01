export interface Token {
  id: string;
  name?: string;
  symbol: string;
  decimals?: number | string;
  fee?: bigint;
  isTestToken?: boolean;
  hide?: boolean;
  balance?: number;
  logo?: any;
  price?: number;
}
