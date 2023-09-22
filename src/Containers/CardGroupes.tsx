import React from "react";
import CardCustomze, { CARD } from "../Components/dashboard/CardCustomze";
import { Grid } from "@mui/material";

interface CARDGROUPESOVERVIEW {
  CardItemInfo: Array<CARD>;
}

const CardGroupes: React.FC<CARDGROUPESOVERVIEW> = ({ CardItemInfo }) => {

  return (
    <Grid
      container
      spacing={1}
      rowGap={1}
      justifyContent={"space-between"}
      columnGap={2}
      sx={{
        height:200
      }}
     
    >
      {CardItemInfo.map((item) => (
        <Grid  xs={12} sm={5.8} md={2.8} lg={2.8} item key={item.title}>
          <CardCustomze
           {...item}
 />
          
        </Grid>
      ))}
    </Grid>
  );
};

export default CardGroupes;
