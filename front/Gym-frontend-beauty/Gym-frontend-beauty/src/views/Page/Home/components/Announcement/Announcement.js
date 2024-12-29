import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';

const Announcement = ({ themeMode = 'light' }) => {
  const theme = useTheme();
  const [Announcement, setAnnouncement] = React.useState([]);
  const [notice, setNotice] = React.useState({});
  const noticeRef = React.useRef(notice);
  const [open, setOpen] = React.useState(false);
  const isXs = useMediaQuery(theme.breakpoints.up('xs'), {
    defaultMatches: true,
  });
  const isSm = useMediaQuery(theme.breakpoints.up('sm'), {
    defaultMatches: true,
  });
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  const handleClickOpen = (ann) => {
    setOpen(true);
    setNotice(ann);
    noticeRef.current = ann;
  };
  const handleClose = () => {
    setOpen(false);
  };

  let slidesToShow = 1;
  if (isXs) {
    slidesToShow = 1;
  }
  if (isSm) {
    slidesToShow = 2;
  }
  if (isMd) {
    slidesToShow = 3;
  }

  const sliderOpts = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };
  function GetAnnouncement () {
    axios.get('/api/v1/announcement/announcements', {}).then((response) => {
      if (response.data.code === 0) {
        const sortedData = (response.data.data.announcement).sort((a, b) => new Date(b.updateTime) - new Date(a.updateTime));
        setAnnouncement(sortedData);
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  React.useEffect(() => {
    GetAnnouncement();
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
          Announcement
        </Typography>
      </Box>
      <Slider {...sliderOpts}>
        {Announcement.slice(0,5).map((item, i) => (
          <Box key={i} padding={{ xs: 1, sm: 2, md: 3 }}>
            <Box
              component={'a'}
              onClick={ () => { handleClickOpen(item); }}
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
                <Box
                  component={CardContent}
                  display={'flex'}
                  flexDirection={'column'}
                  alignItems={'center'}
                >
                  <Box maxWidth={100} marginBottom={2}>
                    {(item.title).length > 4 && (
                      <Box
                        height={'100%'}
                        width={'100%'}
                        sx={{
                          filter: themeMode === 'dark' ? 'contrast(0)' : 'none',
                        }}>
                        {(item.title).slice(0,4)}...
                      </Box>
                    )}
                    {(item.title).length <= 4 && (
                      <Box
                        height={'100%'}
                        width={'100%'}
                        sx={{
                          filter: themeMode === 'dark' ? 'contrast(0)' : 'none',
                        }}>
                        {item.title}
                      </Box>
                    )}
                  </Box>
                  <Typography
                    align={'center'}
                    variant={'body2'}
                    color="textSecondary"
                  >
                    {(item.updateTime).slice(0,10)}<br />
                    {(item.content).length > 8 && (
                      <Typography>
                        {(item.content).slice(0,7)}...
                      </Typography>
                    )}
                    {(item.content).length <= 8 && (
                      <Box
                        height={'100%'}
                        width={'100%'}
                        sx={{
                          filter: themeMode === 'dark' ? 'contrast(0)' : 'none',
                        }}>
                        {item.content}
                      </Box>
                    )}
                  </Typography>
                </Box>
                <Box flexGrow={1} />
                <Box component={CardActions} justifyContent={'center'}>
                  <Button size="large">Learn More</Button>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Slider>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {(noticeRef.current).title}
        </DialogTitle>
        <Divider variant={'middle'}></Divider>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Last Edit: {(noticeRef.current).updateTime}
          </DialogContentText>
        </DialogContent>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {(noticeRef.current).content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

Announcement.propTypes = {
  themeMode: PropTypes.string.isRequired,
};

export default Announcement;
