import clsx from "clsx";
import { ReactNode } from "react";

interface ButtonType {
  size?: string;
  children?: ReactNode;
  variant?: string;
  className?: string;
}

interface VariantButtonType {
  className?: string;
  children?: ReactNode;
  applyDisabledStyle?: boolean;
  disabled?: boolean;
}
const buttonSizes: any = {
  sm: "py-2 px-3",
  md: "p-4",
  lg: "py-4 px-5",
  full: "py-4 w-full",
};

export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  className?: string;
  size?: string;
  children?: ReactNode;
  variant?: string;
}

export default function Button({
  size = "sm",
  variant = "primary",
  children,
  className,
  ...rest
}: ButtonProps) {
  const sizeProp = size in buttonSizes ? size : "sm";
  const classes = clsx(buttonSizes[sizeProp], className);
  switch (variant) {
    case "secondary":
      return (
        <SecondaryButton className={classes} {...rest}>
          {children}
        </SecondaryButton>
      );

    default:
      return (
        <PrimaryButton className={classes} {...rest}>
          {children}
        </PrimaryButton>
      );
  }
}

const PrimaryButton = ({
  children,
  applyDisabledStyle,
  disabled,
  className,
  ...rest
}: VariantButtonType) => {
  const defaultStyle =
    "bg-primary-gradient  text-white rounded-xl dark:bg-primary-800 dark:bg-none";
  const hoverStyle =
    "hover:bg-primary-800 hover:bg-none dark:hover:bg-primary-hover";
  const disabledStyle =
    "bg-grey-200 dark:bg-secondary-grey-10 border-none text-secondary-800 bg-none dark:border-2 dark:border-grey-100 rounded-xl";

  const classes = clsx(
    applyDisabledStyle ? disabledStyle : defaultStyle,
    !applyDisabledStyle && hoverStyle,
    className
  );

  return (
    <button type="button" className={classes} disabled={disabled} {...rest}>
      {children}
    </button>
  );
};

const SecondaryButton = ({
  children,
  className,
  applyDisabledStyle,
  ...rest
}: VariantButtonType) => {
  const defaultStyle =
    "bg-white border-[1.5px] border-grey-300 text-primary-900 rounded-xl dark:bg-secondary-grey-10 dark:border-none";
  const hoverStyle = "hover:bg-grey-100 text-secondary-lightblack";
  const disabledStyle = "disabled:bg-grey-200 disabled:text-secondary-800";

  const classes = clsx(defaultStyle, hoverStyle, disabledStyle, className);

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
};
