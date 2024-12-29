/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useFormik} from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import {CircularProgress} from '@mui/material';


const validationSchema = yup.object({
  oldPassword: yup
    .string()
    .required('Please Enter your old password'),
  password: yup
    .string()
    .required('Please specify your password')
    .min(8, 'The password should have at minimum length of 8'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password'), null], 'Passwords must match')
});

const passwordForm = () => {
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState(<></>);
  const [show, setShow] = React.useState(false);
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
    oldPassword: '',
    password: '',
    confirmPassword: '',
  };

  const onSubmit = async (values) => {
    try {
      const res = await axios.post('/api/v1/change-passwd', {
        old_password: values.oldPassword,
        new_password: values.password,
        confirm_password: values.confirmPassword,
      });
      if (res.data.code === 0) {
        setMsg(
          <Alert onClose={void handleClose} severity="success" sx={{ width: '100%' }}>
            {res.data.message}
          </Alert>
        );
        handleClick();
      } else {
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

  React.useEffect(()=>{
    setTimeout(()=>{setShow(true);},1000);
  },[]);

  return (
    <Box>
      {show ? (
        <>
          <Box mt={2}>
            <Typography
              sx={{
                textTransform: 'uppercase',
                fontWeight: 'medium',
              }}
              gutterBottom
              color={'textSecondary'}
            >
                  Edit Password
            </Typography>
          </Box>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={4}>
              <Grid item xs={12} mt={2}>
                <TextField
                  label="Old Password *"
                  variant="outlined"
                  name={'oldPassword'}
                  type={'password'}
                  fullWidth
                  value={formik.values.oldPassword}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.oldPassword && Boolean(formik.errors.oldPassword)
                  }
                  helperText={formik.touched.oldPassword && formik.errors.oldPassword}
                />
              </Grid>
              <Grid item xs={12} mt={2}>
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
              <Grid item xs={12} mt={2}>
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
              <Grid item container xs={12}>
                <Box
                  display="flex"
                  flexDirection={{ xs: 'column', sm: 'row' }}
                  alignItems={{ xs: 'stretched', sm: 'center' }}
                  justifyContent={'space-between'}
                  width={'100%'}
                  maxWidth={600}
                  mb={2}
                >
                  <Button size={'large'} variant={'contained'} type={'submit'}>
                    Edit Password
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </>
      ):(
        <Box
          sx={{
            width: '100%',
            height: 415,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <CircularProgress />
        </Box>
      )}

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        {msg}
      </Snackbar>
    </Box>
  );
};

export default passwordForm;
