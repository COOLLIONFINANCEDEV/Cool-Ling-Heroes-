import React from "react";
import { Button, Typography, Stack } from "@mui/material";
import Redirect from "../../Helpers/Redirect";
import Logo from "./Logo";
import routes from "../../Router/routes";
import { Link, useLocation } from "react-router-dom";
interface MENUITEM {
  link: string;
  name: string;
}

interface DESKTOPNAVBARCONTENT {
  handleClick: React.MouseEventHandler<HTMLAnchorElement>;
  handleClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
  open: boolean;
  anchorEl: Element | ((element: Element) => Element) | null | undefined;
  menuList: MENUITEM[];
}

const DesktopNavbarContent: React.FC<DESKTOPNAVBARCONTENT> = ({
  handleClick,
  handleClose,
  open,
  anchorEl,
  menuList,
}) => {
  const location = useLocation();
  return (
    <>
      <Stack
        sx={{
          display: { xs: "none", sm: "flex" },
          width: "max-content",
        }}
        justifyContent="flex-start"
        alignItems="center"
        columnGap="3rem"
        direction="row"
      >
        <Logo dark={location.pathname === routes.home ? true : false} />
      </Stack>

      <Stack
        direction={"row"}
        sx={{ minWidth: "40%", display: { xs: "none", sm: "flex" } }}
        spacing={2}
        justifyContent="flex-start"
        alignItems="center"
      >
        {menuList.map((item) => (
          <Link
            to={item.link}
            style={{
              textDecoration: "none",
            }}
            key={item.name}
          >
            <Typography
              fontWeight={500}
              color={
                location.pathname === routes.home ? "primary" : "secondary"
              }
              sx={{
                textTransform: "uppercase",
                fontSize: "12px !important",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              {item.name}
            </Typography>
          </Link>
        ))}
      </Stack>

      <Stack
        direction={"row"}
        sx={{ width: "max-content", display: { xs: "none", sm: "flex" } }}
        spacing={2}
        justifyContent="flex-end"
        alignItems="center"
      >
        <Stack
          direction={"row"}
          justifyContent={"space-around"}
          alignItems={"center"}
          spacing={3}
        >
          <Redirect link={routes.login}>
            <Button
              color={
                location.pathname === routes.home ? "primary" : "secondary"
              }
              variant="outlined"
            >
              Log In
            </Button>
          </Redirect>
          <Redirect link={routes.simulator}>
            <Button
              color={
                location.pathname === routes.home ? "primary" : "secondary"
              }
              variant="contained"
            >
              Start Investing
            </Button>
          </Redirect>
        </Stack>
      </Stack>
    </>
  );
};

export default DesktopNavbarContent;
