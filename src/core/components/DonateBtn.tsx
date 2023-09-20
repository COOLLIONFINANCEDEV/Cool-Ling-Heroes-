import React from 'react';
import { Box, Button, Typography } from '@mui/material';

function Donate() {
  const handleDonateClick = () => {

    alert('Merci pour votre don !');
  };

  return (
    <Box
      sx={{
        backgroundColor: '#f5f5f5',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Faites un Don
      </Typography>
      <Typography variant="body1" gutterBottom>
        Votre soutien nous aide à poursuivre notre mission.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleDonateClick}
        sx={{ marginTop: '1rem',  
           fontWeight:200,
          fontFamily:"Nunito, sans-serif" }}
      >
        Faire un Don
      </Button>
    </Box>
  );
}

export default Donate;
