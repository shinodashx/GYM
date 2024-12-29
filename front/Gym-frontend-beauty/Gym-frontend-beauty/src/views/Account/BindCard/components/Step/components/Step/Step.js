import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {MenuItem} from '@mui/material';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


const step = ['Enter Card Account', 'Finish'];

const steps = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [bankId, setBankId] = React.useState(0);
  const [cardAccount, setCardAccount] = React.useState(0);
  const [phone, setPhone] = React.useState('');
  const [bank, setBank] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState(<></>);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
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

  function SearchBankNameByID (id) {
    for (let i = 0; i < bank.length; i++) {
      if (id === bank[i].id) {
        return bank[i].name;
      }
    }
  }

  function GetBanks () {
    axios.get('/api/v1/bank/banks', {}
    ).then((response) => {
      if (response.data.code === 0) {
        setBank(response.data.data.data);
      } else {
        if (response.data.message === 'Unauthorized') {
          window.location.href = '/';
        }
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  const handleSubmitBind = async (e) => {
    e.preventDefault();
    if (cardAccount.length === 0) {
      setMsg(
        <Alert onClose={void handleClose} severity="error" sx={{ width: '100%' }}>
          You need to type account!
        </Alert>
      );
      handleClick();
      return;
    } else if (phone.length === 0) {
      setMsg(
        <Alert onClose={void handleClose} severity="error" sx={{ width: '100%' }}>
          You need to type phone
        </Alert>
      );
      handleClick();
      return;
    }
    try {
      const res = await axios.post('/api/v1/card/bind', {
        bank_id: bankId,
        card_account: cardAccount,
        phone
      });
      if (res.data.code === 0) {
        setMsg(
          <Alert onClose={void handleClose} severity="success" sx={{ width: '100%' }}>
            {res.data.message}
          </Alert>
        );
        handleClick();
        handleNext();
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

  React.useEffect(()=>{
    GetBanks();
  },[]);


  return (
    <Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        {msg}
      </Snackbar>
      <Stepper activeStep={activeStep}>
        {step.map((label) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === 0 && (
        <React.Fragment>
          <Box>
            <form>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
                    Bank
                  </Typography>
                  <TextField
                    required
                    select
                    fullWidth
                    id='card'
                    name='card'
                    defaultValue={bankId}
                    value={bankId}
                    onChange={(e) => { setBankId(Number(e.target.value)); }}
                  >
                    {bank.map((b) => (
                      <MenuItem value={b.id} key={b} onClick={() => { setBankId(b.id); }}>{SearchBankNameByID(b.id)}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    display="flex"
                    flexDirection={{ xs: 'column', sm: 'row' }}
                    alignItems={{ xs: 'stretched', sm: 'center' }}
                    justifyContent={'space-between'}
                    width={'100%'}
                    marginBottom={2}
                  >
                    <Box marginBottom={{ xs: 1, sm: 0 }}>
                      <Typography variant={'subtitle2'}>
                                                Account
                      </Typography>
                    </Box>
                  </Box>
                  <TextField
                    label={'Account *'}
                    variant="outlined"
                    name={'account'}
                    onChange={(e) => { setCardAccount(Number(e.target.value)); }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box
                    display="flex"
                    flexDirection={{ xs: 'column', sm: 'row' }}
                    alignItems={{ xs: 'stretched', sm: 'center' }}
                    justifyContent={'space-between'}
                    width={'100%'}
                    marginBottom={2}
                  >
                    <Box marginBottom={{ xs: 1, sm: 0 }}>
                      <Typography variant={'subtitle2'}>
                                                Phone
                      </Typography>
                    </Box>
                  </Box>
                  <TextField
                    label={'Phone *'}
                    variant="outlined"
                    name={'phone'}
                    onChange={(e) => { setPhone(Number(e.target.value)); }}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </form>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleSubmitBind}>
              Next
            </Button>
          </Box>
        </React.Fragment>
      )}
      {activeStep === 1 && (
        <React.Fragment>
          <Box height={300}>
            <Typography variant="h6" sx={{ color: 'green', fontWeight: 'bold' }} textAlign={'center'}>
              Bind successfully
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={()=>{window.location.href='/page-profile/wallet';}}>
              Back
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
};

export default steps;
