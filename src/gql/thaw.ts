import {gql} from '@apollo/client';

export const THAW = gql`
    mutation thaw($frozenRecordId:Int!){
        thaw(frozenRecordId:$frozenRecordId){
            code,
            message
        }
    }
`;
