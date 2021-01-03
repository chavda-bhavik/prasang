import { gql } from "apollo-server";

const EventCategoriesTypeDef = gql`
  extend type Query {
    eventCategories: [EventCategory!]!
    eventCategory(categoryId: ID!): EventCategory!
  }
  extend type Mutation {
    addEventCategory(
      name: String!
      description: String
      image: Upload!
    ): EventCategory!
    editEventCategory(
      categoryId: ID!
      name: String
      image: Upload
    ): EventCategory!
    deleteEventCategory(categoryId: ID!): EventCategory!
  }
  type EventCategory {
    categoryId: ID!
    name: String!
    imagePath: String!
    description: String
    createdAt: String!
    updatedAt: String!
    deletedAt: String
    events: [Events!]!
  }
`;

export default EventCategoriesTypeDef;
