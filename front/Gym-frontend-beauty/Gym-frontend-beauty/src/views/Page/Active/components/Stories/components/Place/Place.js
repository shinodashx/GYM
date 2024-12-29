import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { DatePicker, Select } from 'antd';
import axios from 'axios';
import moment from 'moment';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Divider from '@mui/material/Divider';
import ReplySharpIcon from '@mui/icons-material/ReplySharp';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Place = ({ place }) => {
  const theme = useTheme();
  const [order, setOrder] = React.useState([]);
  const orderRef = React.useRef(order);
  const [placeId, setPlaceId] = React.useState(0);
  const placeIdRef = React.useRef(placeId);
  const [event, setEvent] = React.useState([]);
  const eventRef = React.useRef(event);
  const [open, setOpen] = React.useState(false);
  const [openMulti, setOpenMulti] = React.useState(false);
  const [openBar, setOpenBar] = React.useState(false);
  const [msg, setMsg] = React.useState(<></>);
  const [orderCode, setOrderCode] = React.useState('');
  const orderCodeRef = React.useRef(orderCode);
  const [placeName, setPlaceName] = React.useState('');
  const placeNameRef = React.useRef(placeName);
  const [bookCount, setBookCount] = React.useState(1);
  const bookCountRef = React.useRef(bookCount);

  const handleClickBar = () => {
    setOpenBar(true);
  };

  const handleCloseBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenBar(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpenMulti = () => {
    setOpenMulti(true);
  };

  const handleCloseMulti = () => {
    setOpenMulti(false);
  };
  function getPlaceOrder () {
    axios.post('/api/v1/facility/place/occupied', { placeId:placeIdRef.current }).then((response) => {
      setOrder(response.data.data.occupied);
      orderRef.current = response.data.data.occupied;
    }).catch((error) => {
      console.log(error);
    });
  }
  function AllEvent () {
    const event1 = [];
    for (let i = 0; i < orderRef.current.length; i++) {
      event1.push({
        start: orderRef.current[i].startTime,
        end: orderRef.current[i].endTime,
        allDay: false
      });
    }
    setEvent(event1);
    eventRef.current = event1;
    setPage(<RentPage />);
  }
  React.useEffect(() => {
    AllEvent();
  }, [orderRef.current]);
  React.useEffect(() => {
    if(placeIdRef.current !== 0) {
      getPlaceOrder();
    }
  }, [placeIdRef.current]);
  React.useEffect(() => {
    setPage(<PlacePage places={place}/>);
  }, [place]);
  const PlacePage = ( {places} ) => {
    return (
      <Box>
        {places.length > 0 ? (
          <>
            <Box marginBottom={4}>
              <Typography
                sx={{
                  textTransform: 'uppercase',
                  fontWeight: 'medium',
                }}
                gutterBottom
                color={'secondary'}
                align={'center'}
              >
                Activities
              </Typography>
            </Box>
            <Grid container spacing={4}>
              {places.map((item, i) => (
                <Grid item xs={12} sm={12} md={6} key={i}>
                  <Box
                    component={'a'}
                    display={'block'}
                    width={'100%'}
                    height={'100%'}
                    sx={{
                      textDecoration: 'none',
                      transition: 'all .2s ease-in-out',
                      '&:hover': {
                        transform: `translateY(-${theme.spacing(1 / 2)})`,
                      },
                    }}
                  >
                    <Box
                      component={Card}
                      width={'100%'}
                      height={'100%'}
                      borderRadius={3}
                      display={'flex'}
                      flexDirection={'column'}
                    >
                      <Box component={CardContent}>
                        <Grid container alignItems="center">
                          <Grid item xs>
                            <Typography gutterBottom variant="h4" component="div">
                              {item.name}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography gutterBottom variant="h6" component="div">
                               ￥{item.cost}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                      <Box flexGrow={1} />
                      <Box component={CardActions} justifyContent={'flex-start'}>
                        <Button
                          size="large"
                          onClick={ () => { setPlaceId(item.id);placeIdRef.current=item.id;setPlaceName(item.name);placeNameRef.current=item.name;setPage(<RentPage />);  } }
                          endIcon={
                            <svg
                              width={16}
                              height={16}
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                              />
                            </svg>
                          }
                        >
                          Rent
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </>
        ):(
          <Box marginBottom={4}>
            <Typography
              sx={{
                textTransform: 'uppercase',
                fontWeight: 'medium',
              }}
              gutterBottom
              color={'secondary'}
              align={'center'}
            >
              Activities
            </Typography>
            <Typography variant={'h4'} textAlign={'center'}>
                There might be no activities
            </Typography>
          </Box>
        )}
      </Box>
    );

  };
  PlacePage.propTypes = {
    places: PropTypes.any
  };
  const RentPage = () => {
    const today = new Date();
    const validRange = {
      start: today,
      end: new Date(new Date().setDate(today.getDate() + 6))
    };
    const { RangePicker } = DatePicker;
    const [time, setTime] = React.useState([]);
    const onChange = (value, dateString) => {
      setTime(dateString);
    };
    const handleSubmitBook = async (e) => {
      e.preventDefault();
      if (time !== undefined) {
        if (bookCountRef.current === 1){
          try {
            const res = await axios.post('/api/v1/order/create', {
              placeId: placeIdRef.current,
              startTime: time[0],
              endTime: time[1]
            });
            if (res.data.code === 0) {
              setMsg(
                <Alert onClose={void handleClose} severity="success" sx={{ width: '100%' }}>
                  {res.data.message}
                </Alert>
              );
              handleClickBar();
              setOrderCode(res.data.data.orderCode);
              orderCodeRef.current = res.data.data.orderCode;
              handleClickOpen();
            } else {
              setMsg(
                <Alert onClose={void handleClose} severity="error" sx={{ width: '100%' }}>
                  {res.data.message}
                </Alert>
              );
              handleClickBar();
              if(res.data.message === 'Unauthorized'){
                setTimeout(function (){window.location.href = '/page-login';}, 2000);
              }
            }
          } catch (err) {
            console.log(err);
          }
        } else{
          try {
            const res = await axios.post('/api/v1/order/create-regular', {
              placeId: placeIdRef.current,
              SessionStart: time[0],
              SessionEnd: time[1],
              start_day: String(time[0]).slice(0,10),
              week_count: bookCountRef.current,
            });
            if (res.data.code === 0) {
              setMsg(
                <Alert onClose={void handleClose} severity="success" sx={{ width: '100%' }}>
                  {res.data.message}
                </Alert>
              );
              handleClickBar();
              setOrderCode(res.data.data.orderCode);
              orderCodeRef.current = res.data.data.orderCode;
              handleClickOpenMulti();
            } else {
              setMsg(
                <Alert onClose={void handleClose} severity="error" sx={{ width: '100%' }}>
                  {res.data.message}
                </Alert>
              );
              handleClickBar();
              if(res.data.message === 'Unauthorized'){
                setTimeout(function (){window.location.href = '/page-login';}, 2000);
              }
            }
          } catch (err) {
            console.log(err);
          }
        }
      }
      getPlaceOrder();
    };

    const disabledDate = (current) => {
      const isDisabledBeforeToday = current && current < moment().startOf('day');
      const isDisabledAfterOneWeek = current && current > moment().add(7, 'days').endOf('day');
      return isDisabledBeforeToday || isDisabledAfterOneWeek;
    };

    const Booking = (
      <>
        <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
          <RangePicker
            showTime={{ format: 'HH:00:00' }}
            format="YYYY-MM-DD HH:00:00"
            disabledDate={disabledDate}
            onChange={onChange}
            style={{ width: '80%', marginTop: 10, marginBottom: 10 }}
          />
          <Select
            defaultValue={bookCountRef.current}
            onChange={(value) => {
              setBookCount(value);
              bookCountRef.current=value;
              console.log(bookCountRef.current);
            }}
            options={
              Array.from({ length: 8 }, (_, i) => ({
                value: i+1,
                label: i+1
              }))
            }
          />
        </Box>
        <Box display="flex" justifyContent={'center'}>
          <Box
            component={Button}
            variant="contained"
            color="primary"
            size="large"
            sx={{ mb: 1 }}
            onClick={handleSubmitBook}
          >
            Booking now
          </Box>
        </Box>
      </>
    );
    return (
      <Box height={'100%'}>
        <Box marginBottom={4}>
          <Typography
            sx={{
              textTransform: 'uppercase',
              fontWeight: 'medium',
            }}
            gutterBottom
            color={'secondary'}
            align={'center'}
          >
                        Place Name: {placeNameRef.current}
          </Typography>
        </Box>
        <h1 style={{ textAlign: 'center' }}>
          <Button aria-label={'back'} sx={{ height: 10 }} onClick={ () => { setPage(<PlacePage places={place}/>); } }>
            <ReplySharpIcon color={'action'} sx={{ color: 'grey' }}/>
          </Button>
          Timetable
        </h1>
        <Divider></Divider>
        <Box sx={{ height: '59%', overflow: 'auto', mt: '1%', border: 1, borderColor: 'divider', borderRadius: 5, width: '100%' }}>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            aspectRatio={1}
            validRange={validRange}
            initialView="timeGridWeek"
            events={eventRef.current}
            contentHeight="auto"
          />
        </Box>
        <Box sx={{ mt: '1%', border: 1, borderColor: 'divider', borderRadius: 10 }}>
          {Booking}
        </Box>
      </Box>
    );
  };
  const [page, setPage] = React.useState(<PlacePage places={place}/>);

  return (
    <Box height={'100%'}>
      {page}
      <Snackbar open={openBar} autoHideDuration={6000} onClose={handleCloseBar}>
        {msg}
      </Snackbar>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="title"
        aria-describedby="description"
      >
        <DialogTitle id="title">
          <Alert onClose={void handleClose} severity="success" sx={{ width: '100%' }}>
                        Booking Successfully
          </Alert>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
                        Do you want to pay for it now?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button href={`/page-payfor/${orderCodeRef.current}`} autoFocus>
                        Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openMulti}
        onClose={handleCloseMulti}
        aria-labelledby="title"
        aria-describedby="description"
      >
        <DialogTitle id="title">
          <Alert onClose={void handleCloseMulti} severity="success" sx={{ width: '100%' }}>
            Booking Successfully
          </Alert>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to pay for it now?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMulti}>No</Button>
          <Button href={`/page-payforRegular/${orderCodeRef.current}`} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

Place.propTypes = {
  place: PropTypes.any
};

export default Place;
