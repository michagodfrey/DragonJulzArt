import { gql } from "@apollo/client";

// Test query to see what's available
export const TEST_QUERY = gql`
  query TestQuery {
    __schema {
      types {
        name
        kind
      }
    }
  }
`;

// Test query to get Gallery fields
export const GALLERY_FIELDS_QUERY = gql`
  query GalleryFields {
    __type(name: "Gallery") {
      name
      fields {
        name
        type {
          name
          kind
        }
      }
    }
  }
`;

// Simple test query for Gallery
export const SIMPLE_GALLERY_TEST = gql`
  query SimpleGalleryTest {
    galleries {
      id
      title
    }
  }
`;

export const GET_GALLERY_ITEMS = gql`
  query GetGalleryItems {
    galleries {
      id
      title
      description
      price
      available
      datePainted
      slug
      image {
        url
      }
    }
  }
`;

export const GET_GALLERY_ITEM_BY_SLUG = gql`
  query GetGalleryItemBySlug($slug: String!) {
    gallery(where: { slug: $slug }) {
      id
      title
      description
      price
      available
      datePainted
      slug
      image {
        url
      }
    }
  }
`;
