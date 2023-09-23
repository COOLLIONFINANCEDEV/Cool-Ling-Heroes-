import React from "react";
import { AppBar, Toolbar, Box, Stack } from "@mui/material";
import DesktopNavbarContent from "../Components/Navbar/DesktopNavbarContent";
import ResponsiveNavbarContent from "../Components/Navbar/ResponsiveNavbarContent";
import routes from "../Router/routes";
import { width } from "../Theme/size";
import { useLocation } from "react-router-dom";


const LANDING_PAGE_URL = 'https://www.coolingheroes.com/index.html';
const landingUrlhash = (hash: string | number) => `${LANDING_PAGE_URL}#${hash}`;
export const menuList = [
  { name: 'about us', link: landingUrlhash(4) },
  { name: 'get involved', link: landingUrlhash(2) },
  { name: 'contact us', link: landingUrlhash(3) },
];


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

  return (
    <Box component={"div"} sx={{ overflow: "hidden" }}>
      <AppBar
        component={"nav"}
        position="static"
        color={location.pathname === routes.home ? "secondary" : "primary"}
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
