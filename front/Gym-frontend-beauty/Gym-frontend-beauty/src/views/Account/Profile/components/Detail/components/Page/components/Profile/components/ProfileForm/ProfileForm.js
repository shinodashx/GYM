/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useFormik} from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {CircularProgress, MenuItem} from '@mui/material';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';


const validationSchema = yup.object({
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

const ProfileForm = () => {
  const [profile, setProfile] = React.useState({});
  const [show, setShow] = React.useState(false);


  function GetProfile() {
    axios.post('/api/v1/user/profile',{}
    ).then((res) => {
      setProfile(res.data.data.data);
    });
    setTimeout(()=>{setShow(true);},1000);
  }

  React.useEffect(() => {
    GetProfile();
  },[]);

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
    let gender;
    if(profile.gender === 1){
      gender = 'male';
    }else if (profile.gender === 2){
      gender = 'female';
    }else{
      gender = 'secret';
    }
    const initialValues = {
      gender: gender,
      email: profile.email,
      phone: profile.phone,
    };
    const onSubmit = async (values) => {
      let gender;
      if (values.gender === 'male'){
        gender = 1;
      }else if (values.gender === 'female'){
        gender = 2;
      }else {
        gender = 3;
      }
      try {
        const res = await axios.post('/api/v1/user/profile/update', {
          Email: values.email,
          Gender: gender,
          Phone: values.phone
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

    return (
      <Box>
        <Box mt={2}>
          <Typography
            sx={{
              textTransform: 'uppercase',
              fontWeight: 'medium',
            }}
            gutterBottom
            color={'textSecondary'}
          >
            Edit Profile
          </Typography>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} mt={2}>
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
            <Grid item xs={12} mt={2}>
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
            <Grid item xs={12} mt={2}>
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
              >
                <Button size={'large'} variant={'contained'} type={'submit'}>
                    Edit Profile
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          {msg}
        </Snackbar>
      </Box>
    );
  };

  return (
    <>
      {show ? (
        <Form />
      ):(
        <Box
          sx={{
            width: '100%',
            height: 328,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default ProfileForm;
