import {gql} from '@apollo/client';

export const SEND_PASSWORD_RESET_EMAIL = gql`
    mutation sendPasswordResetEmail($email:String!){
        sendPasswordResetEmail(email:$email){
            code,
            message
        }
    }
`;
