/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import toast from 'react-hot-toast';
import Dialog from '@mui/material/Dialog';
import {DialogActions, DialogContent, DialogContentText} from '@mui/material';

const Application = (): JSX.Element => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleApply = () => {
    toast.error('The ad space is full!');
  };
  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
          <DialogContentText>
            Advertiser contract is full! For bidding details, please contact! ovblifeG@gmail.com
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={{xs: 'center', sm: 'center'}}
        flexDirection={{xs: 'column', sm: 'row'}}
      >
        <Box>
          <Typography fontWeight={700} variant={'h5'} gutterBottom>
            Advertising video is in hot bidding
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button variant="contained" color="primary" size="large" onClick={handleClickOpen}>
            Apply
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Application;
