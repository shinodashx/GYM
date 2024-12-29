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
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import axios from 'axios';
import {Skeleton} from '@mui/material';

const Stories = () => {
  const theme = useTheme();
  const facilities = React.useRef([]);
  const [facility, setFacility] = React.useState({ facility: [] });
  const [tag, setTag] = React.useState('All');
  const tagRef = React.useRef(tag);
  const [tags, setTags] = React.useState([]);
  const tagsRef = React.useRef(tags);
  const [show, setShow] = React.useState(false);

  const handleChange = (event, newValue) => {
    setTag(newValue);
    tagRef.current = newValue;
    setShow(false);
  };
  function getFacilities () {
    axios.post('/api/v1/facility/facility')
      .then((response) => {
        facilities.current = response.data.data.facility;
        setFacility({ facility: facilities.current });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getFacilitiesByTag () {
    axios.post('/api/v1/facility/tag/name',{name: tagRef.current})
      .then((response) => {
        facilities.current = response.data.data.facility;
        setFacility({ facility: facilities.current });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getTag () {
    axios.get('/api/v1/tag/all')
      .then((response) => {
        const t = (response.data.data.tags).filter(item => item.name !== 'activity');
        tagsRef.current = t;
        setTags(t);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  React.useEffect(() => {
    getFacilities();
    getTag();
  }, []);

  React.useEffect(() => {
    if (tag === 'All') {
      getFacilities();
    }
    else{
      getFacilitiesByTag();
    }
    setTimeout(()=>{setShow(true);},500);
  }, [tagRef.current]);

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
          Facilities
        </Typography>
      </Box>
      <Box sx={{ width: '100%', mb: 5, display: 'flex', justifyContent: 'center' }}>
        <Tabs
          value={tag}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
        >
          <Tab value="All" label="All" wrapped/>
          {(tagsRef.current).map((t) => (
            <Tab value={t.name} label={t.name} key={t.name} wrapped />
          ))}
        </Tabs>
      </Box>
      {!show ? (
        <Grid container spacing={4}>
          {[1,2,3,4,5,6,7,8,9].map((item, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Skeleton variant="rectangular" height={355} sx={{ borderRadius: 3 }} />
            </Grid>
          ))}
        </Grid>
      ):(
        <Grid container spacing={4}>
          {(facility.facility).map((item, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Box
                component={'a'}
                href={`/page-facility/${item.facility.id}`}
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
                    image={item.facility.images.split(',')[0]}
                    title={item.facility.name}
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
                      {item.facility.name}
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
