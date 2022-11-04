import { useState } from "react";
import Logo from "./Logo";
import { ReactComponent as Arrow } from "../assets/svg/dropdown-arrow.svg";
import { formatNum } from "../utils";
interface InputProps {
  className?: string;
  name: string;
  testId?: string | number;
  disableSelection?: boolean;
  disabled?: boolean;
  value: string | number;
  readOnly?: boolean;
  showMax?: boolean;
  logo?: string;
  min?: number;
  price?: number | string | null;
  onChange: (value: string) => void;
  onInputClick: () => void;
  onClickMax: () => void;
  onBlur?: () => void;
}

export default function Input({
  className,
  name,
  testId,
  value,
  min,
  onBlur,
  logo,
  disabled = false,
  readOnly = false,
  disableSelection,
  onInputClick,
  onChange,
  showMax,
  onClickMax,
  price,
  ...rest
}: InputProps) {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleFocus = () => {
    toggleEditing();
    // clearDefault();
  };

  const renderInputClick = () => {
    if (disableSelection) {
      return null;
    }
    return onInputClick();
  };

  const formatNumber = (num: number | string) => {
    if (!num) {
      return "";
    }

    const formatting =
      num > 0.01
        ? {
            decimals: 2,
          }
        : {
            decimals: 8,
            trimMantissa: true,
          };

    return formatNum({ value: num, ...formatting });
  };

  return (
    <div>
      <div
        className={`flex flex-col justify-center bg-secondary-100 rounded-xl px-4 rounded-medium h-[72px] ${className}`}
      >
        <div className="flex justify-between items-center w-full">
          <div
            data-testid={`${testId}-dropdown-button`}
            className="bg-table-bg bg-white dark:bg-dark-900 p-[8px] rounded-full border border-secondary-200"
          >
            <div className="flex items-center space-x-2">
              <span>
                <Logo symbol={name} logoURI={logo} />
              </span>
              <span
                className={`body-primary-semibold text-secondary whitespace-nowrap 
              ${disableSelection && "pr-5"}`}
                onClick={() => renderInputClick()}
              >
                {name}
              </span>
              <div>
                <div className="flex items-center justify-center">
                  <Arrow
                    className="cursor-pointer"
                    data-testid={`${testId}-arrow`}
                    onClick={() => onInputClick()}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-secondary-black">
              <input
                disabled={disabled}
                placeholder="0.0"
                value={isEditing ? value : formatNumber(value)}
                data-testid={testId}
                className={`h5-semibold bg-transparent relative w-full text-secondary-black text-right outline-none`}
                type="number"
                readOnly={readOnly}
                onChange={(e) =>
                  typeof onChange === "function" && onChange(e.target.value)
                }
                onFocus={isEditing ? undefined : handleFocus}
                onBlur={onBlur}
                min={min}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
