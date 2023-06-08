import { useCallback } from "react";
import {
  Box,
  Divider,
  MenuItem,
  MenuList,
  Popover,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { selectLogin } from "../../Toolkit/Login/LoginSlice";

interface ACCOUNTPOPOVER {
  anchorEl: Element | ((element: Element) => Element) | null | undefined;
  onClose:
    | ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void)
    | undefined;
  open: boolean;
}

export const AccountPopover: React.FC<ACCOUNTPOPOVER> = ({
  anchorEl,
  onClose,
  open,
}) => {
  const { user } = useSelector(selectLogin);

  const handleSignOut = useCallback(() => {}, []);

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
        }}
      >
        <Typography
          variant="subtitle2"
          fontWeight={800}
          textTransform={"lowercase"}
        >
          {user.role[0].toUpperCase() + user.role.slice(1, user.role.length)}{" "}
          account
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {user.name} {user.lastName}
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: "8px",
          "& > *": {
            borderRadius: 1,
          },
        }}
      >
        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
      </MenuList>
    </Popover>
  );
};