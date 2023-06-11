import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton, ListItemIcon, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@emotion/react";
import CreateModal from "../Modal/CreateModal";
import ShowInvestment from "../Investments/ShowInvestement";

interface ACTION {
  information: any;
}

const Action: React.FC<ACTION> = ({ information }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const editProject = () => {
    handleClose();
  };

  const { palette } = useTheme();

  return (
    <div>
      <IconButton
        aria-controls={open ? "" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon color="primary" />
      </IconButton>
      <Menu
        aria-labelledby=""
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
        <CreateModal
          ModalContent={ShowInvestment}
          closeButton
          contentProps={{ interetInformation: information }}
          closeButtonFunc={handleClose}
        >
          <MenuItem>
            <ListItemIcon>
              <OpenInNewIcon fontSize="small" />
            </ListItemIcon>
            <Typography sx={{ fontWeight: 350, fontSize: "0.8rem" }}>
              See more info
            </Typography>
          </MenuItem>
        </CreateModal>

        <MenuItem onClick={editProject}>
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
