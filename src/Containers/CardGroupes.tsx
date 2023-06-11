import React from "react";
import CardCustomze, { CARD } from "../Components/overview/CardCustomze";
import { Grid } from "@mui/material";

interface CARDGROUPE {
  CardItemInfo: Array<CARD>;
}

const CardGroupes: React.FC<CARDGROUPE> = ({ CardItemInfo }) => {
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
      {/* <Grid
            xs={12}
            lg={8}
          >
            
          </Grid> */}
    </Grid>
  );
};

export default CardGroupes;
