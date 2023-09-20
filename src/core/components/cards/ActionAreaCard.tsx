import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, Button, Box } from '@mui/material';

interface ActionAreaCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

const ActionAreaCard: React.FC<ActionAreaCardProps> = ({ title, description, imageUrl }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <Card
      sx={{
        width: 300,
        maxWidth: 345,
        height:300,
        backgroundColor:"#1588ed",
        borderRadius: 0,
        border: 'none',
        transition: 'transform 0.4s',
        '&:hover': {
          transform: 'scale(1.10)',
          //backgroundColor: 'lightgray',
          zIndex: 2000,
        },
      }}
    >
      <CardActionArea
        sx={{
          position: 'relative',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
       
        <CardContent
         sx={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          height: '100px',
          width:"100%",
        
        }}
       > 
         <Box
         sx={{
          position:"absolute",
          top:200,
          
         }}>
         <Typography gutterBottom variant="h5" component="div"
            sx={{
              transition: 'font-size 0.4s',
              color:"#FFF",
              fontWeight:200,
              fontFamily:"Nunito, sans-serif"
            }}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary"
            sx={{
             
              transition: 'font-size 0.4s',
              color:"#FFF",
              fontWeight:200,
              fontFamily:"Nunito, sans-serif"
            }}>
            {description}
          </Typography>
         </Box>
        </CardContent>
        <Button
          variant="contained"
          color="primary"
          sx={{
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s',
          }}
        >
          Voir plus
        </Button>
      </CardActionArea>
    </Card>
  );
}

export default ActionAreaCard;
