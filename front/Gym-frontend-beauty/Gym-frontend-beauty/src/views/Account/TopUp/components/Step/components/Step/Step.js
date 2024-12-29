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


const step = ['Choose Card', 'Finish'];

const steps = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [Money, setMoney] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [card, setCard] = React.useState(0);
  const [msg, setMsg] = React.useState(<></>);
  const [cards, setCards] = React.useState([]);
  const cardsRef = React.useRef(cards);

  function GetWallet () {
    axios.post('/api/v1/wallet/wallet', {}).then((response) => {
      if (response.data.code === 0) {
        setCards(response.data.data.info.cards);
        cardsRef.current = response.data.data.info.cards;
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  React.useEffect(() => {
    GetWallet();
  },[]);

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

  const handleSubmitTop = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/v1/wallet/top-up', {
        cardId: card,
        amount: Money
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
                    Card
                  </Typography>
                  <TextField
                    required
                    select
                    fullWidth
                    id='card'
                    name='card'
                    defaultValue={card}
                    value={card}
                    onChange={(e) => { setCard(Number(e.target.value)); }}
                  >
                    {cards.map((b) => (
                      <MenuItem value={b.id} key={b} onClick={() => { setCard(b.id); }}>{b.id}</MenuItem>
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
                        Money
                      </Typography>
                    </Box>
                  </Box>
                  <TextField
                    label={'Account *'}
                    variant="outlined"
                    name={'account'}
                    onChange={(e) => { setMoney(Number(e.target.value)); }}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </form>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleSubmitTop}>
              Next
            </Button>
          </Box>
        </React.Fragment>
      )}
      {activeStep === 1 && (
        <React.Fragment>
          <Box height={300}>
            <Typography variant="h6" sx={{ color: 'green', fontWeight: 'bold' }} textAlign={'center'}>
              Top Up successfully
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
