import { gql }  from 'apollo-server'

const typeDefs = gql`
    extend type Query {
        events: [Event!]!
    }
    extend type Mutation {
        addEvent(data: AddEventType!): Event!
        editEvent(eventId: ID!, data: EditEventType!): Event!
        deleteEvent(eventId: ID!): Event!
    }
    input EditEventType {
        title: String
        categoryId: String
        description: String
        startDate: String
        endDate: String
        lastRegistraionDate: String
        fees: Int
        image: Upload
    }
    input AddEventType {
        title: String!
        categoryId: String!
        description: String
        startDate: String!
        endDate: String!
        lastRegistraionDate: String!
        fees: Int
        image: Upload
    }
    type Event {
        eventId: ID!
        title: String!
        description: String
        startDate: String
        endDate: String
        fees: Int
        imageUrl: String
        slug: String
        category: EventCategory
        createdAt: String!
        updatedAt: String!
        deletedAt: String
    }
`

export default typeDefs