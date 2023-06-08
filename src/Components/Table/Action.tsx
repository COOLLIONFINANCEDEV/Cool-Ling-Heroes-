import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton, ListItemIcon, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@emotion/react";

const Action = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event:any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const SeeMoreButton = () => {
    handleClose();
  };

  const editProject = () => {
    handleClose();
  };

  const { palette } = useTheme();

  return (
    <div>
      <IconButton
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon color="primary" />
      </IconButton>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
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
        <MenuItem onClick={SeeMoreButton}>
          <ListItemIcon>
            <OpenInNewIcon />
          </ListItemIcon>
          <Typography> See more info</Typography>
        </MenuItem>

        <MenuItem  onClick={editProject}>
          <ListItemIcon>
            <EditIcon color="warning" />
          </ListItemIcon>
          <Typography sx={{ color: palette.warning.main }}>
            Enable/disable
          </Typography>
        </MenuItem>
        {/* <CreateModal
          OpenButton={GenerateModalButton}
          ModalContent={DeleteProject}
        > */}
        <MenuItem disabled>
          <ListItemIcon>
            <DeleteIcon color="error" />
          </ListItemIcon>
          <Typography sx={{ color: palette.error.main }}> Delete</Typography>
        </MenuItem>
        {/* </CreateModal> */}
      </Menu>
    </div>
  );
};

export default Action;
