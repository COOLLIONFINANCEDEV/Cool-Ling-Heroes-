import React from "react";
import CreateRowData from "../Helpers/CreateRowData";
import { LENDERKEY } from "../Components/Table/TableKeys";
import { Paper, TableContainer, TableHead, Table, Box } from "@mui/material";
import CreateHead from "../Components/Table/CreateHead";
import CreateBody from "../Components/Table/CreateBody";
import Action from "../Components/Table/Action";

const TableCustomze = () => {
  const CreateData = new CreateRowData(LENDERKEY().body);

  const rows = [
    CreateData.create([
      "Frozen yoghurt",
      "15000$",
      "1000$",
      "agriculture",
      "2020-05-22",
      "2020-05-22",
      <Action />,
    ]),
  ];

  console.log(rows);

  return (
    <Box mt={4}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <CreateHead head={LENDERKEY().head} />
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
