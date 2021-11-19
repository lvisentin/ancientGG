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
  }
`;


export const GET_BOX_BY_ID = gql`
  query getBoxById($id: ID){
    box(id: $id){
      id
      iconUrl
      name
      cost
      marketId
      slug
    }
  }
`;

export const OPEN_BOX_MUTATION = gql`
  mutation OpenBox($input: OpenBoxInput!) {
    openBox(input: $input) {
      boxOpenings {
        id
        itemVariant {
          id
          name
          iconUrl
          value
        }
      }
    }
  }
`;
