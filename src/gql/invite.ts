import {gql} from '@apollo/client';

export const INVITE = gql`
    query invite{
        invite{
            url,
            code,
        }
    }
`;
