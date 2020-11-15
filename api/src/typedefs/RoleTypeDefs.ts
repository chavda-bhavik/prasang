const RoleTypeDefs = `
    type Query {
        roles: [Roles!]!
    }
    type Mutation {
        addRole(name: String!): Roles!
    }
    type Roles {
        roleId:ID!
        name:String!
    }
`

export default RoleTypeDefs