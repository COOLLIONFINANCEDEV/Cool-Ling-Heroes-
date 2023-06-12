import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import GenerateModalButton from "./GenerateModalButton";
import { Box, IconButton, Stack } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

interface CREATEMODAL {
  children?: React.ReactNode;
  ModalContent: any;
  contentProps?: {};
  makeOpen?: boolean;
  noLeave?: boolean;
  closeButton?: boolean;
  closeButtonFunc?: Function;
  style?: {};
  noOpen?: boolean;
}

const CreateModal: React.FC<CREATEMODAL> = ({
  children,
  ModalContent,
  contentProps,
  makeOpen = false,
  noLeave = false,
  closeButton = false,
  closeButtonFunc = Function,
  style,
  noOpen = false,
}) => {
  const [open, setOpen] = React.useState(makeOpen);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    closeButtonFunc();
  };

  const CenterContent = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    maxHeight: "100vh",
    overflowY: "scroll !important",
    overflow: "hidden",
    borderRadius: "15px",
    ...style,
  };

  const ContentButton = <>{children}</>;

  return (
    <div>
      <GenerateModalButton
        handleOpen={() => {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          !noOpen ? handleOpen() : undefined;
        }}
        content={ContentButton}
      />
      <Modal
        open={open}
        onClose={noLeave === false ? handleClose : () => {}}
        closeAfterTransition
        BackdropComponent={Backdrop}
        disableScrollLock={true}
        BackdropProps={{
          timeout: 500,
        }}
        sx={{
          zIndex: "1300 !important",
        }}
      >
        <Fade in={open}>
          <Box sx={CenterContent}>
            {closeButton && (
              <Stack
                justifyContent={"flex-end"}
                alignItems={"flex-end"}
                direction={"row"}
                sx={{ m: 0, p: "5px", pl: "10px", position: "absolute" }}
              >
                <IconButton onClick={handleClose}>
                  <CancelOutlinedIcon color={"primary"} fontSize="large" />
                </IconButton>
              </Stack>
            )}
            <ModalContent handleClose={handleClose} {...contentProps} />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default CreateModal;
