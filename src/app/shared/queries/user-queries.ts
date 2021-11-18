import { gql } from 'apollo-angular';

export const GET_USER = gql`
  query currentUser {
    currentUser {
    id
    name
    avatar
      wallets {
        id
        amount
        currency
      }
    }
  }
`;
