import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DownloadOutlined } from '@ant-design/icons';
import { ReactComponent as Logo } from '../../../../svg/logo.svg';
import {Popover, QRCode, Space, Button} from 'antd';
import Link from '@mui/material/Link';

const Footer = () => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        width={'100%'}
        flexDirection={{ xs: 'column', sm: 'row' }}
      >
        <Box
          display={'flex'}
          component="a"
          underline="none"
          href="/"
          alignItems='center'
          title="Gym"
          height={45}
          width={45}
        >
          <Logo width={'100%'} height={'100%'} />
        </Box>
        <Box display="flex" flexWrap={'wrap'} alignItems={'center'}>
          <Box marginTop={1} marginRight={2}>
            <Popover content={
              <Space direction="vertical" align="center">
                <QRCode value={'http://101.42.160.53/uploads/common/csgxf5y3k5kes3utav.apk'} />
              </Space>
            }>
              <Link href={'http://101.42.160.53/uploads/common/csgxf5y3k5kes3utav.apk'}>
                <Button icon={<DownloadOutlined />}>Download Mobile App</Button>
              </Link>
            </Popover>
          </Box>
        </Box>
      </Box>
    </Grid>
    <Grid item xs={12}>
      <Typography
        align={'center'}
        variant={'subtitle2'}
        color="textSecondary"
        gutterBottom
      >
        &copy; GYM. 2023, IKUN. All rights reserved
      </Typography>
    </Grid>
  </Grid>
);

export default Footer;
