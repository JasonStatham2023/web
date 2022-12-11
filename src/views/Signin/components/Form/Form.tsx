/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import toast from 'react-hot-toast';
import Router, {useRouter} from 'next/router';
import {usersApi} from '../../../../api';

const validationSchema = yup.object({
  account: yup
    .string()
    .trim()
    .min(6, 'The account should have at minimum length of 6')
    .required('Account is required.'),
  password: yup
    .string()
    .required('Please specify your password')
    .min(6, 'The password should have at minimum length of 6'),
});

const Form = (): JSX.Element => {
  const router = useRouter();
  const initialValues = {
    account: '',
    password: '',
  };

  const onSubmit = async (values): Promise<void> => {
    const {code, message, body} = await usersApi.login({
      ...values,
    });
    if (code === 100) {
      window.localStorage.setItem('accessToken', body.token);
      window.localStorage.setItem('account', values.account);
      const returnUrl = (router.query.returnUrl as string | undefined) || '/';
      Router.push(returnUrl);
    } else {
      toast.error(message);
    }
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
						Sign In
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
          }}
        >
						Welcome back
        </Typography>
        <Typography color="text.secondary">
						Sign in to manage your account.
        </Typography>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant={'subtitle2'} sx={{marginBottom: 2}}>
								Enter your account
            </Typography>
            <TextField
              label="Account *"
              variant="outlined"
              name={'account'}
              fullWidth
              value={formik.values.account}
              onChange={formik.handleChange}
              error={formik.touched.account && Boolean(formik.errors.account)}
              // @ts-ignore
              helperText={formik.touched.account && formik.errors.account}
            />
          </Grid>
          <Grid item xs={12}>
            <Box
              display="flex"
              flexDirection={{xs: 'column', sm: 'row'}}
              alignItems={{xs: 'stretched', sm: 'center'}}
              justifyContent={'space-between'}
              width={1}
              marginBottom={2}
            >
              <Box marginBottom={{xs: 1, sm: 0}}>
                <Typography variant={'subtitle2'}>
										Enter your password
                </Typography>
              </Box>
              <Typography variant={'subtitle2'}>
                <Link
                  component={'a'}
                  color={'primary'}
                  href={'/password-reset'}
                  underline={'none'}
                >
										Forgot your password?
                </Link>
              </Typography>
            </Box>
            <TextField
              label="Password *"
              variant="outlined"
              name={'password'}
              type={'password'}
              fullWidth
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              // @ts-ignore
              helperText={formik.touched.password && formik.errors.password}
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
                <Typography variant={'subtitle2'}>
										Don't have an account yet?{' '}
                  <Link
                    component={'a'}
                    color={'primary'}
                    href={'/signup'}
                    underline={'none'}
                  >
											Sign up here.
                  </Link>
                </Typography>
              </Box>
              <Button size={'large'} variant={'contained'} type={'submit'}>
									Sign In
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Form;
