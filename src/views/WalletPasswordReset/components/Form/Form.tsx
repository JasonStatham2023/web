/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useMutation} from '@apollo/client';
import {SET_WALLET_PASSWORD} from '../../../../gql/setWalletPassword';
import toast from 'react-hot-toast';
import {useRouter} from 'next/router';

const validationSchema = yup.object({
  walletPassword: yup
    .string()
    .trim()
    .min(6, 'The wallet password is 6 digits long.')
    .max(6, 'The wallet password is 6 digits long.')
    .required('wallet password is required.'),
});

const Form = (): JSX.Element => {
  const {query: {email, authCode}} = useRouter();
  const [handleSetWalletPassword] = useMutation(SET_WALLET_PASSWORD);


  const initialValues = {
    walletPassword: '',
  };

  const onSubmit = async (values) => {
    const {data} = await handleSetWalletPassword({
      variables: {
        authCode,
        email,
        ...values
      }
    });

    if (data.setWalletPassword.code === 100) {
      toast.success('The password reset link has been sent to your email!');
    } else {
      toast.error(data.setWalletPassword.message);
    }

    return values;
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });

  return (
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
          Recover wallet password
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
          }}
        >
          Forgot your wallet password?
        </Typography>
        <Typography color="text.secondary">
          Enter your wallet password below and we'll get you back on track.
        </Typography>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant={'subtitle2'} sx={{marginBottom: 2}}>
              Enter your wallet password
            </Typography>
            <TextField
              inputProps={{
                maxLength: 6,
              }}
              label="wallet password *"
              variant="outlined"
              name={'walletPassword'}
              fullWidth
              value={formik.values.walletPassword}
              onChange={formik.handleChange}
              error={formik.touched.walletPassword && Boolean(formik.errors.walletPassword)}
              // @ts-ignore
              helperText={formik.touched.walletPassword && formik.errors.walletPassword}
            />
          </Grid>
          <Grid item container xs={12}>
            <Box
              display="flex"
              flexDirection={{xs: 'column', sm: 'row'}}
              alignItems={{xs: 'stretched', sm: 'center'}}
              justifyContent={'space-between'}
              width={1}
              maxWidth={600}
              margin={'0 auto'}
            >
              <Box marginBottom={{xs: 1, sm: 0}}>

              </Box>
              <Button size={'large'} variant={'contained'} type={'submit'}>
                Set wallet password
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Form;
