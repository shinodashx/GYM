import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import ClearIcon from '@mui/icons-material/Clear';
import {CircularProgress} from '@mui/material';

const Wallet = () => {
  const [wallet, setWallet] = React.useState({});
  const [card, setCard] = React.useState([]);
  const [bank, setBank] = React.useState([]);
  const [width, setWidth] = React.useState(window.innerWidth);
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState(<></>);
  const [credit, setCredit] = React.useState({});
  const [cardLength, setCardLength] = React.useState(0);
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

  React.useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
  function GetWallet () {
    axios.post('/api/v1/wallet/wallet', {}).then((response) => {
      if (response.data.code === 0) {
        setWallet(response.data.data.info.wallet);
        setCard(response.data.data.info.cards);
        if (response.data.data.info.cards !== null){
          setCardLength((response.data.data.info.cards).length);
        }
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  function GetCredit () {
    axios.get('/api/v1/credit/get', {}).then((response) => {
      if (response.data.code === 0) {
        setCredit(response.data.data.credit);
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  function StatusComponent () {
    if (wallet.status === 0) {
      return (
        <Chip label="Normal" color="success" />
      );
    } else {
      return (
        <Chip label="Frozen" color="primary" />
      );
    }
  }
  async function DeleteCard (id) {
    try {
      const res = await axios.post('/api/v1/card/delete', {
        id
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
    GetWallet();
  }

  React.useEffect(()=>{
    GetWallet();
    GetBanks();
    GetCredit();
    setTimeout(()=>{setShow(true);},1000);
  },[]);

  return (
    <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 2 }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        {msg}
      </Snackbar>
      {show ? (
        <>
          <Box m={2}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4} sm={12}>
                <Card sx={{height:200, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <CardContent sx={{textAlign:'center'}}>
                    <Typography variant="h6" gutterBottom sx={{ color: 'gray' }}>
                      Wallet Balance
                    </Typography>
                    <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
                      ￥{wallet.amount}
                    </Typography>
                    <StatusComponent />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4} sm={6}>
                <Card sx={{height:200, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" gutterBottom sx={{ color: 'gray' }}>
                      Credit
                    </Typography>
                    <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
                      {credit.credit} Mark
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4} sm={6}>
                <Card sx={{height:200, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" gutterBottom sx={{ color: 'gray' }}>
                      Total Cards
                    </Typography>
                    <Typography variant="h4" component="h2" sx={{ mb: 2 }}>
                      {cardLength} Cards
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
          <Divider variant={'middle'} sx={{ mt: 2, mb: 2 }}/>
          <Button variant={'contained'} sx={{ ml: 2 }} onClick={()=>{window.location.href='/page-top';}}>
            Top up
          </Button>
          <Button variant={'contained'} sx={{ ml: 2 }} onClick={()=>{window.location.href='/page-withdraw';}}>
            Withdraw
          </Button>
          <Button variant={'contained'} sx={{ ml: 2 }} onClick={()=>{window.location.href='/page-bind';}}>
            Bind Card
          </Button>
          <Box overflow={'auto'} sx={{ height: width >= 700 ? '500px' : '300px', m:2}}>
            {card !== null && (
              <Grid container spacing={3}>
                {card.map((c)=>(
                  <Grid item xs={12} key={c}>
                    <Card>
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Grid container alignItems="center" justifyContent="space-between">
                          <Grid item>
                            <Typography gutterBottom variant="h4" component="div">
                              {SearchBankNameByID(c.bankId)}
                            </Typography>
                          </Grid>
                          <Grid item justifyContent={'flex-end'}>
                            <Typography gutterBottom variant="h4" component="div">
                                  ￥{c.amount}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Typography variant="h6" component="h2" sx={{ mb: 2, textAlign: 'left' }}>
                          {c.cardAccount}
                        </Typography>
                      </CardContent>
                      <Grid container justifyContent="flex-end">
                        <CardActions>
                          <Button
                            size="small"
                            onClick={() => { void DeleteCard(c.id); }}
                            color={'error'}
                            variant={'text'}
                          >
                                Delete
                            <ClearIcon />
                          </Button>
                        </CardActions>
                      </Grid>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
            {card === null && (
              <Typography textAlign={'center'} variant={'h4'}>
                  You have not bind any card!
              </Typography>
            )}
          </Box>
        </>
      ):(
        <Box
          sx={{
            width: '100%',
            height: width >= 700 ? '800px' : '600px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default Wallet;
