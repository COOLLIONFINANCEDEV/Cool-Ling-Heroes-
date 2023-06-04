import React from "react";

export interface GENERATEMODALBUTTON {
  handleOpen: React.MouseEventHandler<HTMLDivElement>;
  content: React.ReactElement;
}

const GenerateModalButton: React.FC<GENERATEMODALBUTTON> = ({
  handleOpen,
  content,
}): React.ReactElement => {
  return <div onClick={handleOpen}>{content}</div>;
};

export default GenerateModalButton;
