import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { Box, CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';

const Video = ({ video }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (video !== ''){
      setLoading(false);
    }

  }, [video]);

  return (
    <Box sx={{ position: 'relative' }}>
      {loading && (
        <Box sx={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}
      {!loading && (
        <ReactPlayer url={video} width='100%' height='100%' controls />
      )}
    </Box>
  );
};

Video.propTypes = {
  video: PropTypes.any
};

export default Video;
