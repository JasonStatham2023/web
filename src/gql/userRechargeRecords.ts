import {gql} from '@apollo/client';

export const USER_RECHARGE_RECORDS = gql`
    query userRechargeRecords{
        userRechargeRecords{
            walletAddress,
            rechargeRecords{
                id,
                type,
                transactionHash,
                amount,
                specialAmount,
                status,
                failureReasons,
                createdAt,
                updatedAt,
            }
        }
    }
`;
