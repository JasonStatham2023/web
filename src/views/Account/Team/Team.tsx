import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import Page from '../components/Page';
import Main from 'layouts/Main';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableCell from '@mui/material/TableCell';
import {useQuery} from '@apollo/client';
import {TEAM} from '../../../gql/team';

interface Column {
  id: 'account' | 'earnings';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  {id: 'account', label: 'Account', minWidth: 170},
  {id: 'earnings', label: 'Earnings', minWidth: 100},
];


const Team = (): JSX.Element => {
  const {data} = useQuery(TEAM);
  const team = data?.team || {earnings: 0, earningsRecords: []};
  return (
    <Main>
      <Page>
        <Box>
          <Typography variant="h6" gutterBottom fontWeight={700}>
            The benefits your team generates are: {team.earnings}
          </Typography>
          <Box paddingY={4}>
            <Divider />
          </Box>
          {
            team.earningsRecords.length > 0 && <Box>
              <TableContainer component={Paper}>
                <Paper sx={{width: '100%', overflow: 'hidden'}}>
                  <TableContainer sx={{maxHeight: 440}}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          {columns.map((column) => (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{minWidth: column.minWidth}}
                            >
                              {column.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {team.earningsRecords
                          .map((row) => {
                            return (
                              <TableRow hover role="checkbox" tabIndex={-1} key={row.account}>
                                {columns.map((column) => {
                                  const value = row[column.id];
                                  return (
                                    <TableCell key={column.id} align={column.align}>
                                      {column.format && typeof value === 'number'
                                        ? column.format(value)
                                        : value}
                                    </TableCell>
                                  );
                                })}
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </TableContainer>
            </Box>
          }
        </Box>
      </Page>
    </Main>
  );
};

export default Team;
