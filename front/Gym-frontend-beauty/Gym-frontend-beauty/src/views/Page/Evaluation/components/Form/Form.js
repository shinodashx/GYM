/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Rating, Switch} from '@mui/material';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import PropTypes from 'prop-types';
import Uppy from '@uppy/core';
import {Dashboard} from '@uppy/react';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import DialogContent from '@mui/material/DialogContent';
import {CssVarsProvider} from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import FormControl from '@mui/joy/FormControl';
import Dialog from '@mui/material/Dialog';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Webcam from '@uppy/webcam';
import XHRUpload from '@uppy/xhr-upload';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';

const validationSchema = yup.object({
  description: yup
    .string()
    .min(10, 'Description too short')
    .max(300, 'Description too long')
    .required('Please enter description')
});

const Form = ({id}) => {
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState(<></>);
  const [openImage, setOpenImage] = React.useState(false);
  const [openVideo, setOpenVideo] = React.useState(false);
  const [images, setImages] = React.useState([]);
  const imagesRef = React.useRef(images);
  const [videos, setVideos] = React.useState([]);
  const videosRef = React.useRef(videos);

  const handleClickOpenImage = () => {
    setOpenImage(true);
  };
  const handleCloseImage = () => {
    setOpenImage(false);
  };

  const handleClickOpenVideo = () => {
    setOpenVideo(true);
  };
  const handleCloseVideo = () => {
    setOpenVideo(false);
  };
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
    score: 5,
    anonymous: false,
    description: '',
    images: [],
    videos: [],
  };

  const onSubmit = async (values) => {
    try {
      let anon = 0;
      if (values.anonymous){
        anon = 1;
      }
      const res = await axios.post('/api/v1/evaluation/add', {
        facility_id: id,
        score: values.score,
        is_anonymous: anon,
        description: values.description,
        images: imagesRef.current,
        videos: videosRef.current,
      });
      if (res.data.code === 0) {
        setMsg(
          <Alert onClose={void handleClose} severity="success" sx={{ width: '100%' }}>
            {res.data.message}
          </Alert>
        );
        handleClick();
        setTimeout(()=>{window.location.href = '/page-profile/evaluation';}, 800);
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
  const uppyImage = new Uppy({
    autoProceed: false,
    restrictions: {
      allowedFileTypes: ['image/*']
    }
  }).use(Webcam).use(XHRUpload, {
    endpoint: '/api/v1/upload',
    formData: true,
    fieldName: 'file'
  });

  const uppyVideo = new Uppy({
    autoProceed: false,
    restrictions: {
      allowedFileTypes: ['video/*']
    }
  }).use(Webcam).use(XHRUpload, {
    endpoint: '/api/v1/upload',
    formData: true,
    fieldName: 'file'
  });


  uppyImage.on('upload-success', async (file, response) => {
    if (response.status === 200 && response.body.code === 0) {
      const url = response.body.data.url;
      console.log(url);
      const image = (imagesRef.current).concat(url);
      setImages(image);
      imagesRef.current = image;
      setTimeout(() => { setOpenImage(false); }, 500);
    }
  });

  uppyVideo.on('upload-success', async (file, response) => {
    if (response.status === 200 && response.body.code === 0) {
      const url = response.body.data.url;
      const video = (videosRef.current).concat(url);
      setVideos(video);
      videosRef.current = video;
      setTimeout(() => { setOpenVideo(false); }, 500);
    }
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
          Evaluation
        </Typography>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
              Score
            </Typography>
            <Rating
              name="rating"
              value={formik.values.score}
              onChange={(event, newValue) => {
                formik.setFieldValue('score', newValue);
              }}
              precision={1}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
              Anonymous
            </Typography>
            <Switch
              checked={formik.values.anonymous}
              onChange={(event) => {
                formik.setFieldValue('anonymous', event.target.checked);
              }}
              name="switch"
              color="primary"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
              Enter your Description
            </Typography>
            <TextField
              label="Description *"
              variant="outlined"
              name={'description'}
              type={'text'}
              fullWidth
              multiline
              rows={5}
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
              Upload Images
            </Typography>
            <Button fullWidth variant="outlined" color="primary" component="span" startIcon={<UploadFileIcon />} onClick={handleClickOpenImage}>
              Upload Images
            </Button>
            {imagesRef.current !== [] && (
              <Grid spacing={3} container>
                {(imagesRef.current).map((img, i)=>(
                  <Grid item xs={12} sm={6} md={4} key={i}>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardMedia
                        sx={{ height: 140, mt: 1 }}
                        image={'/'.concat(img)}
                      />
                      <CardActions sx={{ display:'flex', justifyContent:'center' }}>
                        <Button size="small" onClick={()=>{
                          const newImages = imagesRef.current.filter((_, index) => index !== i);
                          setImages(newImages);
                          imagesRef.current = newImages;
                        }}>Delete</Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
          <Grid item xs={12}>
            <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
              Upload Videos
            </Typography>
            <Button fullWidth variant="outlined" color="primary" component="span" startIcon={<UploadFileIcon />} onClick={handleClickOpenVideo}>
              Upload Videos
            </Button>
            {videosRef.current !== [] && (
              <Grid spacing={3} container>
                {(videosRef.current).map((vid, i)=>(
                  <Grid item xs={12} sm={6} md={4} key={i}>
                    <Card sx={{ maxWidth: 345, height: 140, mt: 1 }}>
                      <video width="100%" height="auto" controls>
                        <source src={'/'.concat(vid)} type="video" />
                      </video>
                      <CardActions sx={{ display:'flex', justifyContent:'center' }}>
                        <Button size="small" onClick={()=>{
                          const newVideos = videosRef.current.filter((_, index) => index !== i);
                          setVideos(newVideos);
                          videosRef.current = newVideos;
                        }}>Delete</Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
          <Grid item container xs={12}>
            <Box
              display="flex"
              flexDirection={{ xs: 'column', sm: 'row' }}
              alignItems={{ xs: 'stretched', sm: 'center' }}
              justifyContent={'center'}
              width={'100%'}
              maxWidth={600}
              margin={'0 auto'}
            >
              <Button size={'large'} sx={{ width:'50%' }} variant={'contained'} type={'submit'}>
                Evaluate
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
      <Dialog open={openVideo} onClose={handleCloseVideo}>
        <DialogContent>
          <CssVarsProvider>
            <main>
              <Sheet
                sx={{
                  width: '200',
                  mx: 'auto',
                  py: 3,
                  px: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 'sm',
                  boxShadow: 'sm'
                }}
              >
                <FormControl>
                  <Dashboard
                    uppy={uppyVideo}
                    plugins={['Webcam']}
                    closeModalOnClickOutside
                    openModalOnClick
                  />
                </FormControl>
              </Sheet>
            </main>
          </CssVarsProvider>
        </DialogContent>
      </Dialog>
      <Dialog open={openImage} onClose={handleCloseImage}>
        <DialogContent>
          <CssVarsProvider>
            <main>
              <Sheet
                sx={{
                  width: '200',
                  mx: 'auto',
                  py: 3,
                  px: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 'sm',
                  boxShadow: 'sm'
                }}
              >
                <FormControl>
                  <Dashboard
                    uppy={uppyImage}
                    plugins={['Webcam']}
                    closeModalOnClickOutside
                    openModalOnClick
                  />
                </FormControl>
              </Sheet>
            </main>
          </CssVarsProvider>
        </DialogContent>
      </Dialog>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        {msg}
      </Snackbar>
    </Box>
  );
};

Form.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Form;
