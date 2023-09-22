import { Avatar, Box, Divider, Drawer, Stack, Typography, useMediaQuery } from "@mui/material";
import { SideNavItem } from "./SideNavitem";
import Logo from "../Navbar/Logo";
import SideBarItems from "./SideBarItems";
import Annoucement from "../Annoucement/Annoucement";
import { useSelector } from 'react-redux';
import { selectLogin } from '../../Toolkit/Login/LoginSlice';

interface SIDENAV {
  open: boolean;
  onClose:
    | ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void)
    | undefined;
}

const userImageUrl = "../Assets/Imgs/avatar_default.jpg";

export const SideNav: React.FC<SIDENAV> = ({ open, onClose }) => {
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("sm"));
  const { user } = useSelector(selectLogin);

  const pseudo = user.email;

  const content = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ p: 3 }}>
        <Stack justifyContent={"center"}>
          <Logo dark />
        </Stack>
      </Box>
      {/* <Divider sx={{ borderColor: "neutral.700" }} /> */}
      <Box sx={{ p: 1, 
        borderRadius: "4px", 
        background:"#919EAB1F",
        width:200,
        position:"relative",
        left:10
        }}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Avatar alt={pseudo} src={userImageUrl} />
        <Typography variant="h6">{pseudo}</Typography>
      </Stack>
    </Box>
      {/* <Divider sx={{ borderColor: "neutral.700" }} /> */}
      <Box
        component="nav"
        sx={{
          px: 2,
          py: 3,
        }}
      >
        <Stack
          component="ul"
          spacing={0.5}
          sx={{
            listStyle: "none",
            p: 0,
            m: 0,
          }}
        >
          {SideBarItems().map((item) => {
            return (
              <SideNavItem
                icon={item.icon}
                key={item.title}
                path={item.path}
                title={item.title}
              />
            );
          })}
        </Stack>
      </Box>
      <Divider sx={{ borderColor: "neutral.700" }} />
    </Box>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.800",
            color: "common.white",
            width: 250,
            overflow: "scroll !important",
          },
        }}
        variant="permanent"
      >
        <Stack justifyContent={"space-between"} sx={{ height: "100%" }}>
          {content}
          <Annoucement />
        </Stack>
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.800",
          color: "common.white",
          width: 280,
          overflow: "scroll !important",
        },
      }}
      sx={{ zIndex: 0 }}
      variant="temporary"
    >
      <Stack justifyContent={"space-between"} sx={{ height: "100%" }}>
        {content}
        <Annoucement />
      </Stack>
    </Drawer>
  );
};
