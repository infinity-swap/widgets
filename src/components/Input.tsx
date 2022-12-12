import React from "react";

interface InputProps extends React.ComponentPropsWithoutRef<"input"> {}

const Input = ({ ...rest }: InputProps) => {
  return (
    <div className="w-full rounded-lg h-11 flex items-center  bg-[var(--module)]">
      <input
        {...rest}
        className="w-full h-ful ml-4 outline-0 bg-transparent text-[var(--textSecondary)] font-medium"
      />
    </div>
  );
};

export default Input;
