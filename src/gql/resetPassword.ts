import {gql} from '@apollo/client';

export const RESET_PASSWORD = gql`
    mutation resetPassword($authCode: String!, $email: String!, $password: String!){
        resetPassword(password:$password,authCode:$authCode,email:$email){
            code,
            message
        }
    }
`;
