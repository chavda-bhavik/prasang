import { gql }  from 'apollo-server'

const ParticipationTypeDefs = gql`
    extend type Query {
        participations(eventId: ID, photoAdded: Boolean): [Participations!]!
        user_participations(photoId: ID): [Participations!]
    }
    extend type Mutation {
        participate(eventId:ID!): Participations!
        participateCheck(eventId:ID!): Participations
    }
    type Participations {
        participationId: ID!
        user: Users!
        event: Events!
        photo: Photos
        participationDate: String!
        photoAdded: Boolean!
    }
`

export default ParticipationTypeDefs