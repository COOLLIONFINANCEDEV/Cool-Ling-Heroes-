import { Box, Button, Stack, Typography } from '@mui/material';
import React from 'react';
import { width } from '../Theme/size';
import Redirect from '../Helpers/Redirect';
import routes from '../Router/routes';
import Simulator from './Simulator';
import About from './About';
import HowItWorks from './HowItWorks';

const Landing = () => {
  const LandingStyle = {
    width: width,
    margin: '0 auto',
    padding: '0',
    flexDirection: { xs: 'column', sm: 'row' },
  };
  return (
    <>
      <Stack
        sx={{
          width: '100%',
          minHeight: { xs: '80vh', sm: '84vh' },
          zIndex: '3',
          background:
            'linear-gradient(0deg, rgba(1, 121, 111, 1) 27%, rgba(1,159,146,0.7) 68%, rgba(238,248,246,1) 100%)',
        }}
        justifyContent={'center'}
        alignItems={'center'}>
        <Stack sx={LandingStyle}>
          <Stack
            sx={{
              width: { xs: '100%', sm: '45%' },
              justifyContent: { xs: 'center', sm: 'center' },
              alignItems: { xs: 'center', sm: 'flex-start' },
            }}
            spacing={2}>
            <Box>
              <Typography variant='h3' color={'secondary'}>
                We provide sustainable cooling solutions for the greater good.
              </Typography>
              {/* <Typography component={'span'} variant='h3' color={'secondary'}>
                <br></br>
              </Typography> */}
              <img src='Assets/Illustrations/underline.svg' alt='underline' />
              <Typography color={'secondary'} fontSize={14}>
                Reducing food waste, fighting nutrition insecurity and improving
                rural incomes in the Food & Nutrition sector
              </Typography>
            </Box>
            <Stack
              direction={'row'}
              justifyContent={'flex-start'}
              alignItems={'center'}
              spacing={2}
              width={'100%'}
              sx={{ zIndex: '1' }}>
              <Redirect link={routes.login} target>
                <Button color='secondary' variant='outlined' size='large'>
                  Donate
                </Button>
              </Redirect>
              <Redirect link={routes.login}>
                <Button color='secondary' variant='contained' size='large'>
                  Make a wish
                </Button>
              </Redirect>
            </Stack>
          </Stack>
          <Stack
            sx={{
              display: { xs: 'none', sm: 'flex' },
              width: '55%',
              backgroundRepeat: 'no-repeat',
              // backgroundImage: `url(Assets/Illustrations/Blob.svg)`,
              backgroundPosition: '100%',
              backgroundAttachment: 'inherit',
              zIndex: '1',
            }}>
            <img
              src='Assets/Imgs/food_courier.svg'
              alt='Food donation box'
              style={{ zIndex: '2', width: '100%', color: 'red' }}
            />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default Landing;
