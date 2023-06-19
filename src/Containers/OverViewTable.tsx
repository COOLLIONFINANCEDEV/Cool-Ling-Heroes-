import React from "react";
import CreateRowData from "../Helpers/CreateRowData";
import { ADMINKEY, LENDERKEY } from "../Components/Table/TableKeys";
import { Box, Skeleton, Chip } from "@mui/material";
import { OverViewContext } from "../Context/OverViewContext";
import Action from "../Components/Table/Action";
import FormatMoney from "../Helpers/FormatMoney";
import FormatDate from "../Helpers/FormatDate";
import { useSelector } from "react-redux";
import { selectLogin } from "../Toolkit/Login/LoginSlice";
import Roles from "../Seeds/Roles";
import TableCustomze from "../Components/Table/TableCustomze";

interface TABLECUSTOMZE {
  information: any;
}

const OverViewTable: React.FC<TABLECUSTOMZE> = ({ information }) => {
  const CreateData = new CreateRowData(LENDERKEY().body);
  const { user } = useSelector(selectLogin);
  const [rows, setRows] = React.useState<Array<{}>>([]);
  const OverViewContextValue = React.useContext(OverViewContext);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const skeletonGroupe =
    user.role === Roles.lender
      ? LENDERKEY().head.map((item) => (
          <Skeleton width={"100%"} height={"50px"} animation="wave" />
        ))
      : ADMINKEY().head.map((item) => (
          <Skeleton width={"100%"} height={"50px"} animation="wave" />
        ));

  const LoaderContent = CreateData.create(skeletonGroupe);

  React.useEffect(() => {
    if (information) {
      const data: any = [];
      if (user.role === Roles.lender) {
        information.forEach((item: any) => {
          data.push(
            CreateData.create([
              item.id,
              FormatMoney(item.amount) + " $",
              item.term,
              FormatMoney(item.gain) + " $",
              <Chip
                label={item.status}
                variant="outlined"
                color={
                  item.status.toLowerCase() === "pending"
                    ? "info"
                    : item.status.toLowerCase() === "confirmed"
                    ? "success"
                    : item.status.toLowerCase() === "rejected"
                    ? "error"
                    : "warning"
                }
              />,
              item.accepted ? (
                FormatDate(item.date_of_refund)
              ) : (
                <Chip
                  label={"unavailable"}
                  color="warning"
                  variant="outlined"
                />
              ),
              FormatMoney(item.amount + item.gain) + " $",
              <Action information={item} />,
            ])
          );
        });
      } else {
        information.forEach((item: any) => {
          data.push(
            CreateData.create([
              item.id,
              item.User.phone_number,
              FormatMoney(item.amount) + "$",
              item.term,
              FormatMoney(item.gain) + "$",
              <Chip
                label={item.status}
                variant="outlined"
                color={
                  item.status.toLowerCase() === "pending"
                    ? "info"
                    : item.status.toLowerCase() === "confirmed"
                    ? "success"
                    : item.status.toLowerCase() === "rejected"
                    ? "error"
                    : "warning"
                }
              />,
              item.accepted ? (
                FormatDate(item.date_of_refund)
              ) : (
                <Chip
                  label={"unavailable"}
                  color="warning"
                  variant="outlined"
                />
              ),
              FormatMoney(item.amount + item.gain) + "$",
              <Action information={item} />,
            ])
          );
        });
      }
      setRows(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [information]);

  React.useEffect(() => {
    if (OverViewContextValue?.state) {
      setRows([LoaderContent, ...rows]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [OverViewContextValue?.state]);

  return (
    <Box mt={4}>
      <TableCustomze
        headKey={
          user.role === Roles.lender ? LENDERKEY().head : ADMINKEY().head
        }
        rows={rows.reverse()}
      />
    </Box>
  );
};

export default OverViewTable;
