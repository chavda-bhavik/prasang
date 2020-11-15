const typeDefs = `
    type Query {
        events: [Event!]!
    }
    type Mutation {
        addEvent(data: AddEventType!): Event
        editEvent(eventId: ID!, data: EditEventType!): Event
        deleteEvent(eventId: ID!): Event
    }
    input EditEventType {
        title: String
        categoryId: String
        description: String
        startDate: String
        endDate: String
        fees: Int
        imageUrl: String
    }
    input AddEventType {
        title: String!
        categoryId: String!
        description: String
        startDate: String!
        endDate: String!
        fees: Int
        imageUrl: String
    }
    type Event {
        eventId: ID!
        title: String!
        description: String!
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