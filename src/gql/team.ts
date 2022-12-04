import {gql} from '@apollo/client';

export const TEAM = gql`
    query team{
        team{
            earnings,
            earningsRecords{
                id,
                account,
                earnings,
            }
        }
    }
`;
