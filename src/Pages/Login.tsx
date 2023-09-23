import { Box, useTheme } from '@mui/material';
import React from 'react';
import Connect from '../Components/Login/Connect';
import Logo from '../Components/Navbar/Logo';

const Login = () => {
 

  const { palette } = useTheme();

  const loginStyle = {
    marginTop: '5vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    // pb: 15,
  };

  const LoginFormStyle = {
    width: '100%',
    maxWidth: { xs: '80%', md: '50%' },
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid',
    borderColor: palette.secondary.main,
    borderRadius: '10px',
    flexDirection: 'column',
    backgroundColor: palette.secondary.light,
    rowGap: '30px',
    padding: '5vh 3vw',
  };


  return (
    <Box sx={loginStyle}>
      <Box sx={LoginFormStyle}>
        <Logo dark={true} />
        <Connect />
      </Box>
    </Box>
  );
};

export default Login;
