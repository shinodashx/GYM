import React from 'react';
import Box from '@mui/material/Box';
import Container from 'common/Container';
import { Form } from './components';
import {useParams} from 'react-router-dom';

const Evaluation = () => {
  const { id } = useParams();

  return (
    <Box
      position={'relative'}
      minHeight={'calc(100vh - 247px)'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      height={'100%'}
    >
      <Container maxWidth={600}>
        <Form id={id} />
      </Container>
    </Box>
  );
};

export default Evaluation;
