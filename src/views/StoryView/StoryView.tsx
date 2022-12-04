import React, {useEffect} from 'react';
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';

import Main from 'layouts/Main';
import Container from 'components/Container';
import {Game, Hero} from './components';
import {useRouter} from 'next/router';
import {useLazyQuery} from '@apollo/client';
import {STORY} from '../../gql/story';
import {Story} from '../../types/story';
import {DocsContent} from '../../components/docs/docs-content';

const StoryView = (): JSX.Element => {
  const theme = useTheme();
  const {query: {id}} = useRouter();
  const [handleGetStory, {data}] = useLazyQuery(STORY, {
    variables: {
      id: Number(id)
    }
  });
  const story: Story = data?.story || {};
  useEffect(() => {
    if (id) {
      handleGetStory();
    }
  }, [handleGetStory, id]);

  return (
    <Main>
      <Container>
        <Hero title={story.title} cover={story.cover || {}} />
      </Container>
      <Container
        maxWidth="lg"
        sx={{pb: '120px', paddingTop: '0px !important'}}
      >
        <DocsContent content={story.introduce} />
      </Container>
      <Box
        position={'relative'}
        sx={{
          backgroundColor: theme.palette.alternate.main,
        }}
      >
        <Container>
        </Container>
        <Box
          component={'svg'}
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 1920 100.1"
          sx={{
            width: '100%',
            marginBottom: theme.spacing(-1),
          }}
        >
          <path
            fill={theme.palette.background.paper}
            d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
          ></path>
        </Box>
      </Box>
      <Game />
    </Main>
  );
};

export default StoryView;
