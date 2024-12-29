import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Container from 'common/Container';
import { Gallery, Headline, Announcement } from './components';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  setAvatar,
  setUsername,
  CheckLoginStatus,
  setPhone,
  setEmail,
  setSub, setDiscount
} from '../../../layouts/Main/components/User/User';

const Home = ({ themeMode = 'light' }) => {
  function getProfile () {
    axios.post('/api/v1/user/profile')
      .then((res) => {
        setAvatar('/'.concat(res.data.data.data.avatar));
        setUsername(res.data.data.data.username);
        setPhone(res.data.data.data.phone);
        setEmail(res.data.data.data.email);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async function getSub () {
    try {
      const res = await axios.post('/api/v1/subscription/type');
      return res.data.data.subscription_type;
    } catch (error) {
      console.log(error);
    }
  }

  async function getOwnSub () {
    try {
      const s = await getSub();
      const res = await axios.post('/api/v1/subscription/get');
      const su = res.data.data.subscription;
      setSub('');
      setDiscount('');
      if(su.length !== 0){
        const sua = su[su.length - 1];
        for(let i = 0;i<s.length;i++){
          if (parseInt(s[i].id) === parseInt(sua.subscriptionType) && sua.status === 0){
            setSub(s[i].name);
            if (s[i].name === 'yearly'){
              setDiscount('70%');
            }else if (s[i].name === 'monthly'){
              setDiscount('80%');
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    if(CheckLoginStatus){
      getProfile();
      void getOwnSub();
    }
  }, []);
  return (
    <Box>
      <Container>
        <Headline />
      </Container>
      <Container paddingY={'0 !important'}>
        <Gallery />
      </Container>
      <Container maxWidth={'800px !important'} paddingBottom={'0 !important'}>
        <Container>
          <Divider />
        </Container>
      </Container>
      <Container paddingTop={'0 !important'}>
        <Announcement themeMode={themeMode} />
      </Container>
    </Box>
  );
};

Home.propTypes = {
  themeMode: PropTypes.string.isRequired,
};

export default Home;
