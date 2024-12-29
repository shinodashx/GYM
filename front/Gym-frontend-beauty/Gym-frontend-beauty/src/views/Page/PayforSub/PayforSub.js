import React from 'react';
import { Steps } from './components';
import Box from '@mui/material/Box';
import Container from 'common/Container';

const PayforSub = () => {

  return (
    <Box
      position={'relative'}
      minHeight={'calc(100vh - 247px)'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      height={'100%'}>
      <Container>
        <Steps />
      </Container>
    </Box>
  );
};

export default PayforSub;
