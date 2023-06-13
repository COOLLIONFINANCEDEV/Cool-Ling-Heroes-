import React from "react";
import CardCustomze, { CARD } from "../Components/overview/CardCustomze";
import { Grid } from "@mui/material";
import { OverViewContext } from "../Context/OverViewContext";

interface CARDGROUPESOVERVIEW {
  CardItemInfo: Array<CARD>;
}

const CardGroupesOverView: React.FC<CARDGROUPESOVERVIEW> = ({
  CardItemInfo,
}) => {
  const OverViewContextValue = React.useContext(OverViewContext);
  const state = OverViewContextValue ? OverViewContextValue.state : false;
  React.useEffect(() => {
    CardItemInfo.forEach((item) => (item.state = state));
  }, [CardItemInfo, state]);
  return (
    <Grid
      container
      spacing={1}
      rowGap={3}
      justifyContent={"space-between"}
      columnGap={2}
    >
      {CardItemInfo.map((item) => (
        <Grid xs={12} sm={5.8} md={2.8} lg={2.8} item key={item.title}>
          <CardCustomze {...item} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CardGroupesOverView;
