import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import EmailIcon from '@mui/icons-material/Email';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import React from 'react';
import Uppy from '@uppy/core';
import Webcam from '@uppy/webcam';
import XHRUpload from '@uppy/xhr-upload';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import Sheet from '@mui/joy/Sheet';
import { Dashboard } from '@uppy/react';
import FormControl from '@mui/joy/FormControl';
import { CssVarsProvider } from '@mui/joy/styles';
import axios from 'axios';
import {
  getAvatar,
  getEmail,
  getPhone,
  getSub,
  getUsername, setDiscount,
  setSub
} from '../../../../../layouts/Main/components/User/User';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { TabComponent } from './components';
import DiamondIcon from '@mui/icons-material/Diamond';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

const Portrait = () => {
  const [openPortrait, setOpenPortrait] = React.useState(false);
  const [openCancel, setOpenCancel] = React.useState(false);
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

  const handleClickOpenPortrait = () => {
    setOpenPortrait(true);
  };
  const handleClosePortrait = () => {
    setOpenPortrait(false);
  };
  const handleClickOpenCancel = () => {
    setOpenCancel(true);
  };
  const handleCloseCancel = () => {
    setOpenCancel(false);
  };
  function Uploader () {
    return <Dashboard uppy={uppy} plugins={['Webcam']}/>;
  }
  function setAvatar (avatar) {
    localStorage.setItem('avatar', avatar);
  }

  const uppy = new Uppy().use(Webcam).use(XHRUpload, {
    endpoint: '/api/v1/upload/avatar',
    formData: true,
    fieldName: 'file'
  });

  async function updateAvatar (url) {
    try {
      const res = await axios.post('/api/v1/user/avatar/update', {
        Avatar: url
      });
      if (res.data.code === 0) {
        setAvatar('/'.concat(url));
        setMsg(
          <Alert onClose={void handleClose} severity="success" sx={{ width: '100%' }}>
            {res.data.message}
          </Alert>
        );
        handleClick();
        handleClosePortrait();
      }else{
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
  }

  uppy.on('upload-success', async (file, response) => {
    if (response.status === 200 && response.body.code === 0) {
      const url = response.body.data.url;
      await updateAvatar(url).then(r => {
        console.log(r);
      });
    }
  });

  async function cancelSub () {
    try {
      const res = await axios.post('/api/v1/subscription/cancel');
      if (res.data.code === 0) {
        setMsg(
          <Alert onClose={void handleClose} severity="success" sx={{ width: '100%' }}>
            {res.data.message}
          </Alert>
        );
        handleClick();
        setTimeout(handleCloseCancel, 500);
        setSub('');
        setDiscount('');
      } else {
        setMsg(
          <Alert onClose={void handleClose} severity="error" sx={{ width: '100%' }}>
            {res.data.message}
          </Alert>
        );
        handleClick();
        setTimeout(handleCloseCancel, 500);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const VIP = () => {
    if (getSub() !== ''){
      return (
        <Box>
          <Box display={'flex'} alignItems={'center'}>
            <DiamondIcon />
            <Typography variant="subtitle1" color="text.secondary" component="div" gutterBottom>
              {getSub()}
            </Typography>
            <Button onClick={handleClickOpenCancel}>cancel</Button>
          </Box>
        </Box>
      );
    }
  };

  return (
    <Box alignItems={'center'} mt={1}>
      <Box justifyContent={'center'} display={'flex'} onClick={handleClickOpenPortrait}>
        <Avatar
          alt={getUsername()}
          src={getAvatar()}
          sx={{ width: 260, height: 260 }}
        />
      </Box>
      <Box display={'flex'} alignItems={'center'} flexDirection={'column'}>
        <Typography component="div" variant="h5" gutterBottom>
          {getUsername()}
        </Typography>
      </Box>
      <Box display={'flex'} alignItems={'flex-start'} flexDirection={'column'}>
        <VIP />
        <Box display={'flex'} alignItems={'center'}>
          <EmailIcon />
          <Typography variant="subtitle1" color="text.secondary" component="div" gutterBottom>
            {getEmail()}
          </Typography>
        </Box>
        <Box display={'flex'} alignItems={'center'}>
          <SmartphoneIcon />
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {getPhone()}
          </Typography>
        </Box>
      </Box>
      <Box display={'flex'} alignItems={'center'} flexDirection={'column'}>
        <TabComponent />
      </Box>
      <Dialog open={openPortrait} onClose={handleClosePortrait}>
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
                  <Uploader/>
                </FormControl>
              </Sheet>
            </main>
          </CssVarsProvider>
        </DialogContent>
      </Dialog>
      <Dialog open={openCancel} onClose={handleCloseCancel}>
        <DialogTitle id="title">
          <Alert severity="error" sx={{ width: '100%' }}>
              If you cancel the membership, you will not get refund.
          </Alert>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
              Do you confirm to cancel it?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCancel}>No</Button>
          <Button onClick={cancelSub} autoFocus>
              Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        {msg}
      </Snackbar>
    </Box>
  );
};

export default Portrait;
