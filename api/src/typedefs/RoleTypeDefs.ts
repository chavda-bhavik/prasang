import { gql }  from 'apollo-server'

const RoleTypeDefs = gql`
    extend type Query {
        roles: [Roles!]!
    }
    extend type Mutation {
        addRole(data:AddRoleType!): Roles!
    }
    input AddRoleType {
        name:String!
    }
    type Roles {
        roleId:ID!
        name:String!
    }
`

export default RoleTypeDefs