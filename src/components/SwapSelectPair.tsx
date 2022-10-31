import React from "react";
import useTokens, { useTokensWithUserBalance } from "../hooks/useTokens";
import useStore, { accountSelector, principalSelector } from "../store";
import { Token } from "../types";
import Logo from "./Logo";
import Modal from "./Modal";
import SearchInput from "./SearchInput";

interface SwapSelectPairType {
  onChange: (token: Token) => void;
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
  const principalId = useStore(principalSelector);
  const accountIdentifier = useStore(accountSelector);
  const { tokens } = useTokensWithUserBalance({
    principalId,
    accountIdentifier,
  });

  const handleChange = (token: Token) => {
    // setSearch("");
    onChange(token);
    onClose();
  };
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
        <div className="w-full flex flex-col max-h-[250px]  sm:max-h-[188px] overflow-y-scroll items-center px-[12px] pt-0 sm:pt-[16px]">
          {tokens.map((token, index) => {
            return (
              <div
                key={index}
                className="w-full hover:bg-secondary-100 px-2 py-[8px] rounded-[8px] cursor-pointer"
              >
                <div
                  key={token.id}
                  data-testid={`${token.symbol}-select-token`}
                  className="flex justify-between items-center"
                  onClick={() => handleChange(token)}
                >
                  <div className="flex items-center space-x-3">
                    <div>
                      <Logo symbol={token.symbol} logoURI={token.logo} />
                    </div>

                    <div className="flex flex-col space-y-[4px]">
                      <span className="h6-semibold text-secondary-black">
                        {token.symbol}
                      </span>
                      <span className="body-secondary-semibold text-secondary-800">
                        {token.name}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
}
