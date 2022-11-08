import React from "react";
import { SearchIcon } from "../assets/svg/Icons";

interface SearchInputProps extends React.ComponentPropsWithoutRef<"input"> {}

export default function SearchInput({ ...rest }: SearchInputProps) {
  return (
    <div className="w-full rounded-lg h-9 flex flex-row items-center border border-solid border-[] bg-[var(--inputBorder]">
      <div className="m-3">{/*  <SearchIcon height={16} /> */}</div>
      <input
        {...rest}
        type="text"
        className="w-full h-ful outline-0 bg-transparent text-secondary-800"
      ></input>
    </div>
  );
}
