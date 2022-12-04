import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Accordion from '@mui/material/Accordion';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import Page from '../components/Page';
import Main from 'layouts/Main';
import { useMutation, useQuery } from '@apollo/client';
import { USER_RECHARGE } from '../../../gql/userRecharge';
import toast from 'react-hot-toast';
import { USER_RECHARGE_RECORDS } from '../../../gql/userRechargeRecords';
import AccordionSummary from '@mui/material/AccordionSummary';
import { ExpandMore } from '@mui/icons-material';
import AccordionDetails from '@mui/material/AccordionDetails';
import ClipboardJS from 'clipboard';
import Empty from '../../../components/Empty';
import { formatTimestamp } from '../../../utils/formatTimestamp';
import { PAYMENTS } from '../../../gql/payments';
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
  transactionHash: yup.string().trim().required('Please fill in this content'),
  amount: yup
    .number()
    .min(1, 'The minimum deposit amount is $1')
    .required('amount is required.'),
});

const Recharge = (): JSX.Element => {
  const [handleRecharge] = useMutation(USER_RECHARGE);
  const { data, refetch } = useQuery(USER_RECHARGE_RECORDS);
  const { data: paymentsData } = useQuery(PAYMENTS);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const payments = paymentsData?.payments || [];
  const [paymentType, setPaymentType] = useState(1);
  const rechargeRecords = data?.userRechargeRecords?.rechargeRecords || [];
  const walletAddress = data?.userRechargeRecords?.walletAddress || '';
  const initialValues = {
    transactionHash: '',
    amount: 0,
  };

  useEffect(() => {
    const pA = payments.filter((payments) => payments.isRecharge === 1);
    setPaymentType(pA[0]?.type);
  }, [payments]);

  const onSubmit = async (values) => {
    const {
      data: {
        userRecharge: { code, message },
      },
    } = await handleRecharge({
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
            recharge
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" marginBottom={2}>
            {payments.map((payment) => {
              if (payment.isRecharge === 0) {
                return null;
              }
              return (
                <Chip
                  onClick={handlePaymentTypeChange(payment.type)}
                  key={payment.id}
                  variant="outlined"
                  sx={{ marginBottom: 1, p: 1 }}
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
          <Typography variant={'subtitle2'} color={'text.secondary'}>
            Recharge Account{' '}
            <Link color={'primary'} underline={'none'}>
              {finalPayment.account}
            </Link>{' '}
            <Button
              id="copy-button"
              size={'small'}
              data-clipboard-text={finalPayment.account}
            >
              Copy
            </Button>
          </Typography>
          <Box paddingY={4}>
            <Divider />
          </Box>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant={'subtitle2'}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  {finalPayment.tips}
                </Typography>
                <TextField
                  label={finalPayment.placeholder}
                  variant="outlined"
                  name={'transactionHash'}
                  fullWidth
                  value={formik.values.transactionHash}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.transactionHash &&
                    Boolean(formik.errors.transactionHash)
                  }
                  // @ts-ignore
                  helperText={
                    formik.touched.transactionHash &&
                    formik.errors.transactionHash
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant={'subtitle2'}
                  sx={{ marginBottom: 2 }}
                  fontWeight={700}
                >
                  Enter your recharge amount
                </Typography>
                <TextField
                  label="recharge amount *"
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
              <Grid item container xs={12}>
                <Box
                  display="flex"
                  flexDirection={{ xs: 'column', sm: 'row' }}
                  alignItems={{ xs: 'stretched', sm: 'center' }}
                  justifyContent={'space-between'}
                  width={1}
                  margin={'0 auto'}
                >
                  <Box marginBottom={{ xs: 1, sm: 0 }}></Box>
                  <Button size={'large'} variant={'contained'} type={'submit'}>
                    recharge
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
              Recharge record
            </Typography>
          </Box>
          {rechargeRecords.length === 0 && <Empty text="No recharge record" />}
          {rechargeRecords.map((record) => {
            return (
              <Accordion sx={{ mt: 2 }} key={record.id}>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  key={record.id}
                >
                  <Typography>
                    {formatTimestamp(Number(record.createdAt))}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>Recharge amount:${record.amount}</Typography>
                  <Typography>
                    Payment method:{paymentMap[record.type]?.name}
                  </Typography>
                  <Typography>
                    {paymentMap[record.type]?.placeholder}:
                    {record.transactionHash}
                  </Typography>
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

export default Recharge;
