import React from 'react';
import Box from '@mui/material/Box';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import {CircularProgress} from '@mui/material';

const Timetable = () => {
  const today = new Date();
  const [order, setOrder] = React.useState([]);
  const orderRef = React.useRef(order);
  const [width, setWidth] = React.useState(window.innerWidth);
  const [show, setShow] = React.useState(false);
  const validRange = {
    start: today,
    end: new Date(new Date().setDate(today.getDate() + 6))
  };
  const [table, setTable] = React.useState(<></>);

  function GetOrder () {
    axios.post('/api/v1/order/own', {}).then((response) => {
      if (response.data.code === 0) {
        const reverseArray = response.data.data.order;
        if (reverseArray.length === 0){
          setTable(
            <Typography textAlign={'center'} variant={'h4'}>
                You do not have any upcoming orders
            </Typography>
          );
        } else {
          reverseArray.reverse();
          setOrder(reverseArray);
          orderRef.current = reverseArray;
        }
      }
      setTimeout(()=>{setShow(true);},1000);
    }).catch((error) => {
      console.log(error);
    });
  }

  function AllEvent () {
    const event1 = [];
    if (order !== undefined) {
      for (let i = 0; i < order.length; i++) {
        if (order[i].order.status === 1 || order[i].order.status === 2) {
          event1.push({
            start: order[i].order.startTime,
            end: order[i].order.endTime,
            allDay: false
          });
        }
      }
    }

    if((event1).length !== 0){
      setTable(tableComponent(event1));
    } else{
      setTable(
        <Typography textAlign={'center'} variant={'h4'}>
            You do not have any upcoming orders
        </Typography>
      );
    }
  }

  React.useEffect(() => {
    if((orderRef.current).length !== 0){
      AllEvent();
    }
  }, [orderRef.current]);

  React.useEffect(() => {
    GetOrder();
  }, []);
  React.useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const tableComponent = (events) => {
    return (
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        aspectRatio={1}
        validRange={validRange}
        initialView="timeGridWeek"
        events={events}
        contentHeight="auto"
      />
    );
  };

  return (
    <Box overflow={'auto'} sx={{ height: width >= 700 ? '800px' : '700px', border: 1, borderColor: 'divider', borderRadius: 2}}>
      <Box m={2}>
        {show ? (
          <>
            {table}
          </>
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
    </Box>
  );
};

export default Timetable;
