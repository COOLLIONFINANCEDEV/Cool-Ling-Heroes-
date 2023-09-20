import {  Paper, Typography, Button, Box, Container } from '@mui/material';

function About() {

  return (
    <Paper elevation={0} sx={
        {
          
            color: '#fff',
            
            height: '150vh',
            display:"flex",

            
        }
    }>
    <Box
             sx={{

                padding:4
              }}>

  
        <Container>
        <Typography variant="h2"
        fontStyle={"normal"}
        fontFamily={"Nunito sans-serif"}
        fontWeight={500}
        lineHeight={"1.2"}
        color={"#091e3e"}
        fontSize={"1.25rem"}
        sx={{
            paddingBottom:4
            
          }}
     >
Cooling Heroes is a US-headquartered international not-for-profit organization that specializes in the design and implementation of clean energy-powered cooling solutions that bring strong environmental, social and economic benefits to the communities that need them the most.        </Typography>
        </Container>
          
          <Container
           sx={{
            paddingBottom:4
           }}>
          <Typography 
         fontStyle={"normal"}
         color={"#143fff"}
         fontSize={"1.8rem"}
         sx={{
          
           }}>
     Cooling matters in several sectors such as:
        </Typography>
         
        <Typography 
         fontStyle={"normal"}
         fontFamily={"Nunito sans-serif"}
         fontWeight={500}
         lineHeight={"1.2"}
         color={"#091e3e"}
         fontSize={"1.1rem"}
         sx={{
            paddingBottom:4
           }}>
Reducing food waste, fighting nutrition insecurity and improving rural incomes in the Food & Nutrition sector
Securing the transport and storage of vaccines and medical products, providing cooling for safe medical clinics in the Healthcare sector
Boosting safety and health in extreme weather conditions and ensuring human thermal comfort
        </Typography>
     
        <Typography 
         fontStyle={"normal"}
         fontFamily={"Nunito sans-serif"}
         fontWeight={500}
         lineHeight={"1.2"}
         color={"#091e3e"}
         fontSize={"1.1rem"}
         sx={{
          
           }}>
On average, a smallholder farmer in Africa has three times lesser access to cold storage capacity compared to his peers in developed countries. Food loss is often as high as 50%. The time is now to act.        </Typography>
          </Container>

          <Container>
          <Typography 
         fontStyle={"normal"}
         color={"#143fff"}
         fontSize={"1.8rem"}
         sx={{
          
           }}>
       WHAT WE DO
        </Typography>
         
        <Typography 
           fontFamily={"Nunito sans-serif"}
           fontWeight={500}
           lineHeight={"1.2"}
           color={"#091e3e"}
         fontSize={"1.1rem"}
         sx={{
            paddingBottom:4
           }}>
          We deploy comprehensive sustainable cooling projects from A to Z. Our process encompasses all the main stages: screening, feasibility, development, execution, project delivery, and project operation.
        </Typography>
     
        <Typography 
          fontFamily={"Nunito sans-serif"}
          fontWeight={500}
          lineHeight={"1.2"}
          color={"#091e3e"}
         fontSize={"1.1rem"}
         sx={{
          
           }}>
We work hand in hand with local communities and stakeholders to provide a range of active technology solutions or nature-based and passive technology solutions: natural ventilation ecological warehousing, clean-energy powered refrigerated containers, portable solar cooling units, solar powered refrigerated trucks and tricycles to name a few        </Typography>

           <Typography
               fontFamily={"Nunito sans-serif"}
               fontWeight={500}
               lineHeight={"1.2"}
               color={"#091e3e"}
              fontSize={"1.1rem"}
              sx={{
               
                }}>
           Our first projects are tentatively located in Ivory Coast, Togo, Rwanda, Vietnam and the United States.
           </Typography>
          </Container>
    </Box>
   
  
  </Paper>
  );
}

export default About;
