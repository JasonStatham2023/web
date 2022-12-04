import React from 'react';
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import {DialogActions, DialogContent, DialogContentText, Fab, Tooltip} from '@mui/material';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import Container from 'components/Container';

import {Footer, Topbar} from './components';

import pages from '../navigation';
import Router from 'next/router';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import ClipboardJS from 'clipboard';
import toast from 'react-hot-toast';


interface Props {
  children: React.ReactNode;
  colorInvert?: boolean;
  bgcolor?: string;
}

const Main = ({
  children,
  colorInvert = false,
  bgcolor = 'transparent',
}: Props): JSX.Element => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setTimeout(() => {
      const clipboard = new ClipboardJS('#copy-email');

      clipboard.on('success', function (e) {
        toast.success('Copy successfully!');

        e.clearSelection();
      });
    }, 30);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const theme = useTheme();

  const handleSidebarOpen = (): void => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      Router.push('/account-info');
    } else {
      Router.push('/signin?returnUrl=' + window.location.href);
    }

  };


  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 38,
  });

  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
          <DialogContentText>
            Contact customer service, email: ovblifeG@gmail.com
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button id="copy-email"
            onClick={handleClose}
            autoFocus
            data-clipboard-text="ovblifeG@gmail.com"
          >
            Copy email address
          </Button>
        </DialogActions>
      </Dialog>
      <AppBar
        position={'sticky'}
        sx={{
          top: 0,
          backgroundColor: trigger ? theme.palette.background.paper : bgcolor,
        }}
        elevation={trigger ? 1 : 0}
      >
        <Container paddingY={1}>
          <Topbar
            onSidebarOpen={handleSidebarOpen}
            pages={pages}
            colorInvert={trigger ? false : colorInvert}
          />
        </Container>
      </AppBar>
      <main>
        {children}
        <Divider />
      </main>
      <Container paddingY={4}>
        <Footer />
      </Container>
      <Tooltip title="Settings">
        <Fab
          color="primary"
          onClick={handleClickOpen}
          size="medium"
          sx={{
            bottom: 100,
            margin: (theme) => theme.spacing(4),
            position: 'fixed',
            right: 0,
            zIndex: 1900
          }}
        >
          <SupportAgentIcon fontSize="large" />
        </Fab>
      </Tooltip>
    </Box>
  );
};

export default Main;
