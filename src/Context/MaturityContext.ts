import React from "react";

export interface MATURITYCONTEXT {
  state: boolean;
  handle: React.Dispatch<React.SetStateAction<boolean>>;
  information: React.Dispatch<React.SetStateAction<any>>;
}
export const MaturityContext = React.createContext<MATURITYCONTEXT | undefined>(
  undefined
);
