import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from 'common/Container';
import {Evaluation, Headline, Stories} from './components';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import {Skeleton} from '@mui/material';

const Active = ({ themeMode = 'light' }) => {
  const { id } = useParams();
  const [facility, setFacility] = React.useState({
    facility: {
      description: undefined,
      location: undefined,
      name: undefined,
      images: undefined
    }
  });
  const [show, setShow] = React.useState(false);
  const [images, setImage] = React.useState({ images: [] });
  const [place, setPlace] = React.useState({ place: [] });
  const theme = useTheme();
  function getFacilityDetail () {
    const postData = {
      id
    };
    axios.post('/api/v1/facility/detail', postData).then((response) => {
      // set facility
      setFacility(response.data.data.facility);
      // set place
      setPlace({ place: response.data.data.facility.places });
      // set image
      const images = response.data.data.facility.facility.images.split(',');
      for (let i = 0; i < images.length; i++) {
        if (!images[i].includes('http')) {
          images[i] = '/' + images[i];
        }
      }
      setImage({ images });
    }).catch((error) => {
      console.log(error);
    });
  }
  React.useEffect(() => {
    getFacilityDetail();
    setTimeout(()=>{setShow(true);},1000);
  }, []);
  return (
    <Box>
      <Box
        position={'relative'}
        sx={{
          backgroundImage:`url(${images.images[0]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          '&:after': {
            position: 'absolute',
            content: '" "',
            width: '100%',
            height: '100%',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 1,
            background: theme.palette.common.black,
            opacity: 0.3,
          },
        }}
      >
        <Container zIndex={3} position={'relative'}>
          <Container
            marginLeft={'0 !important'}
            maxWidth={{ md: '50% !important' }}
          >
            <Headline facility={facility}/>
          </Container>
        </Container>
      </Box>
      <Box display="flex" justifyContent={'center'}>
        <Box
          component={Button}
          href={'/page-activity'}
          variant="contained"
          color="primary"
          size="large"
          mt={2}
        >
            Back
        </Box>
      </Box>
      <Container>
        <Grid container>
          <Grid item xs={12} md={4} sm={12} sx={{ borderRadius: 5, border: 1, borderColor: 'divider' }}>
            <Box m={2}>
              <Box overflow={'auto'} sx={{ height: 800, m: 2, mt: 5}}>
                <Evaluation />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={8} sm={12} sx={{ borderRadius: 5, border: 1, borderColor: 'divider' }}>
            <Container>
              <Box overflow={'auto'} sx={{ height: 950, m:2}}>
                {show ? (
                  <Stories themeMode={themeMode} place={place.place} />
                ):(
                  <Grid container spacing={4}>
                    {[1,2,3,4,5,6,7,8,9].map((item, i) => (
                      <Grid item xs={12} sm={6} md={4} key={i}>
                        <Skeleton variant="rectangular" height={100} sx={{ borderRadius: 3 }} />
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Box>
            </Container>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

Active.propTypes = {
  themeMode: PropTypes.string.isRequired,
};

export default Active;
