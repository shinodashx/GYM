import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import axios from 'axios';
import {Skeleton} from '@mui/material';
import Alert from '@mui/material/Alert';

const Stories = () => {
  const theme = useTheme();
  const [course, setCourse] = React.useState([]);
  const [bool, setBool] = React.useState(false);


  function getCourse () {
    axios.get('/api/v1/course/list')
      .then((response) => {
        setCourse(response.data.data.courses);
        setBool(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function returnImage(i){
    if (!i.includes('http://101.42.160.53/')) {
      return ('http://101.42.160.53/').concat(i);
    }
    return i;
  }

  React.useEffect(() => {
    getCourse();
  }, []);

  return (
    <Box>
      <Box marginBottom={4}>
        <Typography
          sx={{
            textTransform: 'uppercase',
            fontWeight: 'medium',
          }}
          gutterBottom
          color={'secondary'}
          align={'center'}
        >
          Courses
        </Typography>
      </Box>
      {course === undefined ? (
        <Box>
          {bool ? (
            <Box height={800}>
              <Alert severity="error">You need to login!</Alert>
              <Grid container spacing={4} mt={2}>
                {[1,2,3,4,5,6,7,8,9].map((item, i) => (
                  <Grid item xs={12} sm={6} md={4} key={i}>
                    <Skeleton variant="rectangular" height={355} sx={{ borderRadius: 3 }} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          ):(
            <Grid container spacing={4}>
              {[1,2,3,4,5,6,7,8,9].map((item, i) => (
                <Grid item xs={12} sm={6} md={4} key={i}>
                  <Skeleton variant="rectangular" height={355} sx={{ borderRadius: 3 }} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      ):(
        <Grid container spacing={4}>
          {(course).map((item, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Box
                component={'a'}
                onClick={()=>{
                  window.location.href=`/page-course?id=${item.id}`;
                }}
                display={'block'}
                width={'100%'}
                height={'100%'}
                sx={{
                  textDecoration: 'none',
                  transition: 'all .2s ease-in-out',
                  '&:hover': {
                    transform: `translateY(-${theme.spacing(1 / 2)})`,
                  },
                }}
              >
                <Box
                  component={Card}
                  width={'100%'}
                  height={'100%'}
                  borderRadius={3}
                  display={'flex'}
                  flexDirection={'column'}
                  sx={{background: 'linear-gradient(to right, #e6e9f0, #eef1f5)'}}
                >
                  <CardMedia
                    image={returnImage(item.image.split(',')[0])}
                    title={item.title}
                    sx={{
                      height: 240,
                    }}
                  />
                  <Box component={CardContent}>
                    <Typography
                      align={'left'}
                      variant={'body2'}
                      color="textSecondary"
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      align={'left'}
                      variant={'subtitle2'}
                      color="textSecondary"
                    >
                      {(item.description).length > 20 ? (
                        <p>{(item.description).slice(0,20)}...</p>
                      ):(
                        <p>{item.description}</p>
                      )}

                    </Typography>
                  </Box>
                  <Box flexGrow={1} />
                  <Box component={CardActions} justifyContent={'flex-start'}>
                    <Button
                      size="large"
                      endIcon={
                        <svg
                          width={16}
                          height={16}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      }
                    >
                      Learn More
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

Stories.propTypes = {
  themeMode: PropTypes.string.isRequired,
};

export default Stories;
