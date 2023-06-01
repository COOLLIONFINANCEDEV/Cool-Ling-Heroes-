import { createTheme } from "@mui/material";
import palette from "./palette";
import { Typographie } from "./Typographie";
import Breakponts from "./BreakPonts";

const theme = createTheme({
  palette: palette,
  typography: Typographie,
  breakpoints: Breakponts,
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...{
            fontSize: "13px",
            borderRadius: "100px",
          },
        }),
      },
    },
  },
});

export default theme;
