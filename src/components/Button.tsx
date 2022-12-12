import React from "react";
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
  full: "w-full",
};

export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  className?: string;
  size?: string;
  children?: ReactNode;
  variant?: string;
  applyDisabledStyle?: boolean;
}

export default function Button({
  size = "sm",
  variant = "primary",
  applyDisabledStyle = false,
  children,
  className,
  ...rest
}: ButtonProps) {
  const sizeProp = size in buttonSizes ? size : "sm";
  const classes = clsx(buttonSizes[sizeProp], className);
  switch (variant) {
    case "secondary":
      return (
        <SecondaryButton
          applyDisabledStyle={applyDisabledStyle}
          className={classes}
          {...rest}
        >
          {children}
        </SecondaryButton>
      );

    default:
      return (
        <PrimaryButton
          applyDisabledStyle={applyDisabledStyle}
          className={classes}
          {...rest}
        >
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
    "bg-[var(--primary)] rounded-xl  text-[var(--textWhite)] font-medium text-lg";
  const hoverStyle = "hover:bg-[var(--primaryActiveHover)]";
  const disabledStyle = "bg-[var(--disabled)] border-none  rounded-xl";

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
    " border border-[var(--outline)] text-[var(--textSecondary)] rounded-xl font-medium text-lg";
  const classes = clsx(defaultStyle, className);

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
};
