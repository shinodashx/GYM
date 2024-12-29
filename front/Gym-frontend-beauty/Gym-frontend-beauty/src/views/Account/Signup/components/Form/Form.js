/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useFormik} from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import {MenuItem} from '@mui/material';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';


const validationSchema = yup.object({
  username: yup
    .string('Enter your first name')
    .trim()
    .min(2, 'Please enter a valid name')
    .max(50, 'Please enter a valid name')
    .required('Please specify your name'),
  password: yup
    .string()
    .required('Please specify your password')
    .min(8, 'The password should have at minimum length of 8'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
  email: yup
    .string('Enter your email')
    .trim()
    .email('Please enter a valid email address')
    .required('Email is required.'),
  gender: yup
    .string('choose your gender')
    .required('Gender is required'),
  phone: yup
    .string('Enter your Phone')
    .matches(/^1[3-9]\d{9}$/, 'Please enter a valid phone number')
    .required('Phone is required')
});

const Form = () => {
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState(<></>);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const initialValues = {
    username: '',
    gender: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  };

  const onSubmit = async (values) => {
    try {
      const res = await axios.post('/api/v1/user/register', {
        Username: values.username,
        Password: values.password,
        Confirmpassword: values.confirmPassword,
        Email: values.email,
        Gender: values.gender,
        Phone: values.phone
      });
      if (res.data.code === 0) {
        window.location.href = '/page-login';
      }
      else {
        setMsg(
          <Alert onClose={void handleClose} severity="error" sx={{ width: '100%' }}>
            {res.data.message}
          </Alert>
        );
        handleClick();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });

  return (
    <Box>
      <Box marginBottom={4}>
        <Typography
          sx={{
            textTransform: 'uppercase',
            fontWeight: 'medium',
          }}
          gutterBottom
          color={'textSecondary'}
        >
          Signup
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
          }}
        >
          Create an account
        </Typography>
        <Typography color="text.secondary">
          Fill out the form to get started.
        </Typography>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
              Enter your Username
            </Typography>
            <TextField
              label="username *"
              variant="outlined"
              name={'username'}
              fullWidth
              value={formik.values.username}
              onChange={formik.handleChange}
              error={
                formik.touched.username && Boolean(formik.errors.username)
              }
              helperText={formik.touched.username && formik.errors.username}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
              Choose your gender
            </Typography>
            <TextField
              select
              fullWidth
              id='Gender'
              name='gender'
              label='Gender *'
              value={formik.values.gender}
              onChange={formik.handleChange}
              error={formik.touched.gender && Boolean(formik.errors.gender)}
              helperText={formik.touched.gender && formik.errors.gender}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="secret">Secret</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
              Enter your password
            </Typography>
            <TextField
              label="Password *"
              variant="outlined"
              name={'password'}
              type={'password'}
              fullWidth
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
              Confirm your password
            </Typography>
            <TextField
              label="Confirm Password *"
              variant="outlined"
              name={'confirmPassword'}
              type={'password'}
              fullWidth
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
              Enter your email
            </Typography>
            <TextField
              label="Email *"
              variant="outlined"
              name={'email'}
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
              Enter your phone
            </Typography>
            <TextField
              label="Phone *"
              variant="outlined"
              name={'phone'}
              fullWidth
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
          </Grid>
          <Grid item container xs={12}>
            <Box
              display="flex"
              flexDirection={{ xs: 'column', sm: 'row' }}
              alignItems={{ xs: 'stretched', sm: 'center' }}
              justifyContent={'space-between'}
              width={'100%'}
              maxWidth={600}
              margin={'0 auto'}
            >
              <Box marginBottom={{ xs: 1, sm: 0 }}>
                <Typography variant={'subtitle2'}>
                  Already have an account?{' '}
                  <Link
                    component={'a'}
                    color={'primary'}
                    href={'/page-login'}
                    underline={'none'}
                  >
                    Login.
                  </Link>
                </Typography>
              </Box>
              <Button size={'large'} variant={'contained'} type={'submit'}>
                Sign up
              </Button>
            </Box>
          </Grid>
          <Grid
            item
            container
            xs={12}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Typography
              variant={'subtitle2'}
              color={'textSecondary'}
              align={'center'}
            >
              By clicking "Sign up" button you agree with our{' '}
              <Link
                component={'a'}
                color={'primary'}
                href={'/page-privacy'}
                underline={'none'}
              >
                Privacy policy.
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </form>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        {msg}
      </Snackbar>
    </Box>
  );
};

export default Form;
