import { gql } from '@apollo/client';

export const PAYMENTS = gql`
  query payments {
    payments {
      account
      icon
      id
      placeholder
      isRecharge
      isWithdrawal
      name
      tips
      type
    }
  }
`;
