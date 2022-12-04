import {gql} from '@apollo/client';

export const VERIFY_ORDER = gql`
    mutation verifyOrder($zoneId:Int!){
        verifyOrder(zoneId:$zoneId){
            code,
            message,
        }
    }
`;
