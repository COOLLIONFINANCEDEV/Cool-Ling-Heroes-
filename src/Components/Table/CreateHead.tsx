import { TableCell, TableRow} from "@mui/material";
import React from "react";

const CreateHead = ({ head }: any) => {
  return (
    <TableRow>
      {head.map((item: any, key: any) => (
        <TableCell key={item}>
          {item}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default CreateHead;
