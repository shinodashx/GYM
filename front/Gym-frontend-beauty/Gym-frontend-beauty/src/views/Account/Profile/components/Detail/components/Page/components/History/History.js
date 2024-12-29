import React from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import ApprovalIcon from '@mui/icons-material/Approval';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import TextsmsIcon from '@mui/icons-material/Textsms';
import CancelIcon from '@mui/icons-material/Cancel';
import PaidIcon from '@mui/icons-material/Paid';
import ReceiptIcon from '@mui/icons-material/Receipt';
import Dialog from '@mui/material/Dialog';
import {QRCode} from 'antd';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {CircularProgress} from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Container from '@mui/material/Container';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const History = () => {
  const [order, setOrder] = React.useState([]);
  const [orderCode, setOrderCode] = React.useState('');
  const orderCodeRef = React.useRef(orderCode);
  const [width, setWidth] = React.useState(window.innerWidth);
  const [openQR, setOpenQR] = React.useState(false);
  const [openRefund, setOpenRefund] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState(<></>);
  const [show,setShow] = React.useState(false);
  const [history, setHistory] = React.useState({
    Normal: [],
    Regular: [],
    Waiting: [],
    Do: [],
    Done: [],
  });

  const [pag, setPag] = React.useState('all');
  const pageRef = React.useRef(pag);

  const handleChange = (event, newValue) => {
    setPag(newValue);
    pageRef.current = newValue;
    if (newValue === 'normal') {
      setOrder(history.Normal);
    } else if (newValue === 'regular'){
      setOrder(history.Regular);
    } else if (newValue === 'wait'){
      setOrder(history.Waiting);
    } else if (newValue === 'do'){
      setOrder(history.Do);
    } else if (newValue === 'evaluate'){
      setOrder(history.Done);
    }
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
  const handleClickOpenQR = (code) => {
    setOrderCode(code);
    orderCodeRef.current = code;
    setOpenQR(true);
  };

  const handleClickOpenRefund = (code) => {
    setOrderCode(code);
    orderCodeRef.current = code;
    setOpenRefund(true);
  };

  const handleCloseQR = () => {
    setOpenQR(false);
  };

  const handleCloseRefund = () => {
    setOpenRefund(false);
  };

  function StatusChip (o) {
    async function handleReceipt(id) {
      try {
        const res = await axios.post('/api/v1/order/receipt', {
          orderCode: id
        },{
          responseType: 'blob',
        });
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'receipt.pdf');
        document.body.appendChild(link);
        link.click();
        setMsg(
          <Alert onClose={void handleClose} severity="success" sx={{ width: '100%' }}>
            {res.data.message}
          </Alert>
        );
        handleClick();
      } catch (err) {
        console.log(err);
      }
    }

    if (o.order.status === 0) {
      return (
        <Button onClick={() => {
          window.location.href=`/page-payfor/${o.order.orderCode}`;
        }} variant={'text'}>
          <Chip icon={<PaidIcon/>} label={'Pay'} color="primary"/>
        </Button>
      );
    } else if (o.order.status === 1) {
      return (
        <>
          <Button variant={'text'} onClick={() => {handleClickOpenQR(o.order.orderCode);}}>
            <Chip icon={<ApprovalIcon/>} label={'Certification'} color="primary"/>
          </Button>
          <Button variant={'text'} onClick={() => {handleClickOpenRefund(o.order.orderCode);}}>
            <Chip icon={<MoneyOffIcon/>} label={'Refund'} color="error"/>
          </Button>
        </>
      );
    } else if (o.order.status === 2) {
      return (
        <>
          <Button variant={'text'}>
            <Chip icon={<AccessibilityIcon/>} label={'Using'} color="warning"/>
          </Button>
        </>
      );
    } else if (o.order.status === 3) {
      return (
        <>
          <Button variant={'text'} onClick={()=>{window.location.href=`/page-evaluation/${o.place.facilityId}`;}}>
            <Chip icon={<TextsmsIcon />} label={'Evaluate'} color="primary"/>
          </Button>
          <Button variant={'text'} onClick={() => {
            void handleReceipt(o.order.orderCode);
          }}>
            <Chip icon={<ReceiptIcon/>} label={'Receipt'} color="success"/>
          </Button>
        </>
      );
    } else if (o.order.status === 4) {
      return (
        <>
          <Button variant={'text'}>
            <Chip icon={<CancelIcon/>} label={'Canceled'} color="error"/>
          </Button>
        </>
      );
    } else if (o.order.status === 5) {
      return (
        <>
          <Button variant={'text'}>
            <Chip icon={<MoneyOffIcon/>} label={'Refunded'} color="error"/>
          </Button>
        </>
      );
    }
  }

  async function getRegular (id) {
    try {
      const res = await axios.post('/api/v1/order/regular-info', {
        orderCode: id
      });
      if (res.data.code === 0) {
        return res.data.data;
      }
    } catch (err) {
      console.log(err);
    }
  }

  function GetOrder () {
    axios.post('/api/v1/order/own', {}).then((response) => {
      if (response.data.code === 0) {
        const rArray = response.data.data.order;
        rArray.reverse();
        const reverseArray = [];
        const parent = [];
        const Regular = [];
        for (let i = 0; i< rArray.length;i++){
          const oCode = rArray[i].order.parentOrderCode;
          if (oCode === ''){
            reverseArray.push(rArray[i]);
          }else{
            if(!parent.includes(oCode)){
              parent.push(oCode);
              const or = getRegular(oCode);
              or.then((value)=>{
                Regular.push(value);
              });
            }
          }
        }
        console.log(Regular);
        setOrder(reverseArray);
        const Wait = [];
        const Do = [];
        const Done = [];
        for (let i = 0; i< reverseArray.length;i++){
          if (reverseArray[i].order.status === 0){
            Wait.push(reverseArray[i]);
          }else if (reverseArray[i].order.status === 1){
            Do.push(reverseArray[i]);
          }
          else if (reverseArray[i].order.status === 3){
            Done.push(reverseArray[i]);
          }
        }
        const his = {
          Normal: reverseArray,
          Regular: Regular,
          Waiting: Wait,
          Do: Do,
          Done: Done,
        };
        setHistory(his);
      }
    }).catch((error) => {
      console.log(error);
    });
  }
  React.useEffect(
    () => {
      GetOrder();
      setTimeout(()=>{setShow(true);},1000);
    }, []
  );

  const HistoryComp = () => {
    if (order.length !== 0){
      return (
        <Box>
          <Container mt={5} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Tabs
              defaultValue={'normal'}
              value={pageRef.current}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
            >
              <Tab value="normal" label="Normal" wrapped sx={{fontSize: 12}} />
              <Tab value="regular" label="Regular" wrapped sx={{fontSize: 12}} />
              <Tab value="wait" label="Waiting Payment" wrapped sx={{fontSize: 12}} />
              <Tab value="do" label="Waiting Using" wrapped sx={{fontSize: 12}} />
              <Tab value="evaluate" label="Waiting Evaluation" wrapped sx={{fontSize: 12}} />
            </Tabs>
          </Container>
          {order.map((o) => (
            <>
              {o.amount === undefined ?(
                <Card sx={{ width: '100%', mt: 1, mb: 1 }} key={o}>
                  <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      {o.order.orderCode}
                    </Typography>
                    <Typography variant="h5" component="div">
                          ￥{o.order.amount}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                          start time:{o.order.startTime}<br/>
                          end time :{o.order.endTime}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {StatusChip(o)}
                  </CardActions>
                </Card>
              ):(
                <>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                    >
                      <Card sx={{ width: '100%', mt: 1, mb: 1 }} key={o}>
                        <CardContent>
                          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {o.orderCode}
                          </Typography>
                          <Typography variant="h5" component="div">
                            ￥{o.amount}
                          </Typography>
                          <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            start day:{o.orders[0].order.startTime.slice(0,10)}<br/>
                            times:{o.orders.length}<br/>
                            start time:{o.orders[0].order.startTime.slice(10,)}<br/>
                            end time :{o.orders[0].order.endTime.slice(10,)}
                          </Typography>
                        </CardContent>
                        {o.orders[0].order.status === 0 && (
                          <CardActions>
                            <Button onClick={() => {
                              window.location.href=`/page-payforRegular/${o.orderCode}`;
                            }} variant={'text'}>
                              <Chip icon={<PaidIcon/>} label={'Pay'} color="primary"/>
                            </Button>
                          </CardActions>
                        )}
                      </Card>
                    </AccordionSummary>
                    <AccordionDetails>
                      {o.orders.map((or)=>(
                        <Card sx={{ width: '100%', mt: 1, mb: 1 }} key={o}>
                          <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                              {or.order.orderCode}
                            </Typography>
                            <Typography variant="h5" component="div">
                                ￥{or.order.amount}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                start time:{or.order.startTime}<br/>
                                end time :{or.order.endTime}
                            </Typography>
                          </CardContent>
                          {or.order.status !== 0 && (
                            <CardActions>
                              {StatusChip(or)}
                            </CardActions>
                          )}
                        </Card>
                      ))}
                    </AccordionDetails>
                  </Accordion>
                </>
              )}
            </>
          ))}
        </Box>
      );
    }
    else {
      return(
        <Box>
          <Container mt={5} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Tabs
              defaultValue={'normal'}
              value={pageRef.current}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
            >
              <Tab value="normal" label="Normal" wrapped sx={{fontSize: 12}} />
              <Tab value="regular" label="Regular" wrapped sx={{fontSize: 12}} />
              <Tab value="wait" label="Waiting Payment" wrapped sx={{fontSize: 12}} />
              <Tab value="do" label="Waiting Using" wrapped sx={{fontSize: 12}} />
              <Tab value="evaluate" label="Waiting Evaluation" wrapped sx={{fontSize: 12}} />
            </Tabs>
          </Container>
          <Typography textAlign={'center'} variant={'h4'}>
              There is no order
          </Typography>
        </Box>
      );
    }
  };

  async function handleRefund (id) {
    try {
      const res = await axios.post('/api/v1/order/refund', {
        orderCode: id
      });
      if (res.data.code === 0) {
        setMsg(
          <Alert onClose={void handleClose} severity="success" sx={{ width: '100%' }}>
            {res.data.message}
          </Alert>
        );
        handleClick();
        setTimeout(handleCloseRefund, 500);
      } else {
        setMsg(
          <Alert onClose={void handleClose} severity="error" sx={{ width: '100%' }}>
            {res.data.message}
          </Alert>
        );
        handleClick();
        setTimeout(handleCloseRefund, 500);
      }
    } catch (err) {
      console.log(err);
    }
    GetOrder();
  }

  React.useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Box sx={{ height: width >= 700 ? '800px' : '700px', border: 1, borderColor: 'divider', borderRadius: 2}}>
      <Box m={2}>
        {show ? (
          <Box>
            <Box overflow={'auto'} sx={{ height: width >= 700 ? '700px' : '600px' }}>
              <HistoryComp />
            </Box>
          </Box>
        ):(
          <Box
            sx={{
              width: '100%',
              height: width >= 700 ? '700px' : '600px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        {msg}
      </Snackbar>
      <Dialog
        open={openQR}
        onClose={handleCloseQR}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <QRCode value={orderCodeRef.current} bordered={false} />
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button onClick={handleCloseQR} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openRefund}
        onClose={handleCloseRefund}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={ () => { void handleRefund(orderCodeRef.current); } } autoFocus>
            Confirm
          </Button>
          <Button onClick={handleCloseRefund} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default History;
