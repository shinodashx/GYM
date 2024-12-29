import * as React from 'react';
import Box from '@mui/material/Box';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import { Step } from './components';

const Steps = () => {
  const { id } = useParams();
  const [page, setPage] = React.useState(<></>);
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
  React.useEffect(() => {
    if (cardsRef.current !== []) {
      setPage(<Step order={id} cards={cardsRef.current}/>);
    }
  },[cardsRef.current]);

  return (
    <Box sx={{ width: '100%' }}>
      {page}
    </Box>
  );
};

export default Steps;
