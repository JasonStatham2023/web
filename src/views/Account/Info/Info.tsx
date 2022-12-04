import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Page from '../components/Page';
import Main from 'layouts/Main';
import {useQuery} from '@apollo/client';
import {USERINFO} from '../../../gql/userinfo';
import {Userinfo} from '../../../types/userinfo';
import Button from '@mui/material/Button';

const Info = (): JSX.Element => {
  const {data} = useQuery(USERINFO);
  const userinfo: Userinfo = data?.userinfo || {};

  const handleLogoutClick = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('account');
    window.location.href = '/signin';
  };
  return (
    <Main>
      <Page>
        <Box>
          <Box
            display={'flex'}
            flexDirection={{xs: 'column', md: 'row'}}
            justifyContent={'space-between'}
            alignItems={{xs: 'flex-start', md: 'center'}}
          >
            <Typography variant="h6" fontWeight={700}>
              account information
            </Typography>
          </Box>
          <Box paddingY={4}>
            <Divider />
          </Box>
          <form>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6">
                  Available Balance：${userinfo.balance}
                </Typography>
                <Typography variant="caption">available balance</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6">
                  Winning amount:${userinfo.accountFrozen}
                </Typography>
                <Typography variant="caption">winning amount</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6">
                  Withdrawal balance:${userinfo.withdrawalAmount}
                </Typography>
                <Typography variant="caption">
                  After initiating a withdrawal, the available balance will
                  become the withdrawal balance!
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6">
                  Total assets:$
                  {(userinfo.balance +
                    userinfo.withdrawalAmount +
                    userinfo.accountFrozen)?.toFixed(2) || 0}
                </Typography>
                <Typography variant="caption">
                  Total assets consist of available balance, winning amount, and
                  withdrawal balance!
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6">
                  Number of gold coins:{userinfo.gold}
                </Typography>
                <Typography variant="caption">
                  Win 10 times and you will get this gold coin
                </Typography>
              </Grid>
            </Grid>
          </form>
          <Button
            variant="contained"
            fullWidth
            sx={{marginTop: 3}}
            onClick={handleLogoutClick}
          >
            Sign out
          </Button>
        </Box>
      </Page>
    </Main>
  );
};

export default Info;
