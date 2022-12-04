import {gql} from '@apollo/client';

export const USER_ZONE_INFO = gql`
    query userZoneInfo($zoneId:Int!){
        userZoneInfo(zoneId:$zoneId){
            todayCompletionNumber,
            freezeNumber,
            allNumber,
        }
    }
`;
