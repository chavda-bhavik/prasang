import { gql } from "apollo-server";

const typeDefs = gql`
    extend type Query {
        feed(limit: Int): [Photos!]
        photos(options: fetchPhotosType): photosReturnType!
        photo(photoId: ID!): Photos!
        myPhotos: [Photos!]
    }
    extend type Mutation {
        addPhoto(eventId: ID!, image: Upload!): Photos
        likePhoto(photoId: ID!): Int!
    }
    input fetchPhotosType {
        eventId: ID
        likesPlus: Int
        commentsPlus: Int
        offset: Int
        limit: Int
    }
    input range {
        start: Int!
        end: Int!
    }
    type photosReturnType {
        photos: [Photos!]!
        total: Int!
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
