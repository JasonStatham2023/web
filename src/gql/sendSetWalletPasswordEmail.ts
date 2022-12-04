import {gql} from '@apollo/client';

export const SEND_SET_WALLET_PASSWORD_EMAIL = gql`
    mutation sendSetWalletPasswordEmail{
        sendSetWalletPasswordEmail{
            code,
            message
        }
    }
`;
