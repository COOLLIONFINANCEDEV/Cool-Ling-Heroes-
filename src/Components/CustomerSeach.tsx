import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import {
  Box,
  Card,
  InputAdornment,
  OutlinedInput,
  SvgIcon,
} from "@mui/material";
import { OverViewContext } from "../Pages/OverView";
import { useContext } from "react";

export const CustomersSearch = () => { 
  const OverViewContextValue = useContext(OverViewContext);
  const state = OverViewContextValue ? OverViewContextValue.state : false;
  return <Box mt={2}>
    <Card sx={{ p: 2 }}>
      <OutlinedInput
        defaultValue=""
        fullWidth
        placeholder="Search"
        sx={{ borderRadius: "10px !important" }}
        autoFocus
        disabled={state}        
        startAdornment={
          <InputAdornment position="start">
            <SvgIcon color="action" fontSize="small">
              <MagnifyingGlassIcon />
            </SvgIcon>
          </InputAdornment>
        }
      />
    </Card>
  </Box>
};
