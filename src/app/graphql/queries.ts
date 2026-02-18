import { gql } from "@apollo/client";

export const GET_ALL_GALLERY_DATA = gql`
  query GetAllGalleryData {
    # Fetch Charcoal items
    charcoalAndPastels {
      id
      title
      description
      price
      number
      image {
        url
      }
      __typename
    }
    # Fetch Soft Pastel items (using 'number' for sorting)
    softPastels(orderBy: number_ASC) {
      id
      title
      description
      price
      number
      image {
        url
      }
      __typename
    }
    # Fetch T-shirts
    tShirts {
      id
      title
      image {
        url
      }
      __typename
    }
    # Fetch Murals (for murals & portrait commissions section)
    murals(orderBy: number_ASC) {
      id
      title
      number
      image {
        url
      }
      __typename
    }
  }
`;

export const GET_MURALS = gql`
  query GetMurals {
    murals(orderBy: number_ASC) {
      id
      title
      number
      image {
        url
      }
    }
  }
`;
