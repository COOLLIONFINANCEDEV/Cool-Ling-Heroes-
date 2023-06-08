/* eslint-disable no-new-wrappers */
import { Collapse, IconButton, TableBody, TableCell } from "@mui/material";
import React from "react";
import StyledTableRow from "./StyledTableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import StyledTableCell from "./StyledTableCell";

const CreateBody = ({ row, mode = false }) => {
  const [open, setOpen] = React.useState(false);
  const rows = [];
  // console.log(row);
  for (const key in row) {
    if (row.hasOwnProperty.call(row, key)) {
      if (key !== "Content") {
        const element = row[key];
        rows.push(element);
      }
    }
  }
  return (
    <TableBody>
      {!mode ? (
        <React.Fragment>
          <StyledTableRow sx={{ "& > *": { borderBottom: "unset" } }}>
            <TableCell>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
            {rows.map((item, key) => (
              <StyledTableCell key={key}>{item}</StyledTableCell>
            ))}
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell
              style={{ paddingBottom: 0, paddingTop: 0 }}
              colSpan={12}
            >
              <Collapse in={open} timeout="auto" unmountOnExit>
                {row.Content}
              </Collapse>
            </StyledTableCell>
          </StyledTableRow>
        </React.Fragment>
      ) : (
        <>
          <StyledTableRow key={row.name}>
            {rows.map((item, key) => (
              <StyledTableCell sx={{ textTransform: "capitalize" }} key={key}>
                {typeof item === "string" ? item.toLowerCase() : item}
              </StyledTableCell>
            ))}
          </StyledTableRow>
        </>
      )}
    </TableBody>
  );
};

export default CreateBody;
