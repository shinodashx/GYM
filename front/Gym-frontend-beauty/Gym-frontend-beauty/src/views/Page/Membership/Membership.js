import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Container from 'common/Container';
import {
  Hero,
  Reviews,
  Advantages,
  PricingCards
} from './components';

const Payment = () => {

  return (
    <Box>
      <Container>
        <Hero />
      </Container>
      <Container>
        <Advantages />
      </Container>
      <Divider />
      <Container>
        <Reviews />
      </Container>
      <Container position="relative" zIndex={2}>
        <PricingCards />
      </Container>
    </Box>
  );
};

export default Payment;
