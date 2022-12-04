import React, {useEffect, useState} from 'react';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import {alpha, useTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import {File} from '../../../../types/file';
import {playGame} from '../Game/Game';
import {useLazyQuery} from '@apollo/client';
import {USER_ZONE_INFO} from '../../../../gql/userZoneInfo';
import {UserZoneInfo} from '../../../../types/userZoneInfo';
import {useRouter} from 'next/router';

type HeroProps = {
  title: string;
  cover: File | any;
};

const Hero = ({title, cover}: HeroProps): JSX.Element => {
  const {query} = useRouter();
  const theme = useTheme();
  const [isLogin, setIsLogin] = useState(false);
  const [queryUserZoneInfo, {data, refetch}] = useLazyQuery(USER_ZONE_INFO, {
    variables: {
      zoneId: Number(query.id),
    }
  });
  const userZoneInfo: UserZoneInfo = data?.userZoneInfo || {};
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token && query.id) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [query.id]);

  useEffect(() => {
    if (isLogin) {
      queryUserZoneInfo();
    }
  }, [isLogin, queryUserZoneInfo]);

  const handleGetInvolvedNow = () => {
    playGame(async () => {
      await refetch();
    });
  };

  return (
    <Grid container spacing={4}>
      <Grid item container xs={12} md={6} alignItems={'center'}>
        <Box data-aos={isMd ? 'fade-right' : 'fade-up'}>
          <Box marginBottom={2}>
            <Typography
              variant="h2"
              color="text.primary"
              sx={{fontWeight: 700}}
            >
              {title}
            </Typography>
          </Box>
          <Box marginBottom={3}>
            <Typography
              color={'primary'}
              component={'span'}
              variant="h2"
              sx={{
                fontWeight: 700,
                background: `linear-gradient(180deg, transparent 82%, ${alpha(
                  theme.palette.secondary.main,
                  0.3,
                )} 0%)`,
              }}
            >
              Task progress
            </Typography>
            <br />
            <Typography color="text.secondary" variant="h6" component="p"
              sx={{display: 'inline'}}> This task has been
              completed </Typography><Typography
              sx={{
                fontWeight: 900,
                display: 'inline'
              }}>{userZoneInfo.todayCompletionNumber}/{userZoneInfo.allNumber}</Typography>
            <Typography
              color="text.secondary"
              sx={{display: 'inline'}}
            >times today
            </Typography>
            <br />
            <Typography color="text.secondary" variant="h6" component="p"
              sx={{display: 'inline'}}> This area has won</Typography><Typography
              sx={{
                fontWeight: 900,
                display: 'inline'
              }}> {userZoneInfo.freezeNumber} </Typography>
            <Typography
              color="text.secondary"
              sx={{display: 'inline'}}
            >times
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection={{xs: 'column', sm: 'row'}}
            alignItems={{xs: 'stretched', sm: 'flex-start'}}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth={isMd ? false : true}
              onClick={handleGetInvolvedNow}
            >
              Get involved now
            </Button>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        container
        alignItems={'center'}
        justifyContent={'center'}
        xs={12}
        md={6}
        sx={{
          '& .lazy-load-image-background.lazy-load-image-loaded': {
            width: '100%',
            height: '100%',
          },
        }}
      >
        <Box
          component={LazyLoadImage}
          height={1}
          width={1}
          src={`${cover?.url}`}
          alt="..."
          effect="blur"
          borderRadius={2}
          maxWidth={600}
          maxHeight={500}
          sx={{
            objectFit: 'cover',
            boxShadow: '19px 20px 0px 0 rgb(140 152 164 / 13%)',
            filter: theme.palette.mode === 'dark' ? 'brightness(0.7)' : 'none',
          }}
        />
      </Grid>
    </Grid>
  );
};

export default Hero;
