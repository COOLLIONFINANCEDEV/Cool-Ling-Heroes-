import React from "react";

export interface ANNOUCEMENTCONTEXT{
  state: boolean;
  handle: React.Dispatch<React.SetStateAction<boolean>>;
  handleInformation: React.Dispatch<React.SetStateAction<any>>;
}
export const AnnoucementContext = React.createContext<
  ANNOUCEMENTCONTEXT | undefined
>(undefined);
