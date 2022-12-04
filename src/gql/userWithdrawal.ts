import { gql } from '@apollo/client';

export const USER_WITHDRAWAL = gql`
  mutation userWithdrawal(
    $amount: Float!
    $walletPassword: String!
    $account: String!
    $type: Int!
  ) {
    userWithdrawal(
      amount: $amount
      walletPassword: $walletPassword
      account: $account
      type: $type
    ) {
      code
      message
    }
  }
`;
