import {gql} from '@apollo/client';

export const ORDER_RECORDS = gql`
    query orderRecords{
        orderRecords{
            id,
            earnings,
            status,
            createdAt,
            zone{
                title
            }
        }
    }
`;
