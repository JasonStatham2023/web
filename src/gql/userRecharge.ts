import { gql } from '@apollo/client';

export const USER_RECHARGE = gql`
  mutation userRecharge(
    $transactionHash: String!
    $amount: Float!
    $type: Int!
  ) {
    userRecharge(
      transactionHash: $transactionHash
      amount: $amount
      type: $type
    ) {
      code
      message
    }
  }
`;
