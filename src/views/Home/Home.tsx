import React from 'react';
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';

import Main from 'layouts/Main';
import Container from 'components/Container';
import {CompanyIntroduction, Stories} from './components';
import Application from './components/Application';
import Hero from './components/Hero';
import MobileLayout from '../../components/CustomTabs';

const Home = (): JSX.Element => {
  const theme = useTheme();
  return (
    <Main>
      <Hero/>
      <MobileLayout/>
      <Box>
        <Container>
          <Stories/>
        </Container>
        <Container>
          <CompanyIntroduction/>
        </Container>
        <Container>
          <Application/>
        </Container>
      </Box>
    </Main>
  );
};

export default Home;
