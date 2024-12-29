import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import {CircularProgress, Rating, Stack} from '@mui/material';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';

const Evaluation = () => {
  const { id } = useParams();
  const [show, setShow] = React.useState(false);
  const [evaluation, setEvaluation] = React.useState([]);
  async function getEvaluation() {
    try {
      const response = await axios.post('/api/v1/evaluation/user/get',{id});
      const eva = response.data.data.evaluations;
      const facilityEvaluation = [];
      if (eva !== null) {
        for (let i = 0; i < eva.length; i++) {
          if (String(id) === String(eva[i].Evaluation.facilityId)) {
            facilityEvaluation.push(eva[i]);
          }
        }
        setEvaluation(facilityEvaluation);
      }
    } catch (error) {
      console.log(error);
    }
  }
  React.useEffect(() => {
    void getEvaluation();
    setTimeout(()=>{setShow(true);},1000);
  }, []);


  return (
    <Container>
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
                Evaluations
        </Typography>
        <Box>
          {show ? (
            <>
              {evaluation.length !== 0 ? (
                <Grid container spacing={3}>
                  {evaluation.map((e)=>(
                    <Grid key={e} xs={12} sm={12} md={6} item>
                      <Box
                        key={e}
                        component={'a'}
                        display={'flex'}
                        width={'100%'}
                        height={'100%'}
                      >
                        {e.Evaluation.images !== '' ? (
                          <Box
                            component={Card}
                            width={'100%'}
                            height={220}
                            borderRadius={3}
                            display={'flex'}
                            flexDirection={'column'}
                          >
                            <CardMedia
                              component="img"
                              sx={{ width: 150, m: 'auto' }}
                              image={'/'.concat(e.Evaluation.images.split(',')[0])}
                              title={e.Evaluation.id}
                              alt={e.Evaluation.id}
                            />
                            <Box component={CardContent}>
                              <Box marginBottom={1} display={'flex'}>
                                <Rating
                                  name="rating"
                                  value={e.Evaluation.score}
                                  disabled
                                />
                              </Box>
                              <Typography
                                align={'left'}
                                variant={'body2'}
                                color="textSecondary"
                              >
                                {(e.Evaluation.description).length > 10 ? (
                                  <>
                                    {(e.Evaluation.description).slice(0,10)}...
                                  </>
                                ):(
                                  <>
                                    {e.Evaluation.description}
                                  </>
                                )}
                              </Typography>
                            </Box>
                            <Box flexGrow={1} />
                            <Box sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <Stack direction="row" spacing={1}>
                                <Chip
                                  label={e.UserName}
                                  variant="outlined"
                                />
                              </Stack>
                            </Box>
                          </Box>
                        ):(
                          <Box
                            component={Card}
                            width={'100%'}
                            height={150}
                            borderRadius={3}
                            display={'flex'}
                            flexDirection={'column'}
                          >
                            <Box component={CardContent}>
                              <Box marginBottom={1} display={'flex'}>
                                <Rating
                                  name="rating"
                                  value={e.Evaluation.score}
                                  disabled
                                />
                              </Box>
                              <Typography
                                align={'left'}
                                variant={'body2'}
                                color="textSecondary"
                              >
                                {(e.Evaluation.description).length > 10 ? (
                                  <>
                                    {(e.Evaluation.description).slice(0,10)}...
                                  </>
                                ):(
                                  <>
                                    {e.Evaluation.description}
                                  </>
                                )}
                              </Typography>
                            </Box>
                            <Box flexGrow={1} />
                            <Box sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <Stack direction="row" spacing={1}>
                                <Chip
                                  label={e.UserName}
                                  variant="outlined"
                                />
                              </Stack>
                            </Box>
                          </Box>
                        )}
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              ):(
                <Box>
                  <Typography variant={'h4'} textAlign={'center'}>
                      There is no evaluation!
                  </Typography>
                </Box>
              )}
            </>
          ):(
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <CircularProgress />
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Evaluation;
