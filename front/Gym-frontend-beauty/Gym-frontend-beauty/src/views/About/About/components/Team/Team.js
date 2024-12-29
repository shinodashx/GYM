import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';

const Team = () => {
  const theme = useTheme();
  return (
    <Box>
      <Box marginBottom={4}>
        <Typography
          sx={{
            textTransform: 'uppercase',
            fontWeight: 'medium',
          }}
          gutterBottom
          color={'textSecondary'}
          align={'center'}
        >
          Our team
        </Typography>
        <Box
          component={Typography}
          fontWeight={700}
          variant={'h3'}
          align={'center'}
        >
          Trust the professionals
        </Box>
      </Box>
      <Grid container spacing={2}>
        {[
          {
            name: 'Zhe Liu',
            title: 'Backend Engineer',
            avatar: 'https://gitlab.com/uploads/-/system/user/avatar/12937779/avatar.png?width=96',
            about:
              'Developing whole Backend',
          },
          {
            name: 'Haoxuan Song',
            title: 'Application Engineer',
            avatar: 'https://gitlab.com/uploads/-/system/user/avatar/13592749/avatar.png?width=96',
            about:
              'Developing whole User Application',
          },
          {
            name: 'Erjun Gao',
            title: 'Application Engineer',
            avatar: 'https://gitlab.com/uploads/-/system/user/avatar/13616087/avatar.png?width=96',
            about:
              'Developing whole Administrator Application',
          },
          {
            name: 'Huaqin Liu',
            title: 'Frontend Engineer',
            avatar: 'https://gitlab.com/uploads/-/system/user/avatar/13459599/avatar.png?width=96',
            about:
                'Developing whole User Web Application',
          },
          {
            name: 'Zihui Wang',
            title: 'Frontend Engineer',
            avatar: 'https://gitlab.com/uploads/-/system/user/avatar/13463483/avatar.png?width=96',
            about:
                'Developing whole Administrator Web Application',
          },
        ].map((item, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Box
              component={Card}
              borderRadius={3}
              boxShadow={2}
              sx={{
                textDecoration: 'none',
                transition: 'all .2s ease-in-out',
                '&:hover': {
                  transform: `translateY(-${theme.spacing(1 / 2)})`,
                },
                height: 230
              }}
            >
              <CardContent>
                <Box
                  component={Avatar}
                  src={item.avatar}
                  height={80}
                  width={80}
                />
                <Box marginTop={4}>
                  <ListItemText primary={item.name} secondary={item.title} />
                  <Typography variant={'subtitle2'} color={'textSecondary'}>
                    {item.about}
                  </Typography>
                </Box>
              </CardContent>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Team;
