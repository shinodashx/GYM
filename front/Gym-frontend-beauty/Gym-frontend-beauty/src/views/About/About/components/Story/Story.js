import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TeamWorkingIllustration from 'svg/illustrations/TeamWorking';

const Story = () => {
  return (
    <Box>
      <Box marginBottom={4}>
        <Typography
          sx={{
            textTransform: 'uppercase',
            fontWeight: 'medium',
            mt: 10
          }}
          gutterBottom
          color={'textSecondary'}
          align={'center'}
        >
          Our story
        </Typography>
        <Box
          component={Typography}
          fontWeight={700}
          variant={'h3'}
          gutterBottom
          align={'center'}
        >
          We design and implement effective system
          <br />
          to manage Gym
        </Box>
        <Typography
          variant={'h6'}
          component={'p'}
          color={'textSecondary'}
          align={'center'}
        >
            In the development of the sports stadium management system,
            we will use Agile development and Pair Programming methods to ensure that the system is of high quality,
            easy to maintain, and easy to expand. We will continuously improve and optimize the system through iterations,
            user feedback, and continuous integration methods, and ensure that the system meets user needs and expectations.
            We believe that through the use of Agile development and Pair Programming methods,
            we can successfully develop an excellent sports stadium management system that
            provides users with a better user experience and value.
        </Typography>
      </Box>
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        marginBottom={4}
      >
        <Box height={'100%'} width={'100%'} maxWidth={600}>
          <TeamWorkingIllustration height={'100%'} width={'100%'} />
        </Box>
      </Box>
    </Box>
  );
};

export default Story;
