import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface Props {
  text: string
}

function Empty({text}: Props): JSX.Element {
  return <Box sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px',
  }}>
    <Typography>
      {text}
    </Typography>
  </Box>;
}


export default Empty;
