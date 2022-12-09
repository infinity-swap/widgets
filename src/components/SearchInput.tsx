import React from "react";
import { SearchIcon } from "../assets/svg/Icons";

interface SearchInputProps extends React.ComponentPropsWithoutRef<"input"> {}

export default function SearchInput({ ...rest }: SearchInputProps) {
  return (
    <div className="w-full rounded-lg h-9 flex flex-row items-center  bg-[var(--module)]">
      <div className="m-3">
        <SearchIcon className="h-[16px] stroke-[var(--textSecondary)] stroke-1" />
      </div>
      <input
        {...rest}
        type="text"
        className="w-full h-ful outline-0 bg-transparent text-secondary-800 font-medium"
      ></input>
    </div>
  );
}
