import React from "react";

export interface CUSTOMERSCONTEXT {
  state: boolean;
  handle: React.Dispatch<React.SetStateAction<boolean>>;
  information: React.Dispatch<React.SetStateAction<any>>;
}
export const CustomersContext = React.createContext<CUSTOMERSCONTEXT | undefined>(
  undefined
);
  