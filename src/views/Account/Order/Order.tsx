import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import Page from '../components/Page';
import Main from 'layouts/Main';
import {useQuery} from '@apollo/client';
import {ORDER_RECORDS} from '../../../gql/orderRecords';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import moment from 'moment';
import {formatTimestamp} from '../../../utils/formatTimestamp';


const Order = (): JSX.Element => {

  const {data} = useQuery(ORDER_RECORDS);
  const orderRecords = data?.orderRecords || [];

  return (
    <Main>
      <Page>
        <Box>
          <Typography variant="h6" gutterBottom fontWeight={700}>
            Order record
          </Typography>
          <Box paddingY={2}>
            <Divider />
          </Box>
        </Box>
        <List sx={{width: '100%', bgcolor: 'background.paper'}}>
          {
            orderRecords.map((record) => {
              return <>
                <ListItem alignItems="flex-start" sx={{px: 0}} id={record.id}
                  secondaryAction={
                    formatTimestamp(Number(record.createdAt))
                  }
                >
                  <ListItemText
                    primary={record.zone.title}
                    secondary={
                      <React.Fragment>
                        {record.status === 1 && 'has won'}
                        <br />
                        收益：
                        <Typography
                          sx={{display: 'inline'}}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          ${record.earnings}
                        </Typography>
                      </React.Fragment>
                    }

                  />
                </ListItem>
                <Divider component="li" />
              </>;
            })
          }
        </List>
      </Page>
    </Main>
  );
};

export default Order;
