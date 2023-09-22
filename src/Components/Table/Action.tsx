import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  Box,
  IconButton,
  ListItemIcon,
  Typography,
  useTheme,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
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
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteInvestment from "../Investments/DeleteInvestment";
import { useLocation } from "react-router-dom";
import routes from "../../Router/routes";
import ChangeRole from "../Customers/ChangeRole";
import AnnoucementInfos from "../Annoucement/AnnoucementInfos";
import AnnoucementUpdate from "../Annoucement/AnnoucementUpdate";
import AnnoucementDelete from "../Annoucement/AnnoucementDelete";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import Investments from "../Investments/Investments";

interface ACTION {
  information: any;
}

const Action: React.FC<ACTION> = ({ information }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [route, setRoute] = React.useState("");
  const { user } = useSelector(selectLogin);
  const location = useLocation();

  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { palette } = useTheme();

  React.useEffect(() => {
    const route = location.pathname.split("/").at(-1);
    if (route) {
      setRoute(route);
    }
  }, [location.pathname]);

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
        {/* overView Items */}
        {route === routes.dashboard && (
          <Box>
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

            {user.role === Roles.donator && (
              <CreateModal
                ModalContent={Investments}
                closeButton
                contentProps={{ investmentInfo: information, stepper: 1 }}
                closeButtonFunc={handleClose}
                noOpen={!!information.proof}
              >
                <MenuItem color="info" disabled={!!information.proof}>
                  <ListItemIcon>
                    <NoteAddIcon fontSize="small" color="warning" />
                  </ListItemIcon>
                  <Typography
                    sx={{ fontWeight: 350, fontSize: "0.8rem" }}
                    color={palette.warning.main}
                  >
                    Upload Record
                  </Typography>
                </MenuItem>
              </CreateModal>
            )}

            {user.role === Roles.donator && (
              <CreateModal
                ModalContent={ReduceInvest}
                closeButton
                contentProps={{ information: information }}
                closeButtonFunc={handleClose}
                noOpen={!information.accepted}
              >
                <MenuItem color="info" disabled={!information.accepted}>
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

            {user.role !== Roles.donator && (
              <CreateModal
                ModalContent={CheckInvestment}
                closeButton
                contentProps={{ information: information }}
                closeButtonFunc={handleClose}
                noOpen={
                  ![Roles.admin].includes(user.role) ||
                  information.accepted ||
                  !information.proof
                }
              >
                <MenuItem
                  color="info"
                  disabled={
                    ![Roles.admin].includes(user.role) ||
                    information.accepted ||
                    !information.proof
                  }
                >
                  <ListItemIcon>
                    <VerifiedUserIcon fontSize="small" color="info" />
                  </ListItemIcon>
                  <Typography
                    sx={{ fontWeight: 350, fontSize: "0.8rem" }}
                    color={palette.info.main}
                  >
                    Activate investment
                  </Typography>
                </MenuItem>
              </CreateModal>
            )}

            {user.role !== Roles.donator && (
              <CreateModal
                ModalContent={Refund}
                closeButton
                contentProps={{ information: information }}
                closeButtonFunc={handleClose}
                noOpen={
                  ![Roles.admin].includes(user.role) || !information.accepted
                }
              >
                <MenuItem
                  color="warning"
                  disabled={
                    ![Roles.admin].includes(user.role) || !information.accepted
                  }
                >
                  <ListItemIcon>
                    <ChangeCircleIcon fontSize="small" color="warning" />
                  </ListItemIcon>
                  <Typography
                    sx={{ fontWeight: 350, fontSize: "0.8rem" }}
                    color={palette.warning.main}
                  >
                    Refund investment
                  </Typography>
                </MenuItem>
              </CreateModal>
            )}

            {user.role === Roles.donator && (
              <CreateModal
                ModalContent={DeleteInvestment}
                closeButton
                contentProps={{ information: information }}
                closeButtonFunc={handleClose}
                noOpen={user.role === Roles.donator && !information.accepted}
              >
                <MenuItem disabled={!information.accepted}>
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
                    Stop investment
                  </Typography>
                </MenuItem>
              </CreateModal>
            )}
          </Box>
        )}

        {/* Customers Items */}
        {route === routes.customers && (
          <Box>
            {user.role !== Roles.donator && (
              <CreateModal
                ModalContent={ChangeRole}
                closeButton
                contentProps={{ information: information }}
                closeButtonFunc={handleClose}
                noOpen={
                  ![Roles.admin].includes(user.role) ||
                  information.accepted
                }
              >
                <MenuItem
                  color="info"
                  disabled={
                    ![Roles.admin].includes(user.role) ||
                    information.accepted
                  }
                >
                  <ListItemIcon>
                    <ChangeCircleIcon fontSize="small" color="info" />
                  </ListItemIcon>
                  <Typography
                    sx={{ fontWeight: 350, fontSize: "0.8rem" }}
                    color={palette.info.main}
                  >
                    Change Role
                  </Typography>
                </MenuItem>
              </CreateModal>
            )}
          </Box>
        )}

        {/* Annoucement Items */}
        {route === routes.setting && (
          <Box>
            <CreateModal
              ModalContent={AnnoucementInfos}
              closeButton
              contentProps={{ information: information }}
              closeButtonFunc={handleClose}
            >
              <MenuItem>
                <ListItemIcon>
                  <OpenInNewIcon fontSize="small" />
                </ListItemIcon>
                <Typography sx={{ fontWeight: 350, fontSize: "0.8rem" }}>
                  Show
                </Typography>
              </MenuItem>
            </CreateModal>

            <CreateModal
              ModalContent={AnnoucementUpdate}
              closeButton
              contentProps={{ information: information }}
              closeButtonFunc={handleClose}
            >
              <MenuItem color="info">
                <ListItemIcon>
                  <VerifiedUserIcon fontSize="small" color="info" />
                </ListItemIcon>
                <Typography
                  sx={{ fontWeight: 350, fontSize: "0.8rem" }}
                  color={palette.info.main}
                >
                  Update
                </Typography>
              </MenuItem>
            </CreateModal>

            <CreateModal
              ModalContent={AnnoucementDelete}
              closeButton
              contentProps={{ information: information }}
              closeButtonFunc={handleClose}
            >
              <MenuItem>
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
                  Delete
                </Typography>
              </MenuItem>
            </CreateModal>
          </Box>
        )}
      </Menu>
    </div>
  );
};

export default Action;
