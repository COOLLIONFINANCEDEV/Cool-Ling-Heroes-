import React from "react";
import {
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Logo from "./Logo";
import { NavLink } from "react-router-dom";
import Redirect from "../../Helpers/Redirect";
import routes from "../../Router/routes";

type Anchor = "top" | "left" | "bottom" | "right";
type MenuList = {
  name: string;
  link: string;
};

interface RESPONSIVENAVBARCONTENT {
  MenuList: MenuList[];
}

const ResponsiveNavbarContent: React.FC<RESPONSIVENAVBARCONTENT> = ({
  MenuList,
}) => {
  const [sidebarStatus, setSidebarStatus] = React.useState(false);
  const { palette } = useTheme();

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setSidebarStatus(false);
    };

  return (
    <Stack
      sx={{
        display: { xs: "flex", sm: "none" },
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        position: "relative",
      }}
      direction={"row"}
      spacing={3}
    >
      <IconButton color="inherit" onClick={() => setSidebarStatus(true)}>
        <MenuIcon fontSize="medium" />
      </IconButton>
      <Drawer
        anchor={"left"}
        open={sidebarStatus}
        onClose={toggleDrawer("left", false)}
      >
        <Box
          sx={{
            width: "calc(100vw - 30px)",
            height: "100vh",
            backgroundColor: palette.secondary.light,
            padding: "10px 15px",
          }}
        >
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <IconButton onClick={toggleDrawer("left", false)}>
              <HighlightOffIcon fontSize="large" color="primary" />
            </IconButton>
            <Logo dark />
          </Stack>

          <Stack sx={{ marginTop: "5vh" }}>
            <List>
              {MenuList.map((item) => (
                <ListItemButton key={item.name}>
                  <ListItemText onClick={toggleDrawer("left", false)}>
                    <NavLink to={item.link} style={{ textDecoration: "none" }}>
                      <Typography
                        color={"black"}
                        fontWeight={500}
                        sx={{
                          textTransform: "uppercase",
                          "&:hover": {
                            textDecoration: "underline",
                          },
                          fontSize: "16px",
                        }}
                      >
                        {item.name}
                      </Typography>
                    </NavLink>
                  </ListItemText>
                </ListItemButton>
              ))}
            </List>
          </Stack>

          <Stack
            justifyContent={"flex-end"}
            alignItems={"center"}
            spacing={3}
            sx={{
              position: "absolute",
              bottom: "20%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          >
            <Redirect link={routes.login}>
              <Button
                color="primary"
                variant="outlined"
                onClick={toggleDrawer("left", false)}
              >
                Log In
              </Button>
            </Redirect>
            <Redirect link={routes.login}>
              <Button
                color="primary"
                variant="contained"
                onClick={toggleDrawer("left", false)}
              >
                Start Investing
              </Button>
            </Redirect>
          </Stack>
        </Box>
      </Drawer>

      <Stack>
        <Logo />
      </Stack>
    </Stack>
  );
};

export default ResponsiveNavbarContent;
