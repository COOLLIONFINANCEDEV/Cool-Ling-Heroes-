/* eslint-disable no-new-wrappers */
import {
  Collapse,
  IconButton,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

interface CREATEBODY {
  row: any;
  mode: boolean;
}

const CreateBody: React.FC<CREATEBODY> = ({ row, mode = false }) => {
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
          <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
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
              <TableCell key={key}>{item}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                {row.Content}
              </Collapse>
            </TableCell>
          </TableRow>
        </React.Fragment>
      ) : (
        <>
          <TableRow key={row.name}>
            {rows.map((item, key) => (
              <TableCell sx={{ textTransform: "capitalize" }} key={key} >
                {typeof item === "string" ? item.toLowerCase() : item}
              </TableCell>
            ))}
          </TableRow>
        </>
      )}
    </TableBody>
  );
};

export default CreateBody;
