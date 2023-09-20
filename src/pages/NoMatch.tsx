import React from 'react';
import Typography from '@mui/material/Typography';

function NotMatch() {
  return (
    <div style={{ textAlign: 'center', paddingTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Page non trouvée
      </Typography>
      <Typography variant="body1">
        La page que vous recherchez n'a pas été trouvée.
      </Typography>
    </div>
  );
}

export default NotMatch;
