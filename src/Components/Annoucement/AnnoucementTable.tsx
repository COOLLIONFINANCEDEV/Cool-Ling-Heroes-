import React from "react";
import CreateRowData from "../../Helpers/CreateRowData";
import { ANNOUCEMENTKEYS } from "../Table/TableKeys";
import { AnnoucementContext } from "../../Context/AnnoucementContext";
import { Box, Chip, Skeleton } from "@mui/material";
import Action from "../Table/Action";
import TableCustomze from "../Table/TableCustomze";

interface ANNOUCEMENTTABLE {
  information: any;
}

const AnnoucementTable: React.FC<ANNOUCEMENTTABLE> = ({ information }) => {
  const CreateData = new CreateRowData(ANNOUCEMENTKEYS().body);
  const [rows, setRows] = React.useState<Array<{}>>([]);
  const AnnoucementContextValue = React.useContext(AnnoucementContext);
  const skeletonGroupe = ANNOUCEMENTKEYS().head.map((item) => (
    <Skeleton width={"100%"} height={"50px"} animation="wave" key={item} />
  ));

  const LoaderContent = CreateData.create(skeletonGroupe);

  React.useEffect(() => {
    if (AnnoucementContextValue?.state) {
      setRows([LoaderContent, ...rows]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [AnnoucementContextValue?.state]);

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
              key={item.id}
            />,
            <Action information={item} key={item.id} />,
          ])
        );
      });
      setRows(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [information]);

  React.useEffect(() => {
    if (AnnoucementContextValue?.state) {
      setRows([LoaderContent, ...rows]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [AnnoucementContextValue?.state]);

  return <TableCustomze headKey={ANNOUCEMENTKEYS().head} rows={rows} />;
};

export default AnnoucementTable;
