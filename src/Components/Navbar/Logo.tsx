import { Box, IconButton, useTheme } from "@mui/material";
import React from "react";
import Redirect from "../../Helpers/Redirect";
import routes from "../../Router/routes";

interface LOGO {
  dark?: boolean;
}

const Logo: React.FC<LOGO> = ({ dark = false }) => {
  const { palette } = useTheme();
  return (
    <Redirect link={routes.home}>
      <IconButton>
        <Box
          sx={{
            width: "80px",
            padding: "10px 5px",
            borderRadius: "30px",
            backgroundColor: dark ? palette.primary.main : "white",
          }}
        >
          <img
            src={
              dark ? "Assets/Icons/LogoDark.svg" : "Assets/Icons/LogoWhite.svg"
            }
            alt="logo"
            style={{ width: `${80}%` }}
          />
        </Box>
      </IconButton>
    </Redirect>
  );
};

export default Logo;
