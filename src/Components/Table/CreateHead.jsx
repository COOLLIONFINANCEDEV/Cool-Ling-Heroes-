import { TableRow, Typography } from "@mui/material";
import React from "react";
import StyledTableCell from "./StyledTableCell";

const CreateHead = ({ head }) => {
  return (
    <TableRow>
      {head.map((item, key) => (
        <StyledTableCell key={item} >
          <Typography sx={{ textTransform: "capitalize" }}>{item}</Typography>
        </StyledTableCell>
      ))}
    </TableRow>
  );
};

export default CreateHead;
