import { gql }  from 'apollo-server'

const typeDefs = gql`
scalar Upload
    extend type Query {
        events(where: FetchEventsType): [Events!]!
        event(eventId: ID!): Events!
    }
    extend type Mutation {
        addEvent(data: AddEventType!): Events!
        editEvent(eventId: ID!, data: EditEventType!): Events!
        deleteEvent(eventId: ID!): Events!
    }
    input FetchEventsType {
        ongoing: Boolean
        upcoming: Boolean
        all: Boolean
        startDate: String
        endDate: String
        paid: Boolean
        categoryId: ID
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
    type Events {
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
        participations: [Participations!]!
    }
`

export default typeDefs