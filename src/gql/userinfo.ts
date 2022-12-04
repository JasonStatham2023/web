import {gql} from '@apollo/client';

export const USERINFO = gql`
    query userinfo{
        userinfo{
            id,
            account,
            email,
            balance,
            accountFrozen,
            withdrawalAmount,
            gold,
        }
    }
`;
