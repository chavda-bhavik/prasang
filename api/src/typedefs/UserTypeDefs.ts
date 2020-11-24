import { gql }  from 'apollo-server'
const UserTypeDefs = gql`
    extend type Query {
        users(userId: ID): [Users!]!
        usersOne: Users!
    }
    extend type Mutation {
        addUser(data:AddUserType!): Users!
        editUser(data:EditUserType!): Users!
        deleteUser(userId: ID!): Users!
        login(data: LoginUserInput!): AuthPayload!
        enableUser(data:EnableInput!): Users!
        changePassword(data:changePasswordInput!): Users!
        forgotPassword(data:forgotPasswordInput!): Users!
    }
    input EnableInput {
        userId: ID!
        IsEnable:Boolean!
    }
    input changePasswordInput {
        oldPassword:String!
        password:String!
    }
    input forgotPasswordInput {
        email:String!
        password:String!
    }
    type AuthPayload {
        token: String!
        user: Users!
    }
    input LoginUserInput {
        email: String!
        password: String!
    }
    input EditUserType {
        name:String!
        email:String!
        password:String!
        username:String!
        contactNo:String!
        IsEnable:Boolean
        roleId:ID!
    }
    input AddUserType {
        name:String!
        email:String!
        password:String!
        username:String!
        contactNo:String!
        IsEnable:Boolean
        roleId:ID!
    }
    type Users {
        userId:ID!
        name:String!
        email:String!
        password:String!
        username:String!
        contactNo:String!
        IsEnable:Boolean!
        role:Roles
        createdAt: String!
        updatedAt: String!
        deletedAt: String
    }
`

export default UserTypeDefs