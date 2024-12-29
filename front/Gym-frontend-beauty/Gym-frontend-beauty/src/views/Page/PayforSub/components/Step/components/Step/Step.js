import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import {MenuItem} from '@mui/material';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';


const step = ['Choose Your Payment Type', 'Your Payment'];

const steps = ({order, cards}) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [paymentType, setPaymentType] = React.useState(2);
  const [cardId, setCardId] = React.useState(0);
  const [cardAccount, setCardAccount] = React.useState(0);
  const cardAccountRef = React.useRef(cardAccount);
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

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmitPay = async (e) => {
    e.preventDefault();
    if (paymentType === 1) {
      if (cardId===0){
        setMsg(
          <Alert onClose={void handleClose} severity="error" sx={{ width: '100%' }}>
              You have to choose one card
          </Alert>
        );
        handleClick();
        return;
      }
      try {
        const res = await axios.post('/api/v1/subscription/add', {
          type: order,
          paymentType,
          cardId
        });
        if (res.data.code === 0) {
          handleNext();
          setTimeout(()=>{window.location.href='/';},1000);
          setMsg(
            <Alert onClose={void handleClose} severity="success" sx={{ width: '100%' }}>
                Pay successfully
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
    } else {
      try {
        const res = await axios.post('/api/v1/subscription/add', {
          type: order,
          paymentType
        });
        if (res.data.code === 0) {
          handleNext();
          setTimeout(()=>{window.location.href='/';},1000);
          setMsg(
            <Alert onClose={void handleClose} severity="success" sx={{ width: '100%' }}>
                Pay successfully
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
    }
  };

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
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
                  PaymentType
                </Typography>
                <TextField
                  select
                  fullWidth
                  id='PaymentType'
                  name='paymentType'
                  defaultValue={paymentType}
                  value={paymentType}
                  onChange={(e) => { setPaymentType(Number(e.target.value)); }}
                >
                  <MenuItem value={1}>Card</MenuItem>
                  <MenuItem value={2}>Wallet</MenuItem>
                </TextField>
              </Grid>
              {paymentType === 1 && (
                <Grid item xs={12}>
                  <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
                    Card
                  </Typography>
                  <TextField
                    required
                    select
                    fullWidth
                    id='card'
                    name='card'
                    defaultValue={cardId}
                    value={cardId}
                    onChange={(e) => { setCardId(Number(e.target.value)); }}
                  >
                    {cards.map((card) => (
                      <MenuItem value={card.id} key={card} onClick={() => { setCardAccount(card.cardAccount);cardAccountRef.current=card.cardAccount; }}>{card.cardAccount}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
              )}
            </Grid>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleSubmitPay}>
              Confirm
            </Button>
          </Box>
        </React.Fragment>
      )}
      {activeStep === 1 && (
        <React.Fragment>
          <Box height={300}>
            <Typography variant="h6" sx={{ color: 'green', fontWeight: 'bold' }} textAlign={'center'}>
                Subscribe successfully
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

steps.propTypes = {
  order: PropTypes.any.isRequired,
  cards: PropTypes.array.isRequired
};

export default steps;
