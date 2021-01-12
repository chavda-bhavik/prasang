import { gql } from "apollo-server";

const typeDefs = gql`
    extend type Query {
        feed(limit: Int): [Photos!]
        photos(options: fetchPhotosType): [Photos!]!
        photo(photoId: ID!): Photos!
        myPhotos:[Photos!]
    }
    extend type Mutation {
        addPhoto(eventId: ID!, image: Upload!): Photos
        likePhoto(photoId: ID!): Int!
    }
    input fetchPhotosType {
        eventId: ID
        likesRange: range
        commantsRange: range
    }
    input range {
        start: Int!
        end: Int!
    }
    type Photos {
        photoId: ID!
        imageUrl: String!
        likes: Int!
        isLiked: Boolean!
        winner: Boolean!
        comments: [Comments!]!
        user: Users!
        participant: Participations!
        createdAt: String!
        updatedAt: String!
        deletedAt: String
    }
`;

export default typeDefs;
