import React from "react";
import {
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Typography,
} from "@mui/material";

import Redirect from "../../Helpers/Redirect";
import { Settings, Logout } from "@mui/icons-material";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import AccountTreeIcon from "@mui/icons-material/AccountTree";

// interface NAVBARMENU {
//   handleClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
//   open: boolean;
//   anchorEl: Element | ((element: Element) => Element) | null | undefined;
// }

const NavBarMenu = ({ anchorEl, open, handleClose }) => {
  const logout = React.useCallback(() => {}, []);

  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem>
        {/* <Avatar alt="Remy Sharp" src={user.image} size="small">
          {VerifyValue(user.image) === "" && <AccountCircleIcon />}
        </Avatar>
        <Typography variant="p" sx={{ padding: "0 70px 0 0" }}>
          {VerifyValue(user.first_name)} {VerifyValue(user.last_name)}(
          {user.role})
        </Typography> */}
      </MenuItem>
      <Divider />
      <MenuItem>
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        Settings
      </MenuItem>
      {/* <Redirect link={SettingsRouteLink()}>
          <MenuItem>
            <ListItemIcon>
              <DashboardIcon fontSize="small" />
            </ListItemIcon>
            Dashboard
          </MenuItem>
        </Redirect> */}

      <Redirect link={"l"}>
        <MenuItem>
          <ListItemIcon>
            <BackupTableIcon fontSize="small" />
          </ListItemIcon>
          my Projects
        </MenuItem>
      </Redirect>

      <Redirect link={"l"}>
        <MenuItem>
          <ListItemIcon>
            <AccountTreeIcon fontSize="small" />
          </ListItemIcon>
          PROJECTS
        </MenuItem>
      </Redirect>

      <MenuItem onClick={logout}>
        <ListItemIcon>
          <Logout fontSize="small" color="error" />
        </ListItemIcon>
        <Typography color="error">Logout</Typography>
      </MenuItem>
    </Menu>
  );
};

export default NavBarMenu;
