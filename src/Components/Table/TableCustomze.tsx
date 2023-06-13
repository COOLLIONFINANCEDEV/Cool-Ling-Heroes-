import React from "react";
import { Paper, TableContainer, TableHead, Table, Box } from "@mui/material";
import CreateHead from "./CreateHead";
import CreateBody from "./CreateBody";


interface TABLECUSTOMZE {
  headKey: Array<string>;
  rows: Array<{}>;
}

const TableCustomze: React.FC<TABLECUSTOMZE> = ({ headKey, rows }) => {
  return (
    <Box mt={4}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <CreateHead head={headKey} />
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
