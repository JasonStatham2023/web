import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Page from '../components/Page';
import Main from 'layouts/Main';
import QRCode from 'qrcode';
import CardMedia from '@mui/material/CardMedia';
import {useQuery} from '@apollo/client';
import {INVITE} from '../../../gql/invite';
import {Invite} from '../../../types/Invite';
import ClipboardJS from 'clipboard';
import toast from 'react-hot-toast';

const Invite = (): JSX.Element => {
  const [qrcode, setQrode] = useState('');
  const {data} = useQuery(INVITE);
  const invite: Invite = data?.invite || {};
  useEffect(() => {
    // With promises
    QRCode.toDataURL(invite.url)
      .then(url => {
        setQrode(url);
        console.log(url);
      })
      .catch(err => {
        console.error(err);
      });
  }, [invite.url]);

  useEffect(() => {
    const clipboardCode = new ClipboardJS('#copy-button-code');

    clipboardCode.on('success', function (e) {
      toast.success('Copy successfully!');

      e.clearSelection();
    });

    const clipboardUrl = new ClipboardJS('#copy-button-url');

    clipboardUrl.on('success', function (e) {
      toast.success('Copy successfully!');

      e.clearSelection();
    });
  }, []);
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
              Your invitation code：{invite.code}
            </Typography>
            <Button
              id="copy-button-code"
              data-clipboard-text={invite.code}
              size={'large'}
              variant={'outlined'}
              sx={{marginTop: {xs: 2, md: 0}}}
            >
              Copy the invitation code
            </Button>
          </Box>
          <Box paddingY={4}>
            <Divider />
          </Box>
          <Box
            display="flex"
            justifyContent="center"
          >
            <CardMedia
              image={qrcode}
              sx={{
                width: {xs: 300, md: 360},
                height: {xs: 300, md: 360},
                position: 'relative',
              }}
            >
            </CardMedia>
          </Box>
          <Box paddingY={4}>
            <Divider />
          </Box>
          <Grid item container xs={12}>
            <Box
              display="flex"
              width={1}
              margin={'0 auto'}
              flexDirection={{xs: 'column', md: 'row'}}
              justifyContent={'space-between'}
              alignItems={{xs: 'flex-start', md: 'center'}}
            >
              <Box marginBottom={{xs: 1, sm: 0}}>
                <Link
                  noWrap
                  color={'primary'}
                  underline={'none'}
                >
                  {invite.url}
                </Link>
              </Box>
              <Button size={'large'}
                id="copy-button-url"
                data-clipboard-text={invite.url}
                variant={'outlined'}
                sx={{marginTop: {xs: 2, md: 0}}}>
                Copy the invitation link
              </Button>
            </Box>
          </Grid>
        </Box>
      </Page>
    </Main>
  );
};

export default Invite;
