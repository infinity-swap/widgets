import React, { useState, useContext, useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import Header from "../Header";
import Input from "../Input";
import useStore, {
  connectedToSelector,
  principalSelector,
  slippageSelector,
} from "../../store";
import Modal from "../Modal";
import Button from "../Button";
import { ConnectWalletContext } from "../../contexts/ConnectWallet";
import ConnectWallet from "../ConnectWallet";
import Account from "../Account";
import SwapSelectPair from "../SwapSelectPair";
import {
  useInSwapParameters,
  useOutSwapParameters,
} from "../../hooks/useSwapParameters";
import debounce from "lodash.debounce";
import { ArrowDownIcon } from "../../assets/svg/Icons";
import { formatNum, parsePairError, toActual, toDecimal } from "../../utils";
import Loader from "../Loader";
import { defaultDecimal, LEDGER_SYMBOLS } from "../../shared/constants";
import useCanisterIds from "../../hooks/useCanisterIds";
import ProgressTracker, { useProgressTracker } from "../ProgressTracker";
import { useFindPool } from "../../hooks/usePools";
import {
  idlFactory as TokenIDL,
  _SERVICE as TokenService,
  Result_5 as IcrcTransferResponse,
} from "../../ic/idl/token/token.did";
import {
  idlFactory as PairIDL,
  _SERVICE as PairService,
  PairError,
  Result_5 as ReceiveIcpResponse,
  Result_2 as ReceiveIcrcResponse,
  Result_7 as SwapResponse,
  SwapDetails,
} from "../../ic/idl/pair/pair.did";
import {
  idlFactory as PairFactoryIDL,
  _SERVICE as PairFactoryService,
} from "../../ic/idl/pair_factory/pair_factory.did";
import {
  BlockHeight,
  idlFactory as LedgerIDL,
  _SERVICE as LedgerService,
} from "../../ic/idl/ledger/ledger.did";
import { PairErrorResponse, Token, WidgetProps } from "../../types";
import { Principal } from "@dfinity/principal";
import Ic from "../../ic";
import { SubAccount } from "../../ic/account";
import { ThemeContext } from "../../contexts/themeContext";

const WhichToken = {
  IN: 1,
  OUT: 2,
};

interface FormValues {
  inToken: Token;
  outToken: Token;
  changeToken: number;
  slippage: number | null;
  inAmount: number;
  outAmount: number;
}

const SwapSteps = [
  {
    title: "Interact with canisters",
    action:
      "Allow InfinitySwap to interact with canisters on your behalf,\n confirm or deny in the wallet popup.",
    loading: true,
    error: false,
  },
  {
    title: "Transfer input tokens into transit",
    action:
      "Allow InfinitySwap to transfer specified amount of tokens into transit.",
    loading: true,
    error: false,
  },
  {
    title: "Swap",
    action: "Swapping input tokens for output tokens",
    loading: true,
    error: false,
  },
];

const initProgressTracker = {
  steps: SwapSteps,
};

const refundTransferStep = {
  title: "Refund Transfer",
  action: "Allow refunding of tokens left in transit after swap",
  loading: true,
  error: false,
};

export default function SwapWidgetComponent({ theme }: WidgetProps) {
  const [selectPair, toggleSelectPair] = useState<boolean>(false);
  const [pTracker, pTrackerDispatch] = useProgressTracker(initProgressTracker);
  const canisterIds = useCanisterIds();
  const [poolId, setPoolId] = useState<string | null>(null);
  const { toggleConnectModal } = useContext(ConnectWalletContext);
  const { setCSSVariables } = useContext(ThemeContext);
  const storedSlippage = useStore(slippageSelector);
  const principalId = useStore(principalSelector);
  const [showTest, setShowTest] = useState(false);
  const {
    resetField,
    control,
    setValue,
    watch,
    getValues,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      inToken: { id: "", fee: BigInt(0), decimals: 0 },
      outToken: { id: "", fee: BigInt(0), decimals: 0 },
      changeToken: WhichToken.IN,
      slippage: storedSlippage,
      inAmount: 0,
      outAmount: 0,
    },
  });
  const { mutateAsync: outSwapParameterCall } = useOutSwapParameters();
  const { mutateAsync: inSwapParameterCall } = useInSwapParameters();
  const { inAmount, outAmount, slippage, inToken, outToken, changeToken } =
    watch();
  const [toggleSwitch, setToggleSwitch] = useState(false);
  const [isFetchingPrice, setFetchingPrice] = useState(false);
  const [emptyLiquidity, setEmptyLiquidity] = useState(false);
  const connectedTo = useStore(connectedToSelector);
  const isMountedRef = useRef(true);
  setCSSVariables(theme);

  const selectedPool = useFindPool({
    token0: inToken?.id,
    token1: outToken?.id,
    poolId,
  });

  const onDropDownClick = (val: number) => {
    if (!principalId) {
      return showWalletHandler();
    }

    setValue("changeToken", val);
    toggleSelectPair(true);
  };

  const showWalletHandler = () => {
    if (!principalId) {
      toggleConnectModal("connectWallet");
    }
    if (principalId) {
      toggleConnectModal("account");
    }
  };

  const resetInputs = () => {
    resetField("inAmount");
    resetField("outAmount");
  };

  const switchTokenValues = () => {
    let [currInAmount, currOutAmount, currInToken, currOutToken] = getValues([
      "inAmount",
      "outAmount",
      "inToken",
      "outToken",
    ]);

    if (toggleSwitch) {
      let temp = currInAmount;
      currInAmount = currOutAmount;
      currOutAmount = temp;

      let tempToken = currInToken;
      currInToken = currOutToken;
      currOutToken = tempToken;
    }

    return {
      currInAmount,
      currOutAmount,
      currInToken,
      currOutToken,
    };
  };

  const outSwapParameters = debounce(async () => {
    try {
      const { currInAmount, currInToken, currOutToken } = switchTokenValues();

      if (!(currInToken && currOutToken && currInAmount > 0)) return;

      setFetchingPrice(true);

      const inAmountToSwap = BigInt(
        toDecimal(currInAmount, defaultDecimal) - Number(currInToken.fee)
      );

      const bestPool = await outSwapParameterCall({
        inToken: currInToken.id,
        outToken: currOutToken.id,
        inAmount: inAmountToSwap,
        utility: canisterIds.utility,
      });

      if (bestPool) {
        const { amount_out, pool } = bestPool;
        const outAmountDp = toActual(
          amount_out,
          currOutToken?.decimals ?? defaultDecimal
        );
        setValue(toggleSwitch ? "inAmount" : "outAmount", outAmountDp, {
          shouldValidate: true,
        });
        setPoolId(pool.toText());
        setEmptyLiquidity(false);
      }
    } catch (error) {
      let message;
      console.log("fw err", error);

      if (error instanceof Error) message = error?.message;
      if (message?.includes("doesn't have any liquidity")) {
        // pass function to handle error message
        console.log(error);
        setEmptyLiquidity(true);
      }
    } finally {
      setFetchingPrice(false);
    }
  }, 1000);

  const inSwapParameters = debounce(async () => {
    try {
      const { currOutAmount, currInToken, currOutToken } = switchTokenValues();

      if (!(currInToken && currOutToken && currOutAmount > 0)) return;

      setFetchingPrice(true);

      const outAmountToSwap = BigInt(
        toDecimal(currOutAmount, currOutToken?.decimals)
      );

      const bestPool = await inSwapParameterCall({
        inToken: currInToken.id,
        outToken: currOutToken.id,
        outAmount: outAmountToSwap,
        utility: canisterIds.utility,
      });

      if (bestPool) {
        const { amount_in, pool } = bestPool;
        const inAmountDp = toActual(
          amount_in,
          currInToken.decimals ?? defaultDecimal
        );
        setValue(toggleSwitch ? "outAmount" : "inAmount", inAmountDp, {
          shouldValidate: true,
        });
        setPoolId(pool.toText());
        setEmptyLiquidity(false);
      }
    } catch (error) {
      console.log("rv err", error);
      let message;
      if (error instanceof Error) message = error?.message;
      if (message?.includes("doesn't have any liquidity")) {
        setEmptyLiquidity(true);
        console.log(error);
      }
    } finally {
      setFetchingPrice(false);
    }
  }, 1000);

  const onSelectToken = async (token: Token) => {
    if (changeToken === WhichToken.IN) {
      setValue("inToken", token);
      inSwapParameters();
    } else {
      setValue("outToken", token);
      outSwapParameters();
    }
  };

  const onFilter = (token: Token) => {
    return token.id !== inToken?.id && token.id !== outToken?.id;
  };

  const swapInput = () => {
    setToggleSwitch(!toggleSwitch);
  };

  const getTokensData = () => {
    if (toggleSwitch) {
      return {
        inAmount: Number(outAmount),
        outAmount: Number(inAmount),
        inToken: outToken,
        outToken: inToken,
      };
    }
    return {
      inAmount,
      outAmount,
      inToken,
      outToken,
    };
  };

  const swapViaInfinityWallet = async () => {
    try {
      if (inAmount <= 0 && outAmount <= 0) {
        return;
      }

      // switched Token
      const sToken = getTokensData();

      const inAmountDp = sToken.inAmount;
      const outAmountDp = sToken.outAmount;

      let inAmountToSend = BigInt(
        toDecimal(inAmountDp, sToken.inToken?.decimals ?? 0)
      );

      const slippagePct = slippage ? slippage / 100 : 1.0;
      const actualAmountIn = inAmountToSend - BigInt(sToken.inToken.fee!);
      const swapOptions = [
        {
          swap_out_estimate: toDecimal(outAmountDp, sToken.outToken?.decimals),
          slippage_pct: slippagePct,
          amount_in: actualAmountIn,
          token_in: toggleSwitch ? { Token1: null } : { Token0: null },
        },
      ];
      const swapArguments = [swapOptions, true];

      pTrackerDispatch({
        type: "open",
        payload: {
          title: `Swapping ${inAmountDp} ${sToken.inToken.symbol} for ${outAmountDp} ${sToken.outToken.symbol}.`,
        },
      });

      let activePool = selectedPool?.id;
      // Add Approval chain
      if (!activePool) {
        // 1. A token must be sent to the Pair using the approve and transferFrom flow
        const [pair] = await Ic.actor<PairFactoryService>(
          canisterIds.pairFactory,
          PairFactoryIDL
        ).get_pairs(
          Principal.fromText(sToken.inToken.id),
          Principal.fromText(sToken.outToken.id)
        );

        activePool = pair.toText();
      }

      if (activePool) {
        // connect to wallet & whitelist the canisters specified
        await (window as any)?.ic.infinityWallet.requestConnect({
          whitelist: [
            canisterIds.pairFactory,
            sToken.inToken.id,
            sToken.outToken.id,
            activePool,
          ],
        });

        const pairActor = await (window as any)?.ic.infinityWallet.createActor({
          canisterId: activePool,
          interfaceFactory: PairIDL,
        });

        // move on to 'transfer input tokens into transit' step
        pTrackerDispatch({ type: "next" });

        let inTokenTxs = [];
        if (LEDGER_SYMBOLS.includes(sToken.inToken.symbol)) {
          const accountIdentifier = await pairActor.get_ledger_account_id();
          inTokenTxs = [
            {
              idl: LedgerIDL,
              canisterId: sToken.inToken.id,
              methodName: "send_dfx",
              args: [
                {
                  to: accountIdentifier,
                  fee: {
                    e8s: sToken.inToken.fee,
                  },
                  memo: 0,
                  from_subaccount: [],
                  created_at_time: [],
                  amount: {
                    e8s: inAmountToSend,
                  },
                },
              ],
              onSuccess: async (res: BlockHeight) => {
                // console.log("1st token send_dfx onSuccess", res);
              },
              onFail: (res: BlockHeight) => {
                console.log("1st token send_dfx onFail", res);

                pTrackerDispatch({
                  type: "error",
                  payload: {
                    title: `Failed to transfer ${inAmountDp} ${sToken.inToken.symbol} into transit`,
                  },
                });
              },
            },
            {
              idl: PairIDL,
              canisterId: activePool,
              methodName: "receive_icp",
              args: [false],
              onSuccess: async (res: ReceiveIcpResponse) => {
                pTrackerDispatch({ type: "next" });
              },
              onFail: (res: ReceiveIcpResponse) => {
                console.log("1st token receive_icp onFail", res);
                pTrackerDispatch({
                  type: "error",
                  payload: {
                    title: `Failed to transfer ${inAmountDp} ${sToken.inToken.symbol} into transit`,
                  },
                });
              },
            },
          ];
        } else {
          const owner = Principal.fromText(activePool);
          inTokenTxs = [
            {
              idl: TokenIDL,
              canisterId: sToken.inToken.id,
              methodName: "icrc1_transfer",
              args: [
                {
                  to: {
                    owner: Principal.fromText(activePool),
                    subaccount: [
                      SubAccount.fromPrincipal(principalId).toArray(),
                    ],
                  },
                  fee: [],
                  memo: [],
                  from_subaccount: [],
                  created_at_time: [],
                  amount: inAmountToSend,
                },
              ],
              onSuccess: async (res: IcrcTransferResponse) => {
                // console.log("1st token icrc1_transfer onSuccess", res);
              },
              onFail: (res: IcrcTransferResponse) => {
                console.log("1st token icrc1_transfer onFail", res);
                pTrackerDispatch({
                  type: "error",
                  payload: {
                    title: `Failed to transfer ${inAmountDp} ${sToken.inToken.symbol} into transit`,
                  },
                });
              },
            },
            {
              idl: PairIDL,
              canisterId: activePool,
              methodName: "receive_icrc1",
              args: [Principal.fromText(sToken.inToken.id), inAmountToSend],
              onSuccess: async (res: ReceiveIcrcResponse) => {
                // console.log("1st token receive_icrc1 onSuccess", res);

                // move on the swap step

                pTrackerDispatch({ type: "next" });
              },
              onFail: (res: ReceiveIcrcResponse) => {
                console.log("1st token transfer_from onFail", res);

                pTrackerDispatch({
                  type: "error",
                  payload: {
                    title: `Failed to transfer ${inAmountDp} ${sToken.inToken.symbol} into transit`,
                  },
                });
              },
            },
          ];
        }

        let refund = false;
        await (window as any).ic.infinityWallet.batchTransactions([
          ...inTokenTxs,
          {
            idl: PairIDL,
            canisterId: activePool,
            methodName: "swap",
            args: swapArguments,
            onSuccess: (res: { Ok: SwapDetails; Err: PairErrorResponse }) => {
              const { Ok, Err } = res;

              if (Ok) {
                const {
                  transit_reserves: tReserves,
                  swap_out_amounts: outAmounts,
                  swap_in_amounts: inAmounts,
                } = Ok;

                const [swapInAmount] = inAmounts.filter((val) => !!val);
                const [swapOutAmount] = outAmounts.filter((val) => !!val);

                refund = !!tReserves.reduce((a, b) => a + b, BigInt(0));

                const swapInAmountNumber = toActual(
                  swapInAmount,
                  sToken.inToken?.decimals!
                );
                const swapOutAmountNumber = toActual(
                  swapOutAmount,
                  sToken.outToken?.decimals!
                );

                const title = `Swapped ${swapInAmountNumber} ${sToken.inToken.symbol} for ${swapOutAmountNumber} ${sToken.outToken.symbol}`;
                pTrackerDispatch({
                  type: "next",
                  payload: {
                    title,
                  },
                });
                pTrackerDispatch({
                  type: "close",
                });
                resetInputs();
                onRequestClose();
                /*  notification.success({
                  description: `Swapped ${inAmountDp} ${sToken.inToken.symbol} for ${outAmountDp} ${sToken.outToken.symbol}`,
                }); */
                console.log("success");
              }
              if (Err) {
                const errorMessage = parsePairError(Err);
                pTrackerDispatch({
                  type: "error",
                  payload: {
                    ...(errorMessage && { action: `${errorMessage}` }),
                  },
                });
              }
            },
            onFail: async (res: {
              Ok: SwapDetails;
              Err: PairErrorResponse;
            }) => {
              console.log("swap onFail", res);
              pTrackerDispatch({
                type: "error",
                payload: {
                  title: "Failed to swap token, please try again",
                },
              });
            },
          },
        ]);

        if (refund) {
          try {
            pTrackerDispatch({
              type: "add_step",
              payload: { newStep: refundTransferStep },
            });

            await pairActor.refund_transfer();

            pTrackerDispatch({ type: "next" });
            pTrackerDispatch({ type: "close" });

            const refundMessage = "Refunded tokens in transit to your wallet";

            /* notification.success({
              message: refundMessage,
            }); */
            console.log("refundMessage", refundMessage);

            pTrackerDispatch({ type: "close" });

            resetInputs();
          } catch (_) {
            pTrackerDispatch({
              type: "error",
              payload: {
                title: "Failed to refund tokens left in transit",
              },
            });
          }
        }
      }
    } catch (error) {
      console.log("error", error);
      // canisterErrorHandler(error);
      /* pTrackerDispatch({
        type: "error",
        title: "Failed to swap token, please try again",
      }); */
    }
  };

  const enoughTokenBalance = (value: number, type: number) => {
    const token = type === WhichToken.IN ? inToken : outToken;
    const balance = token?.balance ?? 0;

    const amount = toDecimal(value, token.decimals || defaultDecimal);
    if (amount < balance) {
      return true;
    }

    return `Insufficient ${token?.symbol ?? ""} balance`;
  };

  const onSwap = async () => {
    // Swap pair
    if (!isValid) return;

    if (connectedTo === "infinityWallet") {
      await swapViaInfinityWallet();
    }
  };

  const getButtonText = () => {
    let text = "Confirm Order";

    const message = Object.values(errors)?.[0]?.message;
    if (message) {
      text = message;
    }

    return text;
  };

  const onRequestClose = () => {
    pTrackerDispatch({ type: "reset", payload: initProgressTracker });
  };

  const onClickMax = (token: Token) => {
    const fee = Number(token?.fee || 0) + 0.1 * Number(token?.fee || 0);
    let balance = Number(token?.balance) - fee;
    balance = formatNum({
      value: toActual(balance, token?.decimals || defaultDecimal),
      decimals: 2,
      truncate: true,
    });

    if (toggleSwitch) {
      setValue("outAmount", balance, {
        shouldValidate: true,
      });
    }
    if (!toggleSwitch) {
      setValue("inAmount", balance, { shouldValidate: true });
    }
  };

  return (
    <div className="swap-widget light">
      <ConnectWallet />
      <Account />
      <SwapSelectPair
        isOpen={selectPair}
        filter={onFilter}
        onChange={onSelectToken}
        onClose={() => toggleSelectPair((prev) => !prev)}
      />

      <div className="">
        <div className="bg-[var(--container)] px-4 pt-5 pb-4 sm:p-4 sm:pb-4 w-full md:w-[360px]">
          {/* Header */}
          <div>
            <Header
              showWalletHandler={showWalletHandler}
              slippage={0.1}
              onOpenSettings={() => {}}
            />
          </div>
          <div>
            <div className="mt-6 relative">
              <Controller
                name="inAmount"
                control={control}
                rules={{
                  validate: {
                    morethanZero: (value) => value > 0 || "Invalid Amount",
                    enoughBalance: (value) =>
                      enoughTokenBalance(value, WhichToken.IN),
                  },
                }}
                render={({ field }) => (
                  <Input
                    // disableSelection
                    className={`swap-input ${toggleSwitch ? "switch1 " : ""}`}
                    testId="swap-input-from"
                    onChange={(value) => {
                      field.onChange(value);
                      if (toggleSwitch) {
                        inSwapParameters();
                      } else {
                        outSwapParameters();
                      }
                    }}
                    showMax={!toggleSwitch}
                    onClickMax={() => onClickMax(inToken)}
                    price={
                      inAmount
                        ? formatNum({
                            value: (inToken?.price ?? 0) * inAmount,
                            decimals: 2,
                            fallback: "--",
                          })
                        : null
                    }
                    logo={inToken?.logo}
                    name={inToken?.symbol ?? "Select"}
                    value={field.value}
                    min={0}
                    onInputClick={() => onDropDownClick(WhichToken.IN)}
                  />
                )}
              />
              <div
                data-testid="swp-arrow-container"
                className="flex justify-center items-center rounded-md absolute bg-white dark:bg-dark-900 h-[32px] w-[32px] cursor-pointer z-1 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                onClick={swapInput}
              >
                <div className="bg-primary-200 dark:bg-dark-200 rounded-md">
                  <ArrowDownIcon
                    className={`fill-[var(--primary)] dark:fill-white arrow w-[24px] h-[24px] ${
                      toggleSwitch ? "rotate-[-360deg]" : ""
                    }`}
                  />
                </div>
              </div>
              <Controller
                name="outAmount"
                control={control}
                rules={{
                  validate: {
                    enoughBalance: (value) =>
                      enoughTokenBalance(value, WhichToken.IN),
                    morethanZero: (value) => value > 0,
                  },
                }}
                render={({ field }) => (
                  <Input
                    className={`swap-input ${
                      toggleSwitch ? "switch2 " : "mt-2"
                    }`}
                    testId="swap-input-to"
                    onChange={(value) => {
                      field.onChange(value);
                      if (toggleSwitch) {
                        outSwapParameters();
                      } else {
                        inSwapParameters();
                      }
                    }}
                    showMax={toggleSwitch}
                    onClickMax={() => onClickMax(outToken)}
                    price={
                      outAmount
                        ? formatNum({
                            value: (outToken?.price ?? 0) * outAmount,
                            decimals: 2,
                            fallback: "--",
                          })
                        : formatNum({ value: outToken?.price, decimals: 4 })
                    }
                    logo={outToken?.logo}
                    name={outToken?.symbol ?? "Select"}
                    value={field.value}
                    min={0}
                    onInputClick={() => onDropDownClick(WhichToken.OUT)}
                  />
                )}
              />
            </div>
            <div className="mt-2">
              {isFetchingPrice && (
                <div className="flex items-center">
                  <Loader height={25} width={25} />
                  <span className="pl-2 capitalize ">Fetching prices....</span>
                </div>
              )}
            </div>
            <div className="mt-2">
              {!principalId ? (
                <Button onClick={showWalletHandler} className="w-full">
                  Connect Wallet
                </Button>
              ) : isValid && !isFetchingPrice && !emptyLiquidity ? (
                <Button
                  disabled={!isValid}
                  applyDisabledStyle={!isValid}
                  size="full"
                  className="mt-7 p-4 "
                  data-testid="swap-btn"
                  onClick={onSwap}
                >
                  {getButtonText()}
                </Button>
              ) : (
                <Button
                  applyDisabledStyle
                  size="full"
                  data-testid="swap-swtconfirm-button"
                  className="mt-7 dark:bg-primary-300 p-4 text-primary-900 h6-semibold dark:border-none"
                >
                  {getButtonText()}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <ProgressTracker
        isOpen={pTracker.open!}
        onClose={onRequestClose}
        steps={pTracker.steps}
        activeStep={pTracker.activeStep!}
        message={pTracker.title!}
      />
    </div>
  );
}
