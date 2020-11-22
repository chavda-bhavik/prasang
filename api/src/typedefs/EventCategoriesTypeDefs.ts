import { gql }  from 'apollo-server'

const EventCategoriesTypeDef = gql`
    extend type Query {
        eventCategories: [EventCategory!]!
    }
    extend type Mutation {
        addEventCategory(name: String!, image: Upload!): EventCategory!
        editEventCategory(categoryId: ID!, name: String, image: Upload): EventCategory!
        deleteEventCategory(categoryId: ID!): EventCategory!
    }
    type EventCategory {
        categoryId: ID!
        name: String!
        imagePath: String!
        createdAt: String!
        updatedAt: String!
        deletedAt: String
    }
`

export default EventCategoriesTypeDef