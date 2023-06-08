import { TableRow} from "@mui/material";
import React from "react";
import StyledTableCell from "./StyledTableCell";

const CreateHead = ({ head }: any) => {
  return (
    <TableRow>
      {head.map((item: any, key: any) => (
        <StyledTableCell key={item}>
          {item}
        </StyledTableCell>
      ))}
    </TableRow>
  );
};

export default CreateHead;
