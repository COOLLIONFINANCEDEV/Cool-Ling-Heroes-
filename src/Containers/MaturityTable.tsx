import React from "react";
import CreateRowData from "../Helpers/CreateRowData";
import { DONATOR_KEY, MATURITYKEY } from "../Components/Table/TableKeys";
import { Box, Skeleton, Chip, Typography } from "@mui/material";
import FormatMoney from "../Helpers/FormatMoney";
import FormatDate from "../Helpers/FormatDate";
import TableCustomze from "../Components/Table/TableCustomze";
import { MaturityContext } from "../Context/MaturityContext";
import { sortByDate } from "../Helpers/SortByDate";
import { isSameWeek } from "date-fns";

interface TABLECUSTOMZE {
  information: any;
}

const MaturityTable: React.FC<TABLECUSTOMZE> = ({ information }) => {
  const CreateData = new CreateRowData(DONATOR_KEY().body);
  const [rows, setRows] = React.useState<Array<{}>>([]);
  const MaturityContextValue = React.useContext(MaturityContext);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const skeletonGroupe = MATURITYKEY().head.map((item) => (
    <Skeleton width={"100%"} height={"50px"} animation="wave" key={item} />
  ));

  const LoaderContent = CreateData.create(skeletonGroupe);

  React.useEffect(() => {
    const data: any = [];
    const mapData = sortByDate(
      information.filter((item: any) => item.date_of_refund)
    );
    mapData.push(...information.filter((item: any) => !item.date_of_refund));
    mapData.forEach((item: any) => {
      data.push(
        CreateData.create([
          item.id,
          <Typography
            color={
              isSameWeek(new Date(), new Date(item.date_of_refund)) && !item.refunded
                ? "error"
                : "initial"
            }
          >
            {item.User.phone_number}
          </Typography>,
          <Chip
            label={item.refunded ? "confirmed" : "pending"}
            variant="outlined"
            color={item.refunded ? "success" : "info"}
          />,
          <Typography
            color={
              isSameWeek(new Date(), new Date(item.date_of_refund)) && !item.refunded
                ? "error"
                : "initial"
            }
          >
            {FormatMoney(item.amount) + " $"}
          </Typography>,
          <Typography
            color={
              isSameWeek(new Date(), new Date(item.date_of_refund)) && !item.refunded
                ? "error"
                : "initial"
            }
          >
            {FormatMoney(item.amount + item.gain) + " $"}
          </Typography>,
          item.accepted ? (
            <Typography
              color={
                isSameWeek(new Date(), new Date(item.date_of_refund)) && !item.refunded
                  ? "error"
                  : "initial"
              }
            >
              {FormatDate(item.date_of_refund)}
            </Typography>
          ) : (
            <Chip label={"unavailable"} color="warning" variant="outlined" />
          ),
        ])
      );
    });
    setRows(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [information]);

  React.useEffect(() => {
    if (MaturityContextValue?.state) {
      setRows([LoaderContent, ...rows]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [MaturityContextValue?.state]);

  return (
    <Box mt={4}>
      <TableCustomze headKey={MATURITYKEY().head} rows={rows} />
    </Box>
  );
};

export default MaturityTable;
