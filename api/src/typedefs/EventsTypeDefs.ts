import { gql } from "apollo-server";

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
    enum EventStatus {
        Ongoing
        Ended
        Upcoming
        All
        Participatable
    }
    input FetchEventsType {
        status: EventStatus
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
        priceAmount: Int
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
        priceAmount: Int
    }
    type Events {
        eventId: ID!
        title: String!
        description: String
        startDate: String
        endDate: String
        priceAmount: Int
        fees: Int
        imageUrl: String
        slug: String
        lastRegistraionDate: String
        category: EventCategory
        createdAt: String!
        updatedAt: String!
        deletedAt: String
        participations: [Participations!]!
    }
`;

export default typeDefs;
