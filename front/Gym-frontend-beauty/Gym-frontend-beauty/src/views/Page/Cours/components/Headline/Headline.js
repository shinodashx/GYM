/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

const Headline = ( {course} ) => {
  const theme = useTheme();
  return (
    <Box>
      <Box>
        <Box marginBottom={2}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              color: theme.palette.common.white,
            }}
          >
            {course.title}
          </Typography>
          <Typography
            sx={{
              fontWeight: 700,
              color: theme.palette.common.white,
            }}
          >
            Description : {course.description}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

Headline.propTypes = {
  course: PropTypes.any,
};

export default Headline;
