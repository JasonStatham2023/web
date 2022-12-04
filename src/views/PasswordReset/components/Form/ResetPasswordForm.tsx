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
import {useMutation} from '@apollo/client';
import toast from 'react-hot-toast';
import {RESET_PASSWORD} from '../../../../gql/resetPassword';
import {useRouter} from 'next/router';

const validationSchema = yup.object({
  password: yup
    .string()
    .required('Please specify your password')
    .min(6, 'The password should have at minimum length of 6'),
});

const ResetPasswordForm = (): JSX.Element => {
  const [handleResetPassword] = useMutation(RESET_PASSWORD);
  const {query: {email, authCode}} = useRouter();


  const initialValues = {
    password: '',
  };

  const onSubmit = async (values) => {
    const {data} = await handleResetPassword({
      variables: {
        authCode,
        email,
        ...values
      }
    });

    if (data.resetPassword.code === 100) {
      toast.success('Password reset successful!');
    } else {
      toast.error(data.resetPassword.message);
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
          Reset Password
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
          }}
        >
          Forgot your password?
        </Typography>
        <Typography color="text.secondary">
          Enter your new password below and we'll get you back on track.
        </Typography>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant={'subtitle2'} sx={{marginBottom: 2}}>
              Enter your password
            </Typography>
            <TextField
              label="Password *"
              variant="outlined"
              name={'password'}
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
                <Button
                  size={'large'}
                  variant={'outlined'}
                  component={Link}
                  href={'/signin'}
                  fullWidth
                >
                  Back to sign in
                </Button>
              </Box>
              <Button size={'large'} variant={'contained'} type={'submit'}>
                Confirm reset
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default ResetPasswordForm;
