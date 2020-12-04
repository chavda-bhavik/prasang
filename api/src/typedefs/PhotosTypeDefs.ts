import { gql }  from 'apollo-server'

const typeDefs = gql`
    extend type Query {
        photos: [Photos!]!
    }
    extend type Mutation {
        addPhoto(eventId: ID!, image: Upload!): Photos
    }
    type Photos {
        photoId: ID!
        imageUrl: String!
        likes: Int!
        createdAt: String!
        updatedAt: String!
        deletedAt: String
    }
`

export default typeDefs