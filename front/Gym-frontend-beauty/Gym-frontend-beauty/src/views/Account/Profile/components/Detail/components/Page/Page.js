import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import React from 'react';
import {History, Profile, Timetable, Wallet, Evaluation} from './components';

const Page = ({ page }) => {

  return (
    <Box>
      {page === 'profile' && (
        <Profile />
      )}
      {page === 'wallet' && (
        <Wallet />
      )}
      {page === 'timetable' && (
        <Timetable />
      )}
      {page === 'history' && (
        <History />
      )}
      {page === 'evaluation' && (
        <Evaluation />
      )}
    </Box>
  );
};

Page.propTypes = {
  page: PropTypes.string.isRequired,
};

export default Page;
