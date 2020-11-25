import { gql }  from 'apollo-server'

const ParticipationTypeDefs = gql`
    extend type Query {
        getParticipations: [Participations!]!
    }
    extend type Mutation {
        participate(eventId:ID!): Participations!
    }
    type Participations {
        participationId: ID!
        user: Users!
        event: Events!
        participationDate: String!
        photoAdded: Boolean!
    }
`

export default ParticipationTypeDefs