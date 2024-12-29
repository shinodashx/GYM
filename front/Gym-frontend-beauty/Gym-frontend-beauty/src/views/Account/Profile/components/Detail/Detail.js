import Box from '@mui/material/Box';
import React from 'react';
import { Page } from './components';
import {useParams} from 'react-router-dom';

const Detail = () => {
  const { page } = useParams();

  return (
    <Box sx={{ width: '100%', mb: 5 }}>
      <Box>
        <Page page={page} />
      </Box>
    </Box>
  );
};


export default Detail;
