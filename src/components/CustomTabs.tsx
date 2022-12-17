import React from 'react';
import styled from 'styled-components';
import {Grid} from '@mui/material'; // Import the Grid component from the @mui/material package
import {Person as SignInIcon, PersonAdd as InviteIcon} from '@mui/icons-material';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import {useTheme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Container = styled(Grid)`
  && {
    padding: 16px;
  }
`;

const Item = styled(Grid)`
  && {
    display: flex;
    align-items: center;
  }
`;

const IconContainer = styled.div`
  margin-right: 8px;
`;

export default function MobileLayout(): JSX.Element {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  return (
    <Container container>
      <Grid item display="flex" flexDirection="column" alignItems="center" xs={6}>
        <Box
          component={Avatar}
          width={50}
          height={50}
          marginBottom={2}
          bgcolor={theme.palette.primary.main}
          color={theme.palette.background.paper}
        >
          <SignInIcon/>
        </Box>
        <IconContainer>

        </IconContainer>
        <div>Sign In</div>
      </Grid>
      <Grid item display="flex" flexDirection="column" alignItems="center" xs={6}>
        <Box
          component={Avatar}
          width={50}
          height={50}
          marginBottom={2}
          bgcolor={theme.palette.primary.main}
          color={theme.palette.background.paper}
        >
          <InviteIcon/>
        </Box>
        <div>Invite</div>
      </Grid>
    </Container>
  );
}
