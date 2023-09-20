import { useTheme } from "@emotion/react";
import { Box } from "@mui/system";
import React from "react";
import './App.css'
import NavBar from './components/NavBar';
import Router from "./route/router";


function App() {
  const theme = useTheme();

  React.useEffect(() => {
    
  })
  return (
    <Box sx={{ backgroundColor: theme.palette.secondary.dark }}>
      <NavBar />
      <Router />
    </Box>
  );
}

export default App;