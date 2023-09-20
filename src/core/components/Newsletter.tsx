import React from 'react';
import { Box, Button, Typography, TextField, Grid } from '@mui/material';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import * as Yup from 'yup';

interface NewsletterFormValues {
    email: string;
    username: string;
  }

function Newsletter() {
  const initialValues = {
    email: '',
    username: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email invalide').required('Champ requis'),
    username: Yup.string().required('Champ requis'),
  });

  const handleSubmit = (values:NewsletterFormValues, actions: FormikHelpers<NewsletterFormValues>) => {

    alert(`Merci, ${values.username} ! Vous êtes inscrit à notre newsletter avec l'adresse email : ${values.email}`);
    actions.resetForm(); 
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
        Inscrivez-vous à notre Newsletter
      </Typography>
      <Typography variant="body1" gutterBottom>
        Restez informé des dernières actualités et mises à jour.
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
         {({ errors, touched }) => (
        <Form>
          <Grid container direction="row" spacing={2} sx={
            {
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                
                
            }
          }>
            
              <Field
                name="email"
                type="email"
                as={TextField}
                placeholder="Email"
                variant="outlined"
                fullWidth
                error={errors.email && touched.email}
                helperText={errors.email && touched.email ? errors.email : ''}
                sx={{ 
                marginTop: '1rem',
                '& .MuiOutlinedInput-root': {
                    backgroundColor: '#FFF', 
                  },
                  '& .MuiInputBase-input': {
                    height: '40px', 
                },
                '& .MuiOutlinedInput-input::placeholder': {
                    color: 'gray', 
                  },
                width:400,
                paddingRight:2,
                
                }}
              />
          
            
              <Field
                name="username"
                as={TextField}
    
                placeholder="Prénom"
                variant="outlined"
                fullWidth
                error={errors.username && touched.username}
                helperText={errors.username && touched.username ? errors.username : ''}
                sx={{
                marginTop: '1rem',
                '& .MuiOutlinedInput-root': {
                    backgroundColor: '#FFF', 
                  },
                  '& .MuiInputBase-input': {
                    height: '40px', 
                },
                '& .MuiOutlinedInput-input::placeholder': {
                    color: 'gray', 
                  },
                width:400,
                fontWeight:200,
                fontFamily:"Nunito, sans-serif"
                 }}
              />
           
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            
            sx={{ 
                marginTop: '1rem', 
                fontSize:22,
                width:400,
                height:70,     
                fontWeight:200,
                fontFamily:"Nunito, sans-serif"}}
          >
            Je m'inscrit à la newsletter
          </Button>
        </Form>
         )}
      </Formik>
    </Box>
  );
}

export default Newsletter;
