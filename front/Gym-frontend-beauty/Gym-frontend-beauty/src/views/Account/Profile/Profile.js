import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Portrait, Detail } from './components';
import {Container} from '@mui/material';

const Profile = () => {
  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Box sx={{ height: width >= 600 ? (width >= 700 ? (width >= 900 ? '900px' : '1100px') : '900px') : '1650px', mt: 5, background: 'linear-gradient(to right, #e6e9f0, #eef1f5)' }}>
      <Container>
        <Grid container spacing={4} height={1000}>
          <Grid container item xs={12} sm={5} md={4}>
            <Box ml={'auto'} mr={'auto'}>
              <Portrait />
            </Box>
          </Grid>
          <Grid item xs={12} sm={7} md={8}>
            <Box display={'flex'} p={1} ml={1}>
              <Detail />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Profile;
