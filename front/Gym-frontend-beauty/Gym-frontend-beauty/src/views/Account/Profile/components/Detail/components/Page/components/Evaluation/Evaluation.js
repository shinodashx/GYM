import React from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import {CircularProgress, Rating} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';
import Alert from '@mui/material/Alert';
import EditIcon from '@mui/icons-material/Edit';
import Snackbar from '@mui/material/Snackbar';
import Grid from '@mui/material/Grid';



const Evaluation =() => {
  const [evaluate, setEvaluate] = React.useState([]);
  const [show, setShow] = React.useState(false);
  const [width, setWidth] = React.useState(window.innerWidth);
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState(<></>);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  function GetEvaluation () {
    axios.post('/api/v1/evaluation/get', {}).then((response) => {
      if (response.data.code === 0) {
        if (response.data.data.evaluations !== null){
          setEvaluate(response.data.data.evaluations);
        }
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  async function Delete (id) {
    try {
      const res = await axios.post('/api/v1/evaluation/delete', {
        id
      });
      if (res.data.code === 0) {
        setMsg(
          <Alert onClose={void handleClose} severity="success" sx={{ width: '100%' }}>
            {res.data.message}
          </Alert>
        );
        handleClick();
      } else {
        setMsg(
          <Alert onClose={void handleClose} severity="error" sx={{ width: '100%' }}>
            {res.data.message}
          </Alert>
        );
        handleClick();
      }
    } catch (err) {
      console.log(err);
    }
    GetEvaluation();
  }

  React.useEffect(
    () => {
      GetEvaluation();
      setTimeout(()=>{setShow(true);},1000);
    }, []
  );

  React.useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const EvaluationComp = () => {
    if (evaluate !== undefined){
      return (
        <Box>
          {evaluate.length !== 0 ? (
            <Grid container spacing={3}>
              {evaluate.map((e)=>(
                <Grid key={e} xs={12} sm={12} md={4} item>
                  <Box
                    key={e}
                    component={'a'}
                    display={'flex'}
                    width={'100%'}
                    height={'100%'}
                  >
                    {e.images !== '' ? (
                      <Box
                        component={Card}
                        width={'100%'}
                        height={280}
                        borderRadius={3}
                        display={'flex'}
                        flexDirection={'column'}
                      >

                        <CardMedia
                          component="img"
                          sx={{ width: 150, m: 'auto', height: 150 }}
                          image={'/'.concat(e.images.split(',')[0])}
                          title={e.id}
                          alt={e.id}
                        />

                        <Box component={CardContent}>
                          <Box marginBottom={1} display={'flex'}>
                            <Rating
                              name="rating"
                              value={e.score}
                              disabled
                            />
                          </Box>
                          <Typography
                            align={'left'}
                            variant={'body2'}
                            color="textSecondary"
                          >
                            {(e.description).length > 10 ? (
                              <>
                                {(e.description).slice(0,10)}...
                              </>
                            ):(
                              <>
                                {e.description}
                              </>
                            )}
                          </Typography>
                        </Box>
                        <Box flexGrow={1} />
                        <CardActions>
                          <Button
                            size="small"
                            onClick={() => { window.location.href=`/page-UpdateEvaluation/${e.id}`; }}
                            color={'primary'}
                            variant={'outlined'}
                          >
                        Update
                            <EditIcon />
                          </Button>
                          <Button
                            size="small"
                            onClick={() => { void Delete(e.id); }}
                            color={'error'}
                            variant={'text'}
                          >
                        Delete
                            <ClearIcon />
                          </Button>
                        </CardActions>
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
                              value={e.score}
                              disabled
                            />
                          </Box>
                          <Typography
                            align={'left'}
                            variant={'body2'}
                            color="textSecondary"
                          >
                            {(e.description).length > 10 ? (
                              <>
                                {(e.description).slice(0,10)}...
                              </>
                            ):(
                              <>
                                {e.description}
                              </>
                            )}
                          </Typography>
                        </Box>
                        <Box flexGrow={1} />
                        <CardActions>
                          <Button
                            size="small"
                            onClick={() => { window.location.href=`/page-UpdateEvaluation/${e.id}`; }}
                            color={'primary'}
                            variant={'outlined'}
                          >
                              Update
                            <EditIcon />
                          </Button>
                          <Button
                            size="small"
                            onClick={() => { void Delete(e.id); }}
                            color={'error'}
                            variant={'text'}
                          >
                              Delete
                            <ClearIcon />
                          </Button>
                        </CardActions>
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
        </Box>
      );
    }
    else {
      return(
        <Typography textAlign={'center'} variant={'h4'}>
                    You do not have any evaluation yet.
        </Typography>
      );
    }
  };

  return(
    <Box overflow={'auto'} sx={{ height: width >= 700 ? '800px' : '700px', border: 1, borderColor: 'divider', borderRadius: 2}}>
      <Box m={2}>
        {show ? (
          <EvaluationComp />
        ):(
          <Box
            sx={{
              width: '100%',
              height: width >= 700 ? '700px' : '600px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        {msg}
      </Snackbar>
    </Box>
  );
};

export default Evaluation;
