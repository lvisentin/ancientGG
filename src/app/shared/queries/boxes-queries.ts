import { gql } from 'apollo-angular';

export const GET_BOXES = gql`
  query getboxes {
    boxes(free: false, purchasable: true, openable: true) {
      edges {
      node {
        id
        name
        iconUrl
        cost
      }
      }
    }
  }`;
