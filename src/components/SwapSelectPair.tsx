import React from "react";
import useTokens from "../hooks/useTokens";
import Modal from "./Modal";
import SearchInput from "./SearchInput";

interface SwapSelectPairType {
  onChange: () => void;
  onClose: () => void;
  filter?: () => void;
  isOpen: boolean;
  title?: string;
}

export default function SwapSelectPair({
  onChange,
  onClose,
  filter,
  isOpen,
  title = "Select a Pair",
}: SwapSelectPairType) {
  const tokens = useTokens();
  return (
    <Modal isOpen={isOpen} onClose={() => onClose()} zIndex={20}>
      <div className="h-full">
        <div className="p-5 pb-0">
          <div className="w-full md:w-[324px]">
            <Modal.Header title={title} onClose={() => onClose()} />
          </div>
          <div className="flex justify-start flex-col mt-3">
            <div className="hidden sm:block h-[44px]">
              <SearchInput placeholder="Search name or paste address" />
            </div>
          </div>
        </div>
        <div className="hidden sm:block border border-solid border-secondary-200 mt-4 mb-1" />
        <div className="w-full flex flex-col max-h-[250px]  sm:max-h-[188px] overflow-y-scroll items-center px-[12px] pt-0 sm:pt-[16px]"></div>
      </div>
    </Modal>
  );
}
