import React, { ReactNode } from "react";

export const InfoLabel = ({
  message,
  Icon,
  className,
}: {
  message: string;
  Icon: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`flex items-center h-full  bg-[var(--module)] p-2 rounded-xl ${className}`}
    >
      <div>{Icon}</div>
      <div className="pl-2 text-xs capitalize text-[var(--textPrimary)] font-medium">
        {message}
      </div>
    </div>
  );
};
