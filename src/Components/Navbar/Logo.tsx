import { Box, IconButton, useTheme } from '@mui/material';
import React from 'react';
import Redirect from '../../Helpers/Redirect';
import routes from '../../Router/routes';
import { selectLogin } from '../../Toolkit/Login/LoginSlice';
import { useSelector } from 'react-redux';

interface LOGO {
  dark?: boolean;
}

const Logo: React.FC<LOGO> = ({ dark = false }) => {
  const { palette } = useTheme();
  const { isAuthenticated } = useSelector(selectLogin);
  const link = isAuthenticated ? routes.home + routes.dashboard : routes.home;
  return (
    <Redirect link={link}>
      <IconButton>
        <Box
          sx={{
            width: '80px',
            padding: '10px 5px',
            borderRadius: '30px',
            backgroundColor: dark ? palette.primary.main : 'white',
          }}>
          {dark ? (
            <img
              style={{ width: '80%', height: '100%' }}
              src='Assets/Icons/LogoDark.svg'
              alt='Cooling Heroes Logo'></img>
          ) : (
            <img
              style={{ width: '80%', height: '100%' }}
              src='Assets/Icons/LogoWhite.svg'
              alt='Cooling Heroes Logo'></img>
          )}
        </Box>
      </IconButton>
    </Redirect>
  );
};

export default Logo;
