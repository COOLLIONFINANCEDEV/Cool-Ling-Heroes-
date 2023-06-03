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
    MuiTypography: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...{
           color: '#3f3d56',
          },
        }),
      },
    },
  },
});

export default theme;
