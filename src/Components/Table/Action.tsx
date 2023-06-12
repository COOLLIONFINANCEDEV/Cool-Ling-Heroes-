import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton, ListItemIcon, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useTheme } from "@emotion/react";
import CreateModal from "../Modal/CreateModal";
import ShowInvestment from "../Investments/ShowInvestement";
import ReduceInvest from "../Payments/ReduceInvest";
import DownhillSkiingIcon from "@mui/icons-material/DownhillSkiing";
import Roles from "../../Seeds/Roles";
import { selectLogin } from "../../Toolkit/Login/LoginSlice";
import CheckInvestment from "../Investments/CheckInvestment";
import { useSelector } from "react-redux";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import Refund from "../Investments/Refund";

interface ACTION {
  information: any;
}

const Action: React.FC<ACTION> = ({ information }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { user } = useSelector(selectLogin);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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

        {user.role === Roles.lender && (
          <CreateModal
            ModalContent={ReduceInvest}
            closeButton
            contentProps={{ information: information }}
            closeButtonFunc={handleClose}
          >
            <MenuItem color="info">
              <ListItemIcon>
                <DownhillSkiingIcon fontSize="small" color="info" />
              </ListItemIcon>
              <Typography
                sx={{ fontWeight: 350, fontSize: "0.8rem" }}
                color={palette.info.main}
              >
                reduces my investment
              </Typography>
            </MenuItem>
          </CreateModal>
        )}

        {user.role !== Roles.lender && (
          <CreateModal
            ModalContent={CheckInvestment}
            closeButton
            contentProps={{ information: information }}
            closeButtonFunc={handleClose}
            noOpen={![Roles.moderator, Roles.admin].includes(user.role)}
          >
            <MenuItem
              color="info"
              disabled={![Roles.moderator, Roles.admin].includes(user.role)}
            >
              <ListItemIcon>
                <VerifiedUserIcon fontSize="small" color="info" />
              </ListItemIcon>
              <Typography
                sx={{ fontWeight: 350, fontSize: "0.8rem" }}
                color={palette.info.main}
              >
                Check payment
              </Typography>
            </MenuItem>
          </CreateModal>
        )}

        {user.role !== Roles.lender && (
          <CreateModal
            ModalContent={Refund}
            closeButton
            contentProps={{ information: information }}
            closeButtonFunc={handleClose}
            noOpen={![Roles.moderator, Roles.admin].includes(user.role)}
          >
            <MenuItem
              color="warning"
              disabled={![Roles.moderator, Roles.admin].includes(user.role)}
            >
              <ListItemIcon>
                <ChangeCircleIcon fontSize="small" color="warning" />
              </ListItemIcon>
              <Typography
                sx={{ fontWeight: 350, fontSize: "0.8rem" }}
                color={palette.warning.main}
              >
                Refund
              </Typography>
            </MenuItem>
          </CreateModal>
        )}

        {/* <MenuItem disabled>
          <ListItemIcon>
            <DeleteIcon color="error" fontSize="small" />
          </ListItemIcon>
          <Typography
            sx={{
              color: palette.error.main,
              fontWeight: 350,
              fontSize: "0.8rem",
            }}
          >
            {" "}
            Delete
          </Typography>
        </MenuItem> */}
      </Menu>
    </div>
  );
};

export default Action;
