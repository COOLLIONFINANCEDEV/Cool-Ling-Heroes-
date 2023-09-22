import React from "react";
import CreateRowData from "../Helpers/CreateRowData";
import { CUSTOMERSKEY, CUSTOMPPRODUCTKEYS, LENDERKEY } from "../Components/Table/TableKeys";
import { Box, Skeleton, Chip } from "@mui/material";
import Action from "../Components/Table/Action";
import TableCustomze from "../Components/Table/TableCustomze";
import { CustomersContext } from "../Context/CustomersContext";
import '../styles/Products/blink.css'
interface TABLECUSTOMZE {
  information: any;
}

const ProductsTable: React.FC<TABLECUSTOMZE> = ({ information }) => {
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
            
            item.name ? (
              item.name
            ) : (
              <Chip label={"unavailable"} color="warning" variant="outlined" />
            ),
            item.quantite,
          
            <Chip
            label={item.quantiterest < item.stockAlert ? item.quantiterest : item.quantiterest}
            color={item.quantiterest < item.stockAlert ? "error" : "success"}
            variant="outlined"
            className={item.quantiterest < item.stockAlert ? "blinking" : ""}
          />,
          item.stockAlert,
            , 
            item.exp,
            item.donnateur,
          
            <Chip
              label={item.status ? "active" : "disable"}
              variant="outlined"
              color={item.status ? "success" : "error"}
             
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
      <TableCustomze headKey={CUSTOMPPRODUCTKEYS().head} rows={rows}  />
    </Box>
  );
};

export default ProductsTable;
