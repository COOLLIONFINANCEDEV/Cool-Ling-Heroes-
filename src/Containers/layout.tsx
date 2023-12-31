import { ReactElement, useCallback, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { SideNav } from "../Components/dashboard/SideNav";
import TopNav from "../Components/dashboard/TopNav";
import { useLocation } from "react-router-dom";

const SIDE_NAV_WIDTH = 250;

const LayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  [theme.breakpoints.up("sm")]: {
    paddingLeft: SIDE_NAV_WIDTH,
  },
}));

const LayoutContainer = styled("div")({
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  width: "100%",
});

interface LAYOUT {
  children: ReactElement;
}

export const Layout: React.FC<LAYOUT> = ({ children }) => {
  const pathname = useLocation().pathname;
  const [openNav, setOpenNav] = useState(false);

  const handlePathnameChange = useCallback(() => {
    if (openNav) {
      setOpenNav(false);
    }
  }, [openNav]);

  useEffect(
    () => {
      handlePathnameChange();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname]
  );

  return (
    <>
      <TopNav onNavOpen={() => setOpenNav((state) => !state)} />
      <SideNav onClose={() => setOpenNav(false)} open={openNav} />
      <LayoutRoot>
        <LayoutContainer>{children}</LayoutContainer>
      </LayoutRoot>
    </>
  );
};
