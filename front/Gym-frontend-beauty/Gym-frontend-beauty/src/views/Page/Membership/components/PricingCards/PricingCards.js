import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import CardActions from '@mui/material/CardActions';
import axios from 'axios';


const PricingCards = () => {
  const [sub, setSub] = React.useState([]);
  const subRef = React.useRef(sub);

  function getSub () {
    axios.post('/api/v1/subscription/type')
      .then((response) => {
        subRef.current = response.data.data.subscription_type;
        setSub(response.data.data.subscription_type);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  React.useEffect(() => {
    getSub();
  }, []);

  return (
    <Box>
      <Box marginBottom={4}>
        <Box
          component={Typography}
          fontWeight={700}
          variant={'h3'}
          align={'center'}
        >
          Get Your own
          <br />
          Membership
        </Box>
      </Box>
      <Box>
        <Grid container spacing={4} justifyContent="center">
          {sub.map((s)=>(
            <Grid item xs={12} md={4} key={s}>
              <Box
                component={Card}
                height={'100%'}
                display={'flex'}
                flexDirection={'column'}
                borderRadius={4}
              >
                <Box component={CardContent} padding={4}>
                  <Box
                    marginBottom={4}
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                  >
                    <Box
                      marginBottom={1}
                      display={'flex'}
                      width={'100%'}
                      justifyContent={'space-between'}
                      alignItems={'center'}
                    >
                      <Typography variant={'h6'}>
                        <Box component={'span'} fontWeight={600}>
                          {s.name}
                        </Box>
                      </Typography>
                      <Box display={'flex'} alignItems={'flex-start'}>
                        <Typography variant={'h4'} color={'primary'}>
                          <Box
                            component={'span'}
                            fontWeight={600}
                            marginRight={1 / 2}
                          >
                            ￥
                          </Box>
                        </Typography>
                        <Typography variant={'h3'} color={'primary'}>
                          <Box component={'span'} fontWeight={600}>
                            {s.amount}
                          </Box>
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Typography
                        component={'p'}
                        align={'center'}
                      >
                        {s.days} Days
                      </Typography>
                    </Grid>
                    {s.name === 'yearly' ? (
                      <Grid item xs={12}>
                        <Typography
                          component={'p'}
                          align={'center'}
                        >
                          70% discount
                        </Typography>
                      </Grid>

                    ):(
                      <Grid item xs={12}>
                        <Typography
                          component={'p'}
                          align={'center'}
                        >
                          80% discount
                        </Typography>
                      </Grid>
                    )}
                  </Grid>
                </Box>
                <Box flexGrow={1} />
                <Box
                  component={CardActions}
                  justifyContent={'center'}
                  padding={4}
                >
                  <Button
                    size={'large'}
                    onClick={()=>{ window.location.href=`/page-payforSub/${s.id}`; }}
                  >
                    Get
                  </Button>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default PricingCards;
