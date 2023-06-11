import React from "react";
import CreateRowData from "../Helpers/CreateRowData";
import { LENDERKEY } from "../Components/Table/TableKeys";
import {
  Paper,
  TableContainer,
  TableHead,
  Table,
  Box,
  Skeleton,
  Chip,
} from "@mui/material";
import CreateHead from "../Components/Table/CreateHead";
import CreateBody from "../Components/Table/CreateBody";
import { OverViewContext } from "../Context/OverViewContext";
import Action from "../Components/Table/Action";
import FormatMoney from "../Helpers/FormatMoney";
import FormatDate from "../Helpers/FormatDate";

interface TABLECUSTOMZE {
  information: any;
}

const TableCustomze: React.FC<TABLECUSTOMZE> = ({ information }) => {
  const CreateData = new CreateRowData(LENDERKEY().body);
  const [rows, setRows] = React.useState<Array<{}>>([]);
  const OverViewContextValue = React.useContext(OverViewContext);
  const state = OverViewContextValue ? OverViewContextValue.state : false;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const LoaderContent = [
    <Skeleton width={"100%"} height={"50px"} animation="wave" />,
    <Skeleton width={"100%"} height={"50px"} animation="wave" />,
    <Skeleton width={"100%"} height={"50px"} animation="wave" />,
    <Skeleton width={"100%"} height={"50px"} animation="wave" />,
    <Skeleton width={"100%"} height={"50px"} animation="wave" />,
    <Skeleton width={"100%"} height={"50px"} animation="wave" />,
    <Skeleton width={"100%"} height={"50px"} animation="wave" />,
    <Skeleton width={"100%"} height={"50px"} animation="wave" />,
    <Skeleton width={"100%"} height={"50px"} animation="wave" />,
  ];

  React.useEffect(() => {
    if (information) {
      const data: any = [];
      information.forEach((item: any) => {
        data.push(
          CreateData.create([
            item.id,
            FormatMoney(item.amount) + " $",
            item.term,
            item.gain + " %",
            <Chip
              label={item.status}
              variant="outlined"
              color={
                item.status.toLowerCase() === "pending"
                  ? "info"
                  : item.status.toLowerCase() === "completed"
                  ? "success"
                  : "warning"
              }
            />,
            item.accepted ? (
              FormatDate(item.refunded_at)
            ) : (
              <Chip label={"unavailable"} color="warning" variant="outlined" />
            ),
            FormatMoney(item.amount + item.amount * (item.gain / 100)) + " $",
            <Action information={item} />,
          ])
        );
      });
      setRows(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [information]);

  React.useEffect(() => {
    if (state) {
      const table = rows;
      rows.unshift(LoaderContent);
      setRows(table);
    }
  }, [LoaderContent, rows, state]);

  return (
    <Box mt={4}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <CreateHead head={LENDERKEY().head} />
          </TableHead>

          {rows.map((row, key) => (
            <CreateBody key={key} row={row} mode={true} />
          ))}
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableCustomze;
