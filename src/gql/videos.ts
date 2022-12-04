import {gql} from '@apollo/client';

export const VIDEOS = gql`
    query videos{
        videos{
            id,
            file{
                id,
                url,
                name,
            }
        }
    }
`;
