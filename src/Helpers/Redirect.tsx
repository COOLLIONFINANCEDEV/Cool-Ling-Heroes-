import { Box } from "@mui/system";
import React, { ReactNode, useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface REDIRECT {
  link: string;
  children?: ReactNode;
  target?: boolean;
}

const Redirect: React.FC<REDIRECT> = ({ link, children, target = false }) => {
  // window.scrollTo(0,0);
  const navigate = useNavigate();
  const redirectFunction = useCallback(() => {
    if (target === false) {
      navigate(link);
    } else if (target === true) {
      window.open(link, "_blank");
    }
  }, [link, navigate, target]);

  return <Box onClick={redirectFunction}>{children}</Box>;
};

export default Redirect;