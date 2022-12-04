import React, { useCallback, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useMutation } from '@apollo/client';
import Router, { useRouter } from 'next/router';
import { REGISTER } from '../../../../gql/register';
import toast from 'react-hot-toast';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

const validationSchema = yup.object({
  inviteCode: yup
    .string()
    .min(6, 'Please enter a valid invite code')
    .max(6, 'Please enter a valid invite code'),
  account: yup
    .string()
    .trim()
    .min(6, 'The account should have at minimum length of 6')
    .max(50, 'Please enter a valid account')
    .required('Please specify your account'),
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email is required.'),
  password: yup
    .string()
    .required('Please specify your password')
    .min(6, 'The password should have at minimum length of 6'),
});

let lastValues = null;

const Form = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [handleRegister] = useMutation(REGISTER);
  const {
    query: { inviteCode },
  } = useRouter();

  const initialValues = {
    account: '',
    email: '',
    password: '',
    inviteCode: '',
  };

  const onSubmit = async (values) => {
    lastValues = values;
    const { data } = await handleRegister({
      variables: { ...values },
    });
    if (data.register.code === 100) {
      setOpen(true);
    } else {
      toast.error(data.register.message);
    }

    return values;
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });

  useEffect(() => {
    if (inviteCode) {
      formik.setFieldValue('inviteCode', inviteCode);
    }
  }, [inviteCode, formik.setFieldValue]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleOk = useCallback(() => {
    Router.push('/signin');
  }, []);

  const handleRegisterClick = useCallback(async () => {
    if (lastValues) {
      const { data } = await handleRegister({
        variables: {
          ...lastValues,
        },
      });
      if (data.register.code === 100) {
        toast.success('Resend successfully!');
      } else {
        toast.error(data.register.message);
      }
    }
  }, [handleRegister]);

  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          registration success
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Account has not been activated,Please go to ${formik.values.email} mailbox, click the activation link to activate the account!`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOk} color="primary">
            sign in
          </Button>
          <Button onClick={handleRegisterClick} color="primary">
            resend mail
          </Button>
        </DialogActions>
      </Dialog>

      <Box marginBottom={4}>
        <Typography
          sx={{
            textTransform: 'uppercase',
            fontWeight: 'medium',
          }}
          gutterBottom
          color={'text.secondary'}
        >
          Signup
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
          }}
        >
          Create an account
        </Typography>
        <Typography color="text.secondary">
          Fill out the form to get started.
        </Typography>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
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
            <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
              Enter your email
            </Typography>
            <TextField
              label="Email *"
              variant="outlined"
              name={'email'}
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              // @ts-ignore
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
              Enter your password
            </Typography>
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
          <Grid item xs={12}>
            <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
              Enter your invite code
            </Typography>
            <TextField
              // InputLabelProps={{shrink: !!inviteCode}}
              label="Invite code"
              variant="outlined"
              name={'inviteCode'}
              fullWidth
              value={formik.values.inviteCode}
              onChange={formik.handleChange}
              error={
                formik.touched.inviteCode && Boolean(formik.errors.inviteCode)
              }
              // @ts-ignore
              helperText={formik.touched.inviteCode && formik.errors.inviteCode}
            />
          </Grid>
          <Grid item container xs={12}>
            <Box
              display="flex"
              flexDirection={{ xs: 'column', sm: 'row' }}
              alignItems={{ xs: 'stretched', sm: 'center' }}
              justifyContent={'space-between'}
              width={1}
              maxWidth={600}
              margin={'0 auto'}
            >
              <Box marginBottom={{ xs: 1, sm: 0 }}>
                <Typography variant={'subtitle2'}>
                  Already have an account?{' '}
                  <Link
                    component={'a'}
                    color={'primary'}
                    href={'/signin'}
                    underline={'none'}
                  >
                    Sign in
                  </Link>
                  .
                </Typography>
              </Box>
              <Button size={'large'} variant={'contained'} type={'submit'}>
                Sign up
              </Button>
            </Box>
          </Grid>
          <Grid
            item
            container
            xs={12}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Typography
              variant={'subtitle2'}
              color={'text.secondary'}
              align={'center'}
            >
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              By clicking "Sign up" button you agree with our{' '}
              <Link
                component={'a'}
                color={'primary'}
                href={'/company-terms'}
                underline={'none'}
              >
                company terms and conditions.
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Form;
