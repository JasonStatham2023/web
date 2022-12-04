import {gql} from '@apollo/client';


export const LOGIN = gql`
    query login($account:String!,$password:String!){
        login(account:$account,password:$password){
            code,
            body{
                token
            },
            message,
        }
    }
`;
