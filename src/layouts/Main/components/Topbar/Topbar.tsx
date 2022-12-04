import React, {useMemo} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {alpha, useTheme} from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import ThemeModeToggler from '../../../../components/ThemeModeToggler';
import Router, {useRouter} from 'next/router';
import {Logo} from '../../../../components/Logo';

interface Props {
  // eslint-disable-next-line @typescript-eslint/ban-types
  onSidebarOpen: () => void;
  pages: {
    landings: Array<PageItem>;
    company: Array<PageItem>;
    account: Array<PageItem>;
    secondary: Array<PageItem>;
    blog: Array<PageItem>;
    portfolio: Array<PageItem>;
  };
  colorInvert?: boolean;
}

const Topbar = ({onSidebarOpen, colorInvert = false}: Props): JSX.Element => {
  const {pathname} = useRouter();
  const theme = useTheme();
  const {mode} = theme.palette;
  const isSignIn = useMemo(() => {
    if (pathname.includes('signin')) {
      return true;
    } else {
      return false;
    }
  }, [pathname]);

  const isAccount = useMemo(() => {
    if (pathname.includes('account')) {
      return true;
    } else {
      return false;
    }
  }, [pathname]);
  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      width={1}
    >
      <Box
        display={'flex'}
        component="a"
        href="/"
        title="theFront"
        width={{xs: 100, md: 120}}
      >
        <Logo />
      </Box>
      <Box sx={{display: {xs: 'flex', md: 'flex'}}} alignItems={'center'}>
        <ThemeModeToggler />
        {!isSignIn && !isAccount && (
          <Button
            onClick={() => onSidebarOpen()}
            aria-label="Menu"
            variant={'outlined'}
            sx={{
              borderRadius: 2,
              minWidth: 'auto',
              padding: 1,
              marginLeft: 1,
              borderColor: alpha(theme.palette.divider, 0.2),
            }}
          >
            <PersonIcon />
          </Button>
        )}
        {isAccount && (
          <Button
            onClick={() => {
              Router.push('/');
            }}
            aria-label="Menu"
            variant={'outlined'}
            sx={{
              borderRadius: 2,
              minWidth: 'auto',
              padding: 1,
              marginLeft: 1,
              borderColor: alpha(theme.palette.divider, 0.2),
            }}
          >
            <HomeIcon />
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Topbar;
