import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import React from 'react';


const Login = () => {
  return (
    <Box sx={{ display: 'flex' }} alignItems={'center'}>
      <Box marginX={2}>
        <Link
          underline="none"
          component="a"
          href="/page-login"
          color="textPrimary"
        >
                    LOGIN
        </Link>
      </Box>
      <Box>
        <Button
          variant="contained"
          color="primary"
          component="a"
          target="blank"
          href="/page-signup"
          size="large"
        >
                    SIGN UP
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
