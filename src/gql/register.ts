import { gql } from '@apollo/client';

export const REGISTER = gql`
  mutation register(
    $account: String!
    $password: String!
    $email: String!
    $inviteCode: String
  ) {
    register(
      account: $account
      password: $password
      email: $email
      inviteCode: $inviteCode
    ) {
      code
      message
    }
  }
`;
