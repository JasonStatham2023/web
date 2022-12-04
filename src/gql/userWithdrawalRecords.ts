import { gql } from '@apollo/client';

export const USER_WITHDRAWAL_RECORDS = gql`
  query userWithdrawalRecords {
    userWithdrawalRecords {
      walletAddress
      withdrawalRecords {
        id
        type
        account
        amount
        status
        failureReasons
        createdAt
        updatedAt
      }
    }
  }
`;
