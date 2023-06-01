import { Box, Tab, Tabs, useTheme } from "@mui/material";
import React from "react";
import Connect from "../Components/Login/Connect";
import Register from "../Components/Login/Register";

const Login = () => {
  const [LoginOrRegister, setLoginOrRegister] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const hanbleChange = (item: any, userInfo: any): void => {
    setValue(item);
    setLoginOrRegister(item);
  };

  const { palette } = useTheme();

  const loginStyle = {
    marginTop: "15vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  };

  const LoginFormStyle = {
    width: "100%",
    maxWidth: { xs: "80%", md: "50%" },
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid",
    borderColor: palette.secondary.main,
    borderRadius: "10px",
    flexDirection: "column",
    backgroundColor: palette.secondary.light,
    rowGap: "30px",
    padding: "5vh 3vw",
  };

  const TabWidth = {
    width: "50%",
  };

  return (
    <Box sx={loginStyle}>
      <Box sx={LoginFormStyle}>
        <TabSelect
          items={["Login", "Register"]}
          TabWidth={TabWidth}
          hanbleChange={hanbleChange}
          value={value}
        />
        {LoginOrRegister ? <Register /> : <Connect />}
      </Box>
    </Box>
  );
};

interface TABSELECT {
  items: string[];
  TabWidth: { width: string };
  hanbleChange: Function;
  value: number;
}
const TabSelect: React.FC<TABSELECT> = ({
  items,
  TabWidth,
  hanbleChange,
  value,
}) => {
  const handleChange = (
    event: React.SyntheticEvent,
    newValue: number | string
  ) => {
    hanbleChange(newValue);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        onChange={handleChange}
        value={value}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
        sx={{ width: "100%" }}
      >
        {items.map((item, key) => (
          <Tab label={item} key={item} sx={TabWidth} />
        ))}
      </Tabs>
    </Box>
  );
};

export default Login;
