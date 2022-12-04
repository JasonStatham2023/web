import {gql} from '@apollo/client';

export const ACTIVATE_ACCOUNT = gql`
    mutation activateAccount($email:String!,$authCode:String!){
        activateAccount(email:$email,authCode:$authCode){
            code,
            message
        }
    }
`;
