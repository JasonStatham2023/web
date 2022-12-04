/* eslint-disable react/jsx-no-duplicate-props */

import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useMutation, useQuery} from '@apollo/client';
import {VIDEOS} from '../../../../gql/videos';
import {Video} from '../../../../types/video';
import {
  Button,
  Container,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import CardMedia from '@mui/material/CardMedia';
import {VERIFY_ORDER} from '../../../../gql/verifyOrder';
import {CREATE_ORDER} from '../../../../gql/createOrder';
import Router, {useRouter} from 'next/router';
import toast from 'react-hot-toast';

let _playGameCallback = () => null;
let _playGame = () => null;

export const playGame = (callback = () => null) => {
  _playGameCallback = callback;
  return _playGame();
};

const Game = (): JSX.Element => {
  const {data} = useQuery(VIDEOS);
  const {
    query: {id},
  } = useRouter();
  const [openTipsRecharge, setOpenTipsRecharge] = useState(false);
  const [openTipsResult, setOpenTipsResult] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [openVideo, setOpenVideo] = useState(false);
  const [visiblePlayButton, setVisiblePlayButton] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [left, setLeft] = useState('-99999px');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const videos: Video[] = data?.videos || [];
  const [handleVerifyOrder] = useMutation(VERIFY_ORDER);
  const [handleCreateOrder] = useMutation(CREATE_ORDER);

  const handlePlayGame = useCallback(async () => {
    setOpenTipsResult(false);
    const {
      data: {
        verifyOrder: {code, message},
      },
    } = await handleVerifyOrder({
      variables: {
        zoneId: Number(id),
      },
    });
    if (code === 100) {
      setOpenVideo(true);
      setVisiblePlayButton(true);
      try {
        setTimeout(() => {
          const index = new Date().getTime() % videos.length;
          videoRef.current.src =
            videos[index]?.file.url ||
            'https://static.597e.com/video/1660097415136051.mp4';
          videoRef.current.addEventListener('pause', function (e) {
            setLeft('-999999px');
            setVisiblePlayButton(true);
          });
          videoRef.current.addEventListener('waiting', function (e) {
            setLeft('-999999px');
            setVisiblePlayButton(true);
          });

          videoRef.current.addEventListener('durationchange', function (e) {
            setLeft('0px');
            setVisiblePlayButton(false);
          });

          videoRef.current.addEventListener('play', () => {
            setLeft('0px');
            setVisiblePlayButton(false);
          });
          videoRef.current.addEventListener('ended', async () => {
            setOpenVideo(false);
            const {
              data: {
                createOrder: {message},
              },
            } = await handleCreateOrder({
              variables: {
                zoneId: Number(id),
              },
            });
            _playGameCallback();
            setOpenTipsResult(true);
            setResultMessage(message);
          });
          if (videoRef.current) {
            videoRef.current.play();
          }
        }, 300);
      } catch (e) {
        console.log(e);
      }
    } else {
      // 弹窗提示没钱了进行充值
      if (code === 98) {
        // 没钱了，提示充钱
        setOpenTipsRecharge(true);
      }
      if (code === 99) {
        toast.error(message);
      }
    }
  }, [handleCreateOrder, handleVerifyOrder, id, videos]);

  useEffect(() => {
    _playGame = handlePlayGame;
  }, [handlePlayGame]);

  const handleVideoPlay = useCallback(() => {
    if (videoRef.current) {
      setLeft('0px');
      videoRef.current.play();
    }
  }, []);

  const handleGoRecharge = useCallback(() => {
    // TODO: 跳转充值
    Router.push('/account-recharge');
  }, []);
  // @ts-ignore
  // @ts-ignore
  //
  // @ts-ignore
  return (
    <Container>
      <Dialog
        fullWidth
        onClose={() => setOpenTipsResult(false)}
        open={openTipsResult}
      >
        <DialogContent>
          <DialogContentText>{resultMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePlayGame} color="primary">
            continue to participate
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        onClose={() => setOpenTipsRecharge(false)}
        open={openTipsRecharge}
      >
        <DialogTitle>Insufficient balance</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Does the account balance need to be recharged?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleGoRecharge} color="primary">
            to recharge
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openVideo} fullWidth>
        <DialogContent sx={{position: 'relative', p: 0}}>
          {visiblePlayButton && (
            <Button
              sx={{
                position: 'absolute',
                width: '68px',
                height: '48px',
                left: '50%',
                top: '50%',
                marginLeft: '-24px',
                marginTop: '-34px',
              }}
              onClick={handleVideoPlay}
            >
              <svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%">
                <path
                  className="ytp-large-play-button-bg"
                  d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
                  fill="#212121"
                  fillOpacity="0.8"
                ></path>
                <path d="M 45,24 27,14 27,34" fill="#fff"></path>
              </svg>
            </Button>
          )}
          {/*@ts-ignore*/}
          {
            <CardMedia
              sx={{height: 'auto', position: 'relative', left: left}}
              ref={(ele: HTMLVideoElement) => {
                videoRef.current = ele;
              }}
              src=""
              component="video"
              autoPlay
              playsInline
              // muted={true}
              webkit-playsinline
            ></CardMedia>
          }
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Game;
