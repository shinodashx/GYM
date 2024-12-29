import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import React from 'react';
import {useParams} from 'react-router-dom';
import Container from '@mui/material/Container';


const TabComponent = () => {
  const { page } = useParams();

  const [pag, setPag] = React.useState(page);
  const pageRef = React.useRef(pag);
  const [width, setWidth] = React.useState(window.innerWidth);

  const handleChange = (event, newValue) => {
    setPag(newValue);
    pageRef.current = newValue;
    window.location.href=`/page-profile/${pageRef.current}`;
  };

  React.useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Box>
      <Box mt={5} sx={{ display: { xs: 'none', sm: 'flex' } }}>
        <Tabs
          value={page}
          onChange={handleChange}
          orientation="vertical"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab value="profile" label="Profile" wrapped sx={{fontSize: 20}} />
          <Tab value="wallet" label="Wallet" wrapped sx={{fontSize: 20}} />
          <Tab value="timetable" label="TimeTable" wrapped sx={{fontSize: 20}} />
          <Tab value="history" label="History" wrapped sx={{fontSize: 20}} />
          <Tab value="evaluation" label="Evaluation" wrapped sx={{fontSize: 20}} />
        </Tabs>
      </Box>
      <Container mt={5} sx={{ display: { xs: 'flex', sm: 'none' }, width: width*0.8 }}>
        <Tabs
          value={page}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
        >
          <Tab value="profile" label="Profile" wrapped sx={{fontSize: 12}} />
          <Tab value="wallet" label="Wallet" wrapped sx={{fontSize: 12}} />
          <Tab value="timetable" label="TimeTable" wrapped sx={{fontSize: 12}} />
          <Tab value="history" label="History" wrapped sx={{fontSize: 12}} />
          <Tab value="evaluation" label="Evaluation" wrapped sx={{fontSize: 12}} />
        </Tabs>
      </Container>
    </Box>
  );
};

export default TabComponent;
