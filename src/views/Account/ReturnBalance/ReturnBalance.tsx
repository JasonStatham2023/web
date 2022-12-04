import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';

import Page from '../components/Page';
import Main from 'layouts/Main';
import {useMutation, useQuery} from '@apollo/client';
import AccordionSummary from '@mui/material/AccordionSummary';
import {ExpandMore} from '@mui/icons-material';
import AccordionDetails from '@mui/material/AccordionDetails';
import Empty from '../../../components/Empty';
import {FROZEN_RECORDS} from '../../../gql/frozenRecord';
import List from '@mui/material/List';
import {ListItem} from '@mui/material';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import {THAW} from '../../../gql/thaw';
import toast from 'react-hot-toast';
import {formatTimestamp} from '../../../utils/formatTimestamp';


const ReturnBalance = (): JSX.Element => {

  const [handleThaw] = useMutation(THAW);
  const {data, refetch} = useQuery(FROZEN_RECORDS);
  const frozenRecords = data?.frozenRecords || [];
  const handleThawClick = (frozenRecordId) => () => {
    handleThaw({
      variables: {
        frozenRecordId,
      }
    }).then(({data}) => {
      if (data.thaw.code === 100) {
        toast.success(data.thaw.message);
        refetch();
      } else {
        toast.error(data.thaw.message);
      }
    });
  };
  return (
    <Main>
      <Page>
        <Box>
          <Box>
            <Typography variant="h6" gutterBottom fontWeight={700}>
              Return the balance record
            </Typography>
          </Box>
          {
            frozenRecords.length === 0 && <Empty text="No recharge record" />
          }
          {
            frozenRecords.map((frozenRecord) => {
              return <>
                <Accordion sx={{mt: 2}} key={frozenRecord.id}>
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    key={frozenRecord.id}
                  >
                    <Typography>{formatTimestamp(Number(frozenRecord.createdAt))}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List>
                      {
                        frozenRecord?.orderRecords.map(({id, zone, amount}: any) => {
                          return <>
                            <Divider component="li" key={id} />
                            <ListItem alignItems="flex-start">
                              <ListItemText
                                primary={zone.title}
                                secondary={
                                  <React.Fragment>
                                    <Typography
                                      sx={{display: 'inline'}}
                                      component="span"
                                      variant="body2"
                                      color="text.primary"
                                    >
                                      amount:${amount}
                                    </Typography>
                                  </React.Fragment>
                                }
                              />
                            </ListItem>
                          </>;
                        })
                      }

                    </List>
                  </AccordionDetails>
                </Accordion>
                {
                  frozenRecord.status !== 1 &&
                  (
                    <Box display="flex" justifyContent="flex-end" sx={{py: 2}}>
                      <Button variant="outlined" size="small"
                        disabled={frozenRecord.status === 1}
                        onClick={handleThawClick(frozenRecord.id)}>
                        {frozenRecord.status !== 1 ? 'receive' : 'received'}
                      </Button>
                    </Box>
                  )
                }

              </>;
            })
          }

        </Box>
      </Page>
    </Main>
  );
};

export default ReturnBalance;
