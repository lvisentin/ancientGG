import { gql } from 'apollo-angular';

export const ON_UPDATE_WALLET = gql`
  subscription OnUpdateWallet {
    updateWallet {
      wallet {
        id
        amount
        name
      }
    }
  }`;
