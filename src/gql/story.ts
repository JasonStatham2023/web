import {gql} from '@apollo/client';

export const STORY = gql`
    query story($id:Int!){
        story(id:$id){
            id,
            title,
            cover{
                id,
                url,
            }
            unitPrice,
            shareProfit,
            takes,
            award,
            gold,
            introduce,
            createdAt,
            updatedAt,
        }
    }
`;
