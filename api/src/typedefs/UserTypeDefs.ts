const UserTypeDefs = `
    type Query {
        users(query:String): [Users!]!
    }
    type Mutation {
        addUser(name: String!,, email: String,password: String,username: String,contactNo: String,roleId: String): Users!
        editUser(userId: ID!, name: String, email: String,password: String,username: String,contactNo: String,roleId: String): Users!
        deleteUser(userId: ID!): Users!
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