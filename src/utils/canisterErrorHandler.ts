/*
    SysFatal = 1,
    SysTransient = 2,
    DestinationInvalid = 3,
    CanisterReject = 4,
    CanisterError = 5
*/
const rejectedErrorCode = (code: number) => {
  switch (code) {
    case 1:
      return {
        code: "SysFatal",
        message: "There seems to be a system error",
        notify: false,
      };
    case 2:
      return {
        code: "SysTransient",
        message: "system error",
        notify: false,
        retry: true,
      };
    case 3:
      return {
        code: "DestinationInvalid",
        message: "Wrong Canister ID",
        notify: true,
      };
    case 4:
      return {
        code: "CanisterReject",
        message: "Canister rejected the call",
        notify: true,
      };
    case 5:
      return {
        code: "CanisterError",
        message: "Canister trapped",
        notify: true,
      };
    default:
      return {
        code: "",
        message: "",
        notify: false,
      };
  }
};

export const getRejectErrorCode = (error: any) => {
  if (error && Object.getOwnPropertyNames(error).includes("result")) {
    return rejectedErrorCode(error.result.reject_code);
  }

  return undefined;
};

export const canisterErrorHandler = (error: any) => {
  /*  if (process.env.NODE_ENV !== "production") {
    console.log(error);
  } */

  if (error && Object.getOwnPropertyNames(error).includes("result")) {
    const errObj = rejectedErrorCode(error.result.reject_code);
    if (errObj && errObj.notify) {
      // errorNotify(errObj.message);
      return errObj;
    }
  }
  return error;
};
