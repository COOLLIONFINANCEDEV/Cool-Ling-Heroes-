import React from 'react';
import { Box, Typography, IconButton, Container } from '@mui/material';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import logo from '../../assets/logo.svg';
import SocialFollow from '../../core/components/SocialFollow';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#9fb0bf',
        color: '#fff',
        padding: '2rem',
        gap: '20px',
      }}
    >
            <Typography variant="h6" gutterBottom
             sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '20px',
              }}>
        Suivez-nous sur les réseaux sociaux :
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',
        }}
      >
       
      <SocialFollow/>
      </Box>
      <Container sx={{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
      }}>
      <Box>
  
        <img src={logo} alt="Logo" style={{ width: '100px'}} />
        <Typography variant="body2" sx={{ marginTop: '0.1rem' }}>
            © {new Date().getFullYear()} CoolLingHeroes. Tous droits réservés.
        </Typography>
        </Box>

        <Box>
        <Typography variant="body2">
            Adresse : 123 Rue de l'Exemple, Ville, Pays
        </Typography>
        <Typography variant="body2">Email : team@coolingheroes.com</Typography>
        <Typography variant="body2">Téléphone : +123 456 789</Typography>
        </Box>
        <Box>
        <Typography variant="body2">
            Adresse : 123 Rue de l'Exemple, Ville, Pays
        </Typography>
        <Typography variant="body2">Email : team@coolingheroes.com</Typography>
        <Typography variant="body2">Téléphone : +123 456 789</Typography>
        </Box>
      </Container>

    </Box>
  );
}

export default Footer;
