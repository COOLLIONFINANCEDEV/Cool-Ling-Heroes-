import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./Router/router";
import { ThemeProvider } from "@emotion/react";
import theme from "./Theme";
import { Stack } from "@mui/material";
import "./App.css";

function App() {
  return (
    <Stack>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Stack>
  );
} 

export default App;
