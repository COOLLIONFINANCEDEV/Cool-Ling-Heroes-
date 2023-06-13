import React from "react";
import CreateRowData from "../Helpers/CreateRowData";
import { CUSTOMERSKEY, LENDERKEY } from "../Components/Table/TableKeys";
import { Box, Skeleton, Chip } from "@mui/material";
import Action from "../Components/Table/Action";
import TableCustomze from "../Components/Table/TableCustomze";
import { CustomersContext } from "../Context/CustomersContext";

interface TABLECUSTOMZE {
  information: any;
}

const CustomersTable: React.FC<TABLECUSTOMZE> = ({ information }) => {
  const CreateData = new CreateRowData(LENDERKEY().body);
  const [rows, setRows] = React.useState<Array<{}>>([]);
  const CustomersContextValues = React.useContext(CustomersContext);
  const skeletonGroupe = CUSTOMERSKEY().head.map((item) => (
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
        data.push(
          CreateData.create([
            item.id,
            item.full_name ? (
              item.full_name
            ) : (
              <Chip label={"unavailable"} color="warning" variant="outlined" />
            ),
            item.phone_number,
            item.email,
            item.role,
            <Chip
              label={item.account_activated ? "active" : "disable"}
              variant="outlined"
              color={item.account_activated ? "success" : "error"}
            />,
            <Action information={item} />,
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
      <TableCustomze headKey={CUSTOMERSKEY().head} rows={rows} />
    </Box>
  );
};

export default CustomersTable;
