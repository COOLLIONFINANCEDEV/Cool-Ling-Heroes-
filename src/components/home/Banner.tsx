import {  Paper, Typography, Button, Box, Container } from '@mui/material';
import bannerBackGround from '../../assets/images/bannerBackGround.jpg';

function Banner() {

  return (
    <Paper elevation={0} sx={
        {
            backgroundImage: `url(${bannerBackGround})`, 
            backgroundSize: 'cover', 
            color: '#fff',
            
            height: '100vh',
            display:"flex",
            justifyContent:"start",
            alignItems: 'flex-end', 
            
        }
    }>
    <Box
             sx={{
                width: 300,
                height: 300,
                backgroundColor: ' rgba(255, 255, 255, 0.8)',
                position:'relative',
                left:"30px",
                top:"-10px",
                padding:'10px'
              }}>

  
    <Typography variant="h2"
        fontStyle={"normal"}
        color={"#000"}
        fontSize={"30px"}
        sx={{
           
          }}
     >
        Colleter
        </Typography>
        <Typography variant="h2"
        fontStyle={"normal"}
        color={"#000"}
        fontSize={"30px"}
        sx={{
           
          }}
     >
        Distribuer
        </Typography>
        <Typography variant="h2"
        fontStyle={"normal"}
        color={"#000"}
        fontSize={"30px"}
        sx={{
            paddingBottom:"10px"
        }}
     >
        Accompagner
        </Typography>
          
        <Typography 
         fontStyle={"normal"}
         fontWeight={"200"}
         color={"#000"}
         
         sx={{
           }}>
       Nous somme un reseau efficace et unifié qui apporte des dons alimmentaire au personne les plus demunie
       dans le monde
        </Typography>
           <Box
               sx={{
                width: "100%",
                position:'absolute',
                bottom:'10px',
                display:'flex',
                justifyContent:'center',
                alignItems:'center'
              }}  
           >
            <Button variant="contained" 
                disableElevation
               sx={{

                 width: "50%",
                height: 30,
                color:"#FFF",
                background:"orange"
              }}>
                En savoir plus
            </Button>
           </Box>
     
    </Box>
   
  
  </Paper>
  );
}

export default Banner;
