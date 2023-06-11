import React from "react";

export interface OVERVIEWCONTEXT {
  state: boolean;
  handle: React.Dispatch<React.SetStateAction<boolean>>;
  information: React.Dispatch<React.SetStateAction<any>>;
}
export const OverViewContext = React.createContext<OVERVIEWCONTEXT | undefined>(
  undefined
);
