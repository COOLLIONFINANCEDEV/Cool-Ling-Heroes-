import React from "react";
import { AppBar, Toolbar, Box, Stack } from "@mui/material";
import DesktopNavbarContent from "../Components/Navbar/DesktopNavbarContent";
import ResponsiveNavbarContent from "../Components/Navbar/ResponsiveNavbarContent";
import routes from "../Router/routes";
import { width } from "../Theme/size";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const location = useLocation();

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuList = [
    { name: "about us", link: routes.home },
    { name: "how it works", link: routes.home },
    { name: "learn", link: "/" },
    { name: "contact us", link: "/" },
  ];
  return (
    <Box component={"div"} sx={{ overflow: "hidden" }}>
      <AppBar
        component={"nav"}
        position="static"
        color={
          location.pathname === routes.home ? "secondary" : "primary"
        }
      >
        <Toolbar
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "10vh",
            padding: "0 !important",
          }}
        >
          <Stack
            direction="row"
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{ width: width }}
          >
            <DesktopNavbarContent
              handleClick={handleClick}
              open={open}
              anchorEl={anchorEl}
              handleClose={handleClose}
              menuList={menuList}
            />

            <ResponsiveNavbarContent MenuList={menuList} />
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
