import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from 'common/Container';
import { Headline, Stories } from './components';
import axios from 'axios';
import Button from '@mui/material/Button';
import {CircularProgress} from '@mui/material';

const Cours = ({ themeMode = 'light' }) => {
  const [show, setShow] = React.useState(false);
  const [course, setCourse] = React.useState({});
  const id = new URLSearchParams(location.search).get('id');
  const theme = useTheme();
  function getCourseDetail () {
    axios.get('/api/v1/course/get', {
      params: {
        id: id
      }
    })
      .then((response) => {
        console.log(response);
        setCourse(response.data.data.course);
        setTimeout(()=>{setShow(true);},1000);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  React.useEffect(() => {
    getCourseDetail();
  }, []);
  return (
    <Box>
      {show ? (
        <Box>
          <Box
            position={'relative'}
            sx={{
              backgroundImage: `url(${course.image.split(',')[0]})`,
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
                maxWidth={{md: '50% !important'}}
              >
                <Headline course={course}/>
              </Container>
            </Container>
          </Box>
          <Box display="flex" justifyContent={'center'}>
            <Box
              component={Button}
              href={'/page-courses'}
              variant="contained"
              color="primary"
              size="large"
              mt={2}
            >
                Back
            </Box>
          </Box>
          <Container>
            <Stories themeMode={themeMode} course={course} />
          </Container>
        </Box>
      ) : (
        <Container>
          <Box
            sx={{
              width: '100%',
              height: 800,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <CircularProgress />
          </Box>
        </Container>
      )}
    </Box>
  );
};

Cours.propTypes = {
  themeMode: PropTypes.string.isRequired,
};

export default Cours;
