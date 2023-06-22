import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  SvgIcon,
} from "@mui/material";
import { PlusIcon } from "@heroicons/react/24/solid";
import React from "react";
import AnnoucementTable from "../Components/Annoucement/AnnoucementTable";
import { AnnoucementContext } from "../Context/AnnoucementContext";
import CreateModal from "../Components/Modal/CreateModal";
import AnnoucementCreate from "../Components/Annoucement/AnnoucementCreate";

const AnnoucementDashboard = () => {
  const [information, setInformation] = React.useState([]);
  const [Loader, setLoader] = React.useState(true);
  return (
    <AnnoucementContext.Provider
      value={{
        state: Loader,
        handle: setLoader,
        handleInformation: setInformation,
      }}
    >
      <Card sx={{ width: "100%" }}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          flexWrap={'wrap'}
        >
          <CardHeader
            subheader="Update or add annoucements"
            title="Annoucements"
          />
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <CreateModal
              ModalContent={AnnoucementCreate}
              closeButton
              contentProps={{ information }}
            >
              <Button
                startIcon={
                  <SvgIcon fontSize="small">
                    <PlusIcon />
                  </SvgIcon>
                }
                variant="contained"
              >
                Add
              </Button>
            </CreateModal>
          </CardActions>
        </Stack>
        <Divider />
        <CardContent>
          <Stack spacing={3} sx={{ width: "100%" }}>
            <AnnoucementTable information={information} />
          </Stack>
        </CardContent>
        <Divider />
      </Card>
    </AnnoucementContext.Provider>
  );
};

export default AnnoucementDashboard;
