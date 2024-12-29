import React from 'react';
import Box from '@mui/material/Box';
import Container from 'common/Container';
import { Form } from './components';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {LinearProgress} from '@mui/material';

const UpdateEvaluation = () => {
  const { id } = useParams();
  const [evaluation, setEvaluation] = React.useState({});
  const [show, setShow] = React.useState(false);

  function GetEvaluation () {
    axios.post('/api/v1/evaluation/get', {}).then((response) => {
      if (response.data.code === 0) {
        const eva = response.data.data.evaluations;
        for ( let i = 0; i < eva.length;i++){
          if ( parseInt(eva[i].id) === parseInt(id) ){
            console.log(eva[i]);
            setEvaluation(eva[i]);
            return;
          }
        }
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  React.useEffect(
    () => {
      GetEvaluation();
      setTimeout(()=>{setShow(true);},1000);
    }, []
  );

  return (
    <Box
      position={'relative'}
      minHeight={'calc(100vh - 247px)'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      height={'100%'}
    >
      {show ? (
        <Container maxWidth={600}>
          <Form evaluation={evaluation}/>
        </Container>
      ):(
        <Container sx={{ width: '100%' }}>
          <LinearProgress />
        </Container>
      )}
    </Box>
  );
};

export default UpdateEvaluation;
