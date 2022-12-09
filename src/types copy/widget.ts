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
  textPrimary?: string;
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
  // onError?: ErrorHandler;
}
