import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';

import Page from '../components/Page';
import Main from 'layouts/Main';
import { useMutation, useQuery } from '@apollo/client';
import toast from 'react-hot-toast';
import AccordionSummary from '@mui/material/AccordionSummary';
import { ExpandMore } from '@mui/icons-material';
import AccordionDetails from '@mui/material/AccordionDetails';
import moment from 'moment';
import ClipboardJS from 'clipboard';
import { USER_WITHDRAWAL } from '../../../gql/userWithdrawal';
import { USER_WITHDRAWAL_RECORDS } from '../../../gql/userWithdrawalRecords';
import { SEND_SET_WALLET_PASSWORD_EMAIL } from '../../../gql/sendSetWalletPasswordEmail';
import Empty from '../../../components/Empty';
import { PAYMENTS } from '../../../gql/payments';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Image from 'next/image';

const Approval_Status_MAP = {
  0: 'under review',
  1: 'pass',
  2: 'reject',
};

const Approval_Status_Color_MAP = {
  0: 'secondary',
  1: 'primary',
  2: 'error',
};

const validationSchema = yup.object({
  account: yup.number().required('account is required.'),
  amount: yup
    .number()
    .min(1, 'The minimum deposit amount is $1')
    .required('amount is required.'),
  walletPassword: yup
    .string()
    .min(6, 'The wallet password is 6 digits long.')
    .max(6, 'The wallet password is 6 digits long.')
    .required('wallet password is required.'),
});

const Withdrawal = (): JSX.Element => {
  const [handleWithdrawal] = useMutation(USER_WITHDRAWAL);
  const [handleSendSetWalletPassword] = useMutation(
    SEND_SET_WALLET_PASSWORD_EMAIL,
  );
  const { data, refetch } = useQuery(USER_WITHDRAWAL_RECORDS);
  const withdrawalRecords =
    data?.userWithdrawalRecords?.withdrawalRecords || [];
  const { data: paymentsData } = useQuery(PAYMENTS);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const payments = paymentsData?.payments || [];
  const [paymentType, setPaymentType] = useState(1);
  const initialValues = {
    amount: 0,
    walletPassword: '',
    account: '',
  };

  useEffect(() => {
    const pA = payments.filter((payments) => payments.isWithdrawal === 1);
    setPaymentType(pA[0]?.type);
  }, [payments]);

  const onSubmit = async (values) => {
    const {
      data: {
        userWithdrawal: { code, message },
      },
    } = await handleWithdrawal({
      variables: {
        ...values,
        type: paymentType,
      },
    });
    if (code === 100) {
      refetch();
      toast.success(message);
    } else {
      toast.error(message);
    }
    return values;
  };

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit,
  });
  useEffect(() => {
    const clipboard = new ClipboardJS('#copy-button');

    clipboard.on('success', function (e) {
      toast.success('Copy successfully!');

      e.clearSelection();
    });
  }, []);

  const handleSendEmail = useCallback(async () => {
    const {
      data: {
        sendSetWalletPasswordEmail: { code, message },
      },
    } = await handleSendSetWalletPassword();

    if (code === 100) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  }, [handleSendSetWalletPassword]);

  const handlePaymentTypeChange = useCallback(
    (finalPaymentType) => () => {
      setPaymentType(finalPaymentType);
    },
    [],
  );
  const finalPayment = useMemo(() => {
    console.log(payments);
    console.log(paymentType);
    return payments.find((payment) => payment.type === paymentType) || {};
  }, [paymentType, payments]);

  const paymentMap = useMemo(() => {
    const map = {};
    payments.forEach((payment) => (map[payment.type] = payment));
    console.log(map);
    return map;
  }, [payments]);
  return (
    <Main>
      <Page>
        <Box>
          <Typography variant="h6" gutterBottom fontWeight={700}>
            Withdrawal
          </Typography>
          <Typography variant={'subtitle2'} color={'text.secondary'}>
            Please enter the amount you need to withdraw, and we will transfer
            the withdrawal amount to your account!We will charge a 5% handling
            fee!
          </Typography>
          <Box paddingY={4}>
            <Divider />
          </Box>
          <Stack direction="row" spacing={1} flexWrap="wrap" marginBottom={2}>
            {payments.map((payment) => {
              if (payment.isWithdrawal === 0) {
                return null;
              }
              return (
                <Chip
                  onClick={handlePaymentTypeChange(payment.type)}
                  key={payment.id}
                  variant="outlined"
                  sx={{ marginBottom: 1, pl: 1 }}
                  color={paymentType === payment.type ? 'primary' : 'default'}
                  icon={
                    <Image
                      width="20px"
                      height="20px"
                      style={{
                        borderRadius: '100%',
                      }}
                      src={payment.icon}
                    />
                  }
                  label={payment.name}
                ></Chip>
              );
            })}
          </Stack>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography
                  variant={'subtitle2'}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  Enter your account
                </Typography>
                <TextField
                  label="Account *"
                  variant="outlined"
                  name={'account'}
                  fullWidth
                  type="string"
                  value={formik.values.account}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.account && Boolean(formik.errors.account)
                  }
                  // @ts-ignore
                  helperText={formik.touched.account && formik.errors.account}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant={'subtitle2'}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  Enter your withdrawal amount
                </Typography>
                <TextField
                  label="withdrawal amount *"
                  variant="outlined"
                  name={'amount'}
                  fullWidth
                  type="number"
                  value={formik.values.amount}
                  onChange={formik.handleChange}
                  error={formik.touched.amount && Boolean(formik.errors.amount)}
                  // @ts-ignore
                  helperText={formik.touched.amount && formik.errors.amount}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant={'subtitle2'}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
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
                  type="password"
                  value={formik.values.walletPassword}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.walletPassword &&
                    Boolean(formik.errors.walletPassword)
                  }
                  // @ts-ignore
                  helperText={
                    formik.touched.walletPassword &&
                    formik.errors.walletPassword
                  }
                />
              </Grid>
              <Grid item container xs={12}>
                <Box
                  display="flex"
                  flexDirection={{ xs: 'column', sm: 'row' }}
                  alignItems={{ xs: 'stretched', sm: 'center' }}
                  justifyContent={'space-between'}
                  width={1}
                  margin={'0 auto'}
                >
                  <Box marginBottom={{ xs: 1, sm: 0 }}>
                    <Typography variant={'subtitle2'}>
                      Forgot wallet password, please reset,
                      <Button color={'primary'} onClick={handleSendEmail}>
                        Set wallet password
                      </Button>
                    </Typography>
                  </Box>
                  <Button size={'large'} variant={'contained'} type={'submit'}>
                    withdrawal
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
          <Box sx={{ py: 2 }}>
            <Divider />
          </Box>
          <Box>
            <Typography variant="h6" gutterBottom fontWeight={700}>
              Withdrawal record
            </Typography>
          </Box>
          {withdrawalRecords.length === 0 && (
            <Empty text="No withdrawal record" />
          )}
          {withdrawalRecords.map((record) => {
            return (
              <Accordion sx={{ mt: 2 }} key={record.id}>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  key={record.id}
                >
                  <Typography>
                    {moment(Number(record.createdAt)).format(
                      'YYY-MM-DD' + ' HH:mm:ss',
                    )}{' '}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>Withdrawal account:{record.account}</Typography>
                  <Typography>
                    Withdrawal method:{paymentMap[record.type]?.name}
                  </Typography>
                  <Typography>Withdrawal amount:${record.amount}</Typography>
                  <Typography>
                    Approval Status:
                    <Typography
                      color={Approval_Status_Color_MAP[record.status]}
                      component={'span'}
                      variant={'inherit'}
                    >
                      {Approval_Status_MAP[record.status]}
                    </Typography>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Box>
      </Page>
    </Main>
  );
};

export default Withdrawal;
