import {gql} from '@apollo/client';

export const STORIES = gql`
    query stories{
        stories{
            id,
            title,
            cover{
                id,
                url,
            }
            unitPrice,
            shareProfit,
            takes,
            award,
            gold,
            introduce,
            createdAt,
            updatedAt,
        }
    }
`;
