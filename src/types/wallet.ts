import React from "react";

export interface IconType {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}
export interface walletType {
  id: string;
  exposedName: string;
  name: string;
  Icon?: any;
  installation: string;
  disabled?: boolean;
}
