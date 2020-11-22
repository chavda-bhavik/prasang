import { gql }  from 'apollo-server'
const UserTypeDefs = gql`
    extend type Query {
        users(userId: ID): [Users!]!
        usersOne(userId: ID,email:String): Users!
    }
    extend type Mutation {
        addUser(data:AddUserType!): Users!
        editUser(data:EditUserType!): Users!
        deleteUser(userId: ID!): Users!
        login(data:LoginUserType):Users!
    }
    input LoginUserType {
        email:String!
        password:String!
    }
    input EditUserType {
        name:String!
        email:String!
        password:String!
        username:String!
        contactNo:String!
        roleId:ID!
    }
    input AddUserType {
        name:String!
        email:String!
        password:String!
        username:String!
        contactNo:String!
        roleId:ID!
    }
    type Users {
        userId:ID!
        name:String!
        email:String!
        password:String!
        username:String!
        contactNo:String!
        roleId:ID!
    }
`

export default UserTypeDefs