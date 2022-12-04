import {gql} from '@apollo/client';

export const FROZEN_RECORDS = gql`
    query frozenRecords{
        frozenRecords{
            id,
            status,
            createdAt,
            orderRecords{
                id,
                amount,
                createdAt,
                zone{
                    id,
                    title
                }
            }
        }
    }
`;
