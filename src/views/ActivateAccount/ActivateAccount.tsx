import React, {useEffect} from 'react';
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import useMediaQuery from '@mui/material/useMediaQuery';

import Main from 'layouts/Main';
import Container from 'components/Container';
import Typography from '@mui/material/Typography';
import {useMutation} from '@apollo/client';
import {ACTIVATE_ACCOUNT} from '../../gql/activateAccount';
import {useRouter} from 'next/router';

const ActivateAccount = (): JSX.Element => {
  const theme = useTheme();
  const {query: {email, authCode}} = useRouter();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });


  const [handleActivateAccount, {data}] = useMutation(ACTIVATE_ACCOUNT);


  useEffect(() => {
    if (email && authCode) {
      handleActivateAccount({
        variables: {
          email,
          authCode
        }
      });
    }

  }, [authCode, email, handleActivateAccount]);

  return (
    <Main>
      <Box
        position={'relative'}
        minHeight={'calc(100vh - 247px)'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        height={1}
      >
        <Container>
          <Grid container spacing={6}>
            <Grid
              item
              container
              alignItems={'center'}
              justifyContent={'center'}
              xs={12}
              md={6}
            >
              <Box>
                <Box marginBottom={4}>
                  <Typography
                    sx={{
                      textTransform: 'uppercase',
                      fontWeight: 'medium',
                    }}
                    gutterBottom
                    color={'text.secondary'}
                  >
                    activate account
                  </Typography>
                  <Typography
                    variant="h4"
                    color="primary"
                    sx={{
                      fontWeight: 700,
                    }}
                  >
                    {
                      data?.activateAccount.code === 100 ? 'Account activation is successful!' +
                        ' Log in now!' : data?.activateAccount.message
                    }
                  </Typography>
                </Box>
              </Box>
            </Grid>
            {isMd ? (
              <Grid item container justifyContent={'center'} xs={12} md={6}>
                <Box height={1} width={1} maxWidth={500}>
                  <Box
                    component={'img'}
                    src={
                      'https://assets.maccarianagency.com/svg/illustrations/drawkit-illustration3.svg'
                    }
                    width={1}
                    height={1}
                    sx={{
                      filter:
                        theme.palette.mode === 'dark'
                          ? 'brightness(0.8)'
                          : 'none',
                    }}
                  />
                </Box>
              </Grid>
            ) : null}
          </Grid>
        </Container>
      </Box>
    </Main>
  );
};

export default ActivateAccount;
