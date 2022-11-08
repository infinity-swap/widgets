import { useMutation } from "react-query";
import { Principal } from "@dfinity/principal";
import {
  idlFactory as UtilityIDL,
  _SERVICE as UtilityService,
} from "../ic/idl/utility/utility.did";
import Ic from "../ic";
import { swapParamsType } from "../types";

interface swapParamsPayload {
  inToken: string;
  outToken: string;
  inAmount?: bigint;
  outAmount?: bigint;
  utility: string;
}

const outSwapParameters = async ({
  inToken,
  outToken,
  inAmount,
  utility,
}: swapParamsPayload) => {
  const swapParams: swapParamsType = await Ic.actor<UtilityService>(
    utility,
    UtilityIDL
  ).swap_parameters(
    Principal.fromText(inToken),
    Principal.fromText(outToken),
    inAmount!
  );

  if (!swapParams.pools.length) {
    throw new Error("no pools to choose from");
  }

  const firstPool = swapParams.pools[0];
  return swapParams.pools.reduce(
    (prev, current) => (prev.amount_out > current.amount_out ? prev : current),
    firstPool
  );
};

const inSwapParameters = async ({
  inToken,
  outToken,
  outAmount,
  utility,
}: swapParamsPayload) => {
  const swapParams = await Ic.actor<UtilityService>(
    utility,
    UtilityIDL
  ).swap_parameters_reverse(
    Principal.fromText(inToken),
    Principal.fromText(outToken),
    outAmount!
  );

  if (!swapParams.pools.length) {
    throw new Error("no pools to choose from");
  }

  const firstPool = swapParams.pools[0];
  return swapParams.pools.reduce(
    (prev, current) => (prev.amount_in < current.amount_in ? prev : current),
    firstPool
  );
};

export function useOutSwapParameters() {
  return useMutation(outSwapParameters, {
    retry: 3,
    retryDelay: (attempt) => attempt * 500,
  });
}

export function useInSwapParameters() {
  return useMutation(inSwapParameters, {
    retry: 3,
    retryDelay: (attempt) => attempt * 500,
  });
}
