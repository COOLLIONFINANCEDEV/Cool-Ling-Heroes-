import { Container, Box, Typography, Button } from '@mui/material';
import Banner from '../components/home/Banner';
import About from '../components/home/About';
import CardList from '../components/home/CardList';
import Footer from '../layouts/components/Footer';
import Donate from '../core/components/DonateBtn';
import Newsletter from '../core/components/Newsletter';



function Home() {

  return (
    <Box component={"div"} sx={{ overflow: "hidden" }}>
   
        <Banner/>
        <About/>
       <CardList/>
        <Donate/>
        <Newsletter/>
       <Footer/>
    </Box>
  );
}

export default Home;
