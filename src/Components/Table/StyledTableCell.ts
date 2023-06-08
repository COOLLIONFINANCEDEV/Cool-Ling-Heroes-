import styled from "@emotion/styled";
import { TableCell, tableCellClasses } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.light,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default StyledTableCell;
