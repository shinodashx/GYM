import * as React from 'react';
import Box from '@mui/material/Box';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import { Step } from './components';

const Steps = () => {
  const { id } = useParams();
  const [order, setOrder] = React.useState({});
  const orderRef = React.useRef(order);
  const [page, setPage] = React.useState(<></>);
  const [cards, setCards] = React.useState([]);
  const cardsRef = React.useRef(cards);

  function GetOrderDetail () {
    axios.post('/api/v1/order/regular-info', {
      orderCode: id
    }).then((response) => {
      if (response.data.code === 0) {
        console.log(response.data.data);
        setOrder(response.data.data);
        orderRef.current = response.data.data;
      }
    }).catch((error) => {
      console.log(error);
    });
  }

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
    GetOrderDetail();
    GetWallet();
  },[]);
  React.useEffect(() => {
    if (orderRef.current !== {} && cardsRef.current !== []) {
      setPage(<Step order={orderRef.current} cards={cardsRef.current}/>);
    }
  },[orderRef.current, cardsRef.current]);

  return (
    <Box sx={{ width: '100%' }}>
      {page}
    </Box>
  );
};

export default Steps;
