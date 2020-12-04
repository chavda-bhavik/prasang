import { gql }  from 'apollo-server'

const typeDefs = gql`
    extend type Query {
        photos: [Photos!]!
    }
    extend type Mutation {
        addPhoto(eventId: ID!, image: Upload!): Photos
        likePhoto(photoId: ID!): Int!
    }
    type Photos {
        photoId: ID!
        imageUrl: String!
        likes: Int!
        isLiked: Boolean!
        comments: [Comments!]!
        user: Users!
        createdAt: String!
        updatedAt: String!
        deletedAt: String
    }
`

export default typeDefs