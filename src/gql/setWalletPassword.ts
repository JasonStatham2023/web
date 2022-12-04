import {gql} from '@apollo/client';

export const SET_WALLET_PASSWORD = gql`
    mutation setWalletPassword($authCode: String!, $email: String!, $walletPassword: String!){
        setWalletPassword(walletPassword:$walletPassword,authCode:$authCode,email:$email){
            code,
            message
        }
    }
`;
