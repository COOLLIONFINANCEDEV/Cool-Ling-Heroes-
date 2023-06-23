import React from "react";
import {
  Paper,
  TableContainer,
  TableHead,
  Table,
  Box,
  TablePagination,
} from "@mui/material";
import CreateHead from "./CreateHead";
import CreateBody from "./CreateBody";

interface TABLECUSTOMZE {
  headKey: Array<string>;
  rows: Array<{}>;
}

const TableCustomze: React.FC<TABLECUSTOMZE> = ({ headKey, rows }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer
        component={Paper}
        sx={{ maxHeight: { xs: 250, md: 400 } }}
      >
        <Table
          sx={{ minWidth: 700, overflow: "scroll !important" }}
          stickyHeader
        >
          <TableHead>
            <CreateHead head={headKey} />
          </TableHead>

          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, key) => (
              <CreateBody key={key} row={row} mode={true} />
            ))}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ display: "flex", justifyContent: "flex-start" }}
      />
    </Box>
  );
};

export default TableCustomze;
