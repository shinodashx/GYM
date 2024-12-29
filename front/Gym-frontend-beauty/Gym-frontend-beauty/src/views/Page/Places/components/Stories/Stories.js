import React from 'react';
import PropTypes from 'prop-types';
import {Place} from './components';
import Box from '@mui/material/Box';

const Stories = ({ place }) => {

  return (
    <Box height={'100%'}>
      <Place place={place} />
    </Box>
  );
};

Stories.propTypes = {
  place: PropTypes.any
};

export default Stories;
