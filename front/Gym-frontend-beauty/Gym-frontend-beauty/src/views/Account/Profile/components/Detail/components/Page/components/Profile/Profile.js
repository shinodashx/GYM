import Box from '@mui/material/Box';
import React from 'react';
import { ProfileForm, PasswordForm } from './components';
import Divider from '@mui/material/Divider';
import {Container} from '@mui/material';

const profile = () => {

  return (
    <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 2 }}>
      <Container>
        <ProfileForm />
      </Container>
      <Divider sx={{ mt:1 }} />
      <Container>
        <PasswordForm />
      </Container>
    </Box>
  );
};


export default profile;
