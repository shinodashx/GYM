/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Footer = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  return (
    <Box>
      <Box marginBottom={4}>
        <Typography
          variant="h4"
          align={'center'}
          sx={{
            fontWeight: 'medium',
          }}
        >
          Didn't find
          <br />
          what you are looking for?
        </Typography>
      </Box>
      <Box
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        justifyContent={'center'}
        alignItems={{ xs: 'stretched', sm: 'center' }}
      >
        <Box
          component={Button}
          variant="outlined"
          color="primary"
          size="large"
          fullWidth={!isMd}
          href={'/page-contact'}
          marginTop={{ xs: 1, sm: 0 }}
          marginLeft={{ sm: 2 }}
        >
          Contact Us
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
