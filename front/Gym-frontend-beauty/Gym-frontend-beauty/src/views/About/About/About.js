import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Container from 'common/Container';
import { Story, Team } from './components';

const About = () => {
  return (
    <Box>
      <Container paddingY={'0 !important'}>
        <Story />
        <Container>
          <Divider />
        </Container>
      </Container>
      <Container paddingTop={'0 !important'}>
        <Team />
      </Container>
    </Box>
  );
};

export default About;

