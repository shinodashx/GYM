import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Container from 'common/Container';
import { Stories } from './components';

const Facility = ({ themeMode = 'light' }) => {
  return (
    <Box>
      <Container>
        <Stories themeMode={themeMode} />
      </Container>
    </Box>
  );
};

Facility.propTypes = {
  themeMode: PropTypes.string.isRequired,
};

export default Facility;
