import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ReactComponent as Logo } from '../../../../svg/logo.svg';
import { CheckLoginStatus } from '../User/User';
import { Login, Account } from './components';

const Topbar = ({
  themeMode,
  themeToggler,
  onSidebarOpen,
}) => {
  const UserComponent = () => {
    if(!CheckLoginStatus()){
      return (
        <Login />
      );
    }else {
      return (
        <Account />
      );
    }
  };
  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      width={'100%'}
    >
      <Box display={'flex'} alignItems={'center'}>
        <Box marginRight={{ xs: 1, sm: 2 }}>
          <IconButton onClick={onSidebarOpen} aria-label="Menu">
            <MenuIcon />
          </IconButton>
        </Box>
        <Box
          display={'flex'}
          alignItems="baseline"
          component="a"
          underline="none"
          href="/"
          title="Gym"
          height={45}
          width={45}
        >
          <Logo width={'100%'} height={'100%'} />
        </Box>
      </Box>
      <Box display="flex" alignItems={'center'}>
        <Box>
          <IconButton
            onClick={() => themeToggler()}
            aria-label="Dark mode toggler"
            color={themeMode === 'light' ? 'primary' : 'secondary'}
          >
            {themeMode === 'light' ? (
              <svg
                width={24}
                height={24}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            ) : (
              <svg
                width={24}
                height={24}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            )}
          </IconButton>
        </Box>
        <UserComponent />
      </Box>
    </Box>
  );
};

Topbar.propTypes = {
  onSidebarOpen: PropTypes.func,
  themeToggler: PropTypes.func.isRequired,
  themeMode: PropTypes.string.isRequired,
  setThemePalette: PropTypes.func.isRequired,
  paletteType: PropTypes.string.isRequired,
};

export default Topbar;
