export interface TokenInfo {
  readonly chainId: number;
  readonly address: string;
  readonly name: string;
  readonly decimals: number;
  readonly symbol: string;
  readonly logoURI?: string;
  readonly tags?: string[];
  readonly extensions?: {
    readonly [key: string]: string | number | boolean | null;
  };
}
export interface Theme {
  accent?: string;
  container?: string;
  module?: string;
  interactive?: string;
  outline?: string;
  dialog?: string;
  primary?: string;
  onAccent?: string;
  secondary?: string;
  hint?: string;
  onInteractive?: string;
  active?: string;
  success?: string;
  warning?: string;
  error?: string;
  fontFamily?: string;
  inputContainer?: string;
  inputBorder?: string;
  textDark?: string;
  textLight?: string;
  textGrey?: string;
  disabled?: string;
  interactiveBorder?: string;
  interactiveBorderRadius?: string;
  placeholder?: string;
  currentColor?: "currentColor";
}

export interface WidgetProps {
  theme?: Theme;
  //locale?: SupportedLocale;
  //provider?: Provider | JsonRpcProvider;
  //jsonRpcEndpoint?: string | JsonRpcProvider;
  width?: string | number;
  // dialog?: HTMLElement | null;
  className?: string;
}
export interface icNetworkType {
  icHost: string;
  icEnviron: string;
  MAINNET_LEDGER_CANISTER_ID?: string;
  CANISTER_IDS_URL?: string;
}

export interface SwapProps {
  tokenList?: string | TokenInfo[];
  principalId?: string;
  accountId?: string;
  icNetwork?: icNetworkType;
  onConnectWallet?: () => void;
  defaultInputAmount?: string | number;
  defaultOutputTokenSymbol?: string;
  defaultInputTokenSymbol?: string;
  onError?: (e: any) => void;
  onSuccess?: (e: any) => void;
}
export interface WidgetSliceProps {
  icNetwork: icNetworkType | null;
  inputTokenSymbol: string | null;
  outputTokenSymbol: string | null;
  InputAmount?: string | number;
  setIcNetwork: (icNetwork: icNetworkType) => void;
  setInputTokenSymbol: (symbol: string | null) => void;
  setOutputTokenSymbol: (symbol: string | null) => void;
  setInputAmount: (InputAmount: string | number) => void;
}
