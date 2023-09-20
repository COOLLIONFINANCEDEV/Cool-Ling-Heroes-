import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Stack, Box, IconButton, Button, Typography, Toolbar, AppBar } from '@mui/material';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { width } from '../theme/size';
import logo from '../assets/logo.svg';
import SocialFollow from '../core/components/SocialFollow';

function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };


    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Box component="div" sx={{ overflow: 'hidden' }}>
      <AppBar
        position="static"
        sx={{
          width: '100%',
          height: '20vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '15vh',
          padding: '0 !important',
          position: 'fixed',
          background: isScrolled ? '#FFFF' : '#9fb0bf', 
          borderBottom: isScrolled ? '1px solid lightgray' : 'none', 
          transition: 'background-color 0.3s, border-bottom 0.3s', 
          zIndex: 3000,
          transform: isScrolled ? 'scale(0.95)' : 'none', 
          transformOrigin: 'center',
        }}
      >
        <Toolbar
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              position:'absolute',
              top:"0",
              right:"20px"
            }}
          >
            <SocialFollow/>
          </Box>
          <Box
            sx={{
              position: 'absolute',
              top: '10px',
              left: '5px',
              fontSize: { xs: '20px', sm: '20px' },
              fontWeight: { xs: 500, sm: 800 },
            }}
          >
            <img src={logo} alt="Logo" style={{ width: '70px', minWidth: '20px', maxWidth: '70px' }} />
          </Box>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            sx={{
              width: width,
            }}
            spacing={2}
          >
            <Button
              color="inherit"
              component={Link}
              to="/"
              sx={{
                fontFamily: 'Nunito, sans-serif',
                fontWeight: 600,
                color:'#091e3e',
                //background: '#091e3e',
                '&:hover': {
                  backgroundColor: '#01796f', // Couleur au survol
                  color:'#FFF'
                },
              }}
            >
              Accueil
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/login"
              sx={{
                fontFamily: 'Nunito, sans-serif',
                fontWeight: 600,
                color:'#091e3e',
                //background: '#091e3e',
                '&:hover': {
                  backgroundColor: '#01796f', // Couleur au survol
                  color:'#FFF'
                },
              }}
            >
              Login
            </Button>
            <Button
              color="inherit"
              variant="text"
              component={Link}
              to="/register"
              sx={{
                fontFamily: 'Nunito, sans-serif',
                fontWeight: 600,
                outline:"none",
                color:'#091e3e',
                //background: '#091e3e',
                '&:hover': {
                  backgroundColor: '#01796f', // Couleur au survol
                  color:'#FFF'
                },
              }}
            >
              Register
            </Button>
           
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
