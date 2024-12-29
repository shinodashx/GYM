import Container from 'common/Container';
import Box from '@mui/material/Box';
import {PasswordForm} from './components';
import React from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import {LinearProgress} from '@mui/material';


const ResetPassword = () => {
  const location = useLocation();
  const [validate, setValidate] = React.useState(false);
  const token = new URLSearchParams(location.search).get('token');
  const [load,setLoad] = React.useState(false);


  function isTokenValidate () {
    axios.post('/api/v1/user/validate-token',{token})
      .then((response) => {
        setValidate(response.data.data.validate);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  React.useEffect(() => {
    isTokenValidate();
    setTimeout(()=>{setLoad(true);},1000);
  }, []);

  return (
    <Box
      position={'relative'}
      minHeight={'calc(100vh - 247px)'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      height={'100%'}
    >
      <Container maxWidth={600}>
        {load ? (
          <Box>
            {validate ? (
              <PasswordForm Token={token}/>
            ):(
              <Typography variant={'h2'} textAlign={'center'}>
                    Invalid Token!
              </Typography>
            )}
          </Box>
        ):(
          <Box alignSelf={'center'}>
            <LinearProgress  />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default ResetPassword;
