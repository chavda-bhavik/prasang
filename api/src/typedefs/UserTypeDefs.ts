import { gql } from "apollo-server";
const UserTypeDefs = gql`
  extend type Query {
    users(userId: ID): [Users!]!
    usersProfile: Users!
  }
  extend type Mutation {
    addUser(data: AddUserType!): Users!
    editUser(data: EditUserType!): Users!
    deleteUser(userId: ID!): Users!
    login(data: LoginUserInput!): AuthPayload!
    enableUser(data: EnableInput!): Users!
    changePassword(data: changePasswordInput!): Users!
    forgotPassword(data: forgotPasswordInput!): Users!
    forgotPasswords(data: forgotPasswordUserInput!): AuthPayload!
  }
  input EnableInput {
    userId: ID!
    IsEnable: Boolean!
  }
  input changePasswordInput {
    oldPassword: String!
    password: String!
  }
  input forgotPasswordInput {
    email: String!
    password: String!
  }
  input forgotPasswordUserInput {
    email: String!
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
    name: String
    password: String
    username: String
    contactNo: String
    image: Upload
  }
  input AddUserType {
    name: String!
    email: String!
    password: String!
    username: String!
  }
  type Users {
    userId: ID!
    name: String!
    email: String!
    username: String!
    bio: String
    contactNo: String
    IsEnable: Boolean
    role: Roles
    image: String
    photos: [Photos!]
    participations: [Participations!]
    comments: [Comments!]
    createdAt: String!
    updatedAt: String!
    deletedAt: String
  }
`;

export default UserTypeDefs;
