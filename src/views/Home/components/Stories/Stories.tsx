import React from 'react';
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import {useQuery} from '@apollo/client';
import {STORIES} from '../../../../gql/stories';
import {Story} from '../../../../types/story';
import Link from 'next/link';

const Stories = (): JSX.Element => {
  const theme = useTheme();
  const {data} = useQuery(STORIES);
  const stories: Story[] = data?.stories || [];

  return (
    <Box>
      <Box marginBottom={4}>
        <Box
          component={Typography}
          fontWeight={700}
          variant={'h3'}
          align={'center'}
        >
          Newsletter
        </Box>
        <Typography
          sx={{
            fontWeight: 'medium',
          }}
          gutterBottom
          color={'secondary'}
          align={'center'}
        >
          OVB is developing rapidly. Official tip: Due to the rapid growth of the current user data,
          if the user experiences a delay in web page loading or video freezes. Please try to
          stagger the playing peak period.
        </Typography>

      </Box>
      <Grid container spacing={4}>
        {stories.map((item, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Box
              component={'a'}
              href={''}
              display={'block'}
              width={1}
              height={1}
              sx={{
                textDecoration: 'none',
                transition: 'all .2s ease-in-out',
                '&:hover': {
                  transform: `translateY(-${theme.spacing(1 / 2)})`,
                },
              }}
            >
              <Link href={`/store?id=${item.id}`}>
                <Box
                  component={Card}
                  width={1}
                  height={1}
                  borderRadius={2}
                  display={'flex'}
                  flexDirection={'column'}
                >
                  <CardMedia
                    image={`${item?.cover.url}`}
                    sx={{
                      height: 240,
                    }}
                  />
                  <Box component={CardContent} marginY={0} paddingY={0} paddingTop={1}>
                    <Box maxWidth={1} marginY={0}>
                      <Typography
                        align={'left'}
                        variant={'h4'}
                        color="textSecondary"
                      >
                        {item.title}
                      </Typography>
                    </Box>
                  </Box>
                  <Box flexGrow={1} />
                  <Box component={CardActions} justifyContent={'flex-start'}>
                    <Button
                      size="large"
                      endIcon={
                        <svg
                          width={16}
                          height={16}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      }
                    >
                      Get involved now
                    </Button>
                  </Box>
                </Box>
              </Link>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Stories;
