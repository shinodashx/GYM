import React from  'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const Bot = () => {
  const [answer, setAnswer] = React.useState('');
  const [sentence, setSentence] = React.useState('');
  async function getResponse (sentence){
    axios.post(
      'http://38.47.115.99:3700/v1/chat/completions',
      {
        'model': 'gpt-3.5-turbo',
        'messages': [{ 'role': 'user', 'content': sentence }],
      }
    ).then(res => {
      setAnswer(res.data.choices[0].message.content);
    });
  }
  return (
    <Container sx={{ marginTop: 12 }}>
      <Grid>
        <Grid item container xs={12}>
          <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
            Enter your Question
          </Typography>
          <TextField
            label="Question *"
            variant="outlined"
            name={'description'}
            type={'text'}
            fullWidth
            multiline
            rows={5}
            value={sentence}
            onChange={(e)=>{setSentence(e.target.value);}}
          />
        </Grid>
        <Grid item container xs={12} sx={{mt: 12}}>
          <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
              Answer
          </Typography>
          <TextField
            label="Answer here"
            variant="outlined"
            name={'description'}
            type={'text'}
            fullWidth
            multiline
            disabled
            rows={5}
            value={answer}
          />
        </Grid>
        <Grid item container xs={12}>
          <Box
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            alignItems={{ xs: 'stretched', sm: 'center' }}
            justifyContent={'center'}
            width={'100%'}
            maxWidth={600}
            margin={'0 auto'}
            mt={10}
            mb={3}
          >
            <Button size={'large'} sx={{ width:'50%' }} variant={'contained'} onClick={
              ()=>{void getResponse(sentence);}
            }>
                Submit
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Bot;
