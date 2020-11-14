const DemoTypeDef = `
    type Query {
        eventCategories: [EventCategory!]!
    }
    type Mutation {
        addEventCategory(name: String!, imagePath: String!): EventCategory!
        editEventCategory(categoryId: ID!, name: String, imagePath: String): EventCategory!
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

export default DemoTypeDef