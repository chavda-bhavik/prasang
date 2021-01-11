import { gql } from "apollo-server";

const typeDefs = gql`
    extend type Query {
        comments(photoId: ID!): [Comments!]
    }
    extend type Mutation {
        addComment(photoId: ID!, text: String!): Comments
    }
    type Comments {
        commentId: ID!
        text: String!
        photo: Photos!
        user: Users!
        createdAt: String!
        updatedAt: String!
        deletedAt: String
    }
`;

export default typeDefs;
