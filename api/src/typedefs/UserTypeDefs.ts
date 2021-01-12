import { gql } from "apollo-server";
const UserTypeDefs = gql`
    extend type Query {
        users(userId: ID): [Users!]!
        myParticipations: [Participations!]
        usersProfile: Users!
    }
    extend type Mutation {
        registerUser(data: RegisterUserType!): Users!
        editProfile(data: EditProfileType!): Users!
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
        role: String!
    }
    input EditProfileType {
        name: String
        email: String
        password: String
        username: String
        contactNo: String
        image: Upload
        bio : String
    }
    input RegisterUserType {
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
        contactNo: String
        IsEnable: Boolean!
        comments: [Comments!]
        participations: [Participations!]
        photos: [Photos!]
        role: Roles
        image: String
        bio: String
        createdAt: String!
        updatedAt: String!
        deletedAt: String
    }
`;

export default UserTypeDefs;
