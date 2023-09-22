import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import { Box, Chip, IconButton, Skeleton } from "@mui/material";
import React from "react";
import TableCustomze from "../Components/Table/TableCustomze";
import { CUSTOMREQUESTKEYS } from "../Components/Table/TableKeys";
import { CustomersContext } from "../Context/CustomersContext";
import CreateRowData from "../Helpers/CreateRowData";
interface TABLECUSTOMZE {
  information: any;
}

const RequestsTable: React.FC<TABLECUSTOMZE> = ({ information }) => {
  const CreateData = new CreateRowData(CUSTOMREQUESTKEYS().body);
  const [rows, setRows] = React.useState<Array<{}>>([]);
  const CustomersContextValues = React.useContext(CustomersContext);
  const skeletonGroupe = CUSTOMREQUESTKEYS().head.map((item) => (
    <Skeleton width={"100%"} height={"50px"} animation="wave" />
  ));

  const LoaderContent = CreateData.create(skeletonGroupe);

  React.useEffect(() => {
    if (CustomersContextValues?.state) {
      setRows([LoaderContent, ...rows]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CustomersContextValues?.state]);

  React.useEffect(() => {
    if (information) {
      
      const data: any = [];
      information.forEach((item: any) => {
        const isDeliveredOrCancel = item.status === "Delivered" || item.status === "Cancel";
        data.push(
          CreateData.create([
            item.id,
            item.beneficiaire ? (
              item.beneficiaire
            ) : (
              <Chip label={"unavailable"} color="warning" variant="outlined" />
            ),
            item.quantityRequest,
            item.requestDate,
            <Chip
            label={item.status === "Delivered" ? "Delivered" : item.status === "Cancel" ? "Cancel" : "In progress"}
            color={
              item.status === "Delivered"
                ? "success"
                : item.status === "Cancel"
                ? "error"
                : "warning"
            }
          />
          ,
            // <Action information={item} />,
            !isDeliveredOrCancel && ( 
            <Box>
              <IconButton
                aria-label="validate"
                color="primary"
                onClick={() => alert("validate success!")}
              >
                <CheckTwoToneIcon fontSize="inherit" />
              </IconButton>
              <IconButton
                aria-label="cancel"
                color="error"
                onClick={() => alert("cancel success!")}
              >
                <CloseTwoToneIcon fontSize="inherit" />
              </IconButton>
            </Box>
          ),
          
          ])
        );
      });
      setRows(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [information]);

  React.useEffect(() => {
    if (CustomersContextValues?.state) {
      setRows([LoaderContent, ...rows]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CustomersContextValues?.state]);

  return (
    <Box mt={4}>
      <TableCustomze headKey={CUSTOMREQUESTKEYS().head} rows={rows} />
    </Box>
  );
};

export default RequestsTable;
