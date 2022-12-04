import {gql} from '@apollo/client';

export const CREATE_ORDER = gql`
    mutation createOrder($zoneId:Int!){
        createOrder(zoneId:$zoneId){
            code,
            message,
        }
    }
`;
