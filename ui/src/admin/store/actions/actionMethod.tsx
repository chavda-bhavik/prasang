import { gql } from "@apollo/client";

//  EVENT

export const FetchEvent = gql`
    query {
        events {
            description
            endDate
            fees
            imageUrl
            startDate
            title
            eventId
            priceAmount
            lastRegistraionDate
        }
    }
`;

export const Login_Admin = gql`
    mutation login($email: String!, $password: String!) {
        login(data: { email: $email, password: $password }) {
            token
            user {
                userId
                name
                email
                username
            }
        }
    }
`;

export const ADD_Event = gql`
    mutation addEvent(
        $title: String!
        $categoryId: String!
        $startDate: String!
        $endDate: String!
        $lastRegistraionDate: String!
        $description: String
        $fees: Int
        $priceAmount: Int
        $image: Upload
    ) {
        addEvent(
            data: {
                title: $title
                categoryId: $categoryId
                startDate: $startDate
                endDate: $endDate
                lastRegistraionDate: $lastRegistraionDate
                description: $description
                fees: $fees
                priceAmount: $priceAmount
                image: $image
            }
        ) {
            description
            endDate
            fees
            imageUrl
            startDate
            title
            priceAmount
            category {
                categoryId
            }
        }
    }
`;

export const Edit_Event = gql`
    mutation editEvent(
        $eventId: ID!
        $title: String!
        $categoryId: String!
        $startDate: String!
        $endDate: String!
        $lastRegistraionDate: String!
        $description: String
        $fees: Int
        $priceAmount: Int
        $image: Upload
    ) {
        editEvent(
            eventId: $eventId
            data: {
                title: $title
                categoryId: $categoryId
                startDate: $startDate
                endDate: $endDate
                lastRegistraionDate: $lastRegistraionDate
                description: $description
                fees: $fees
                priceAmount: $priceAmount
                image: $image
            }
        ) {
            description
            endDate
            fees
            imageUrl
            startDate
            title
            priceAmount
            eventId
            lastRegistraionDate
        }
    }
`;
export const SINGLE_Event = gql`
    query event($eventId: ID!) {
        event(eventId: $eventId) {
            description
            endDate
            fees
            imageUrl
            startDate
            title
            priceAmount
            eventId
            lastRegistraionDate
            category {
                categoryId
            }
        }
    }
`;

export const DELETE_event = gql`
    mutation deleteEvent($eventId: ID!) {
        deleteEvent(eventId: $eventId) {
            eventId
            description
            endDate
            fees
            imageUrl
            startDate
        }
    }
`;

//  CATEGORY

export const FetchCategory = gql`
    query {
        eventCategories {
            categoryId
            name
            imagePath
        }
    }
`;

export const ADD_Category = gql`
    mutation addEventCategory($name: String!, $image: Upload!) {
        addEventCategory(name: $name, image: $image) {
            categoryId
            name
            imagePath
        }
    }
`;

export const Edit_Category = gql`
    mutation editEventCategory(
        $categoryId: ID!
        $name: String
        $image: Upload
    ) {
        editEventCategory(categoryId: $categoryId, name: $name, image: $image) {
            imagePath
            name
            categoryId
        }
    }
`;

export const DELETE_Category = gql`
    mutation deleteEventCategory($categoryId: ID!) {
        deleteEventCategory(categoryId: $categoryId) {
            categoryId
            name
            imagePath
        }
    }
`;

export const SINGLE_Category = gql`
    query eventCategory($categoryId: ID!) {
        eventCategory(categoryId: $categoryId) {
            name
            categoryId
            imagePath
        }
    }
`;

// USER

export const FetchUser = gql`
    query {
        users {
            username
            userId
            name
            email
            IsEnable
            createdAt
        }
    }
`;

export const Enable_Disable_USER = gql`
    mutation enableUser($userId: ID!, $IsEnable: Boolean!) {
        enableUser(data: { userId: $userId, IsEnable: $IsEnable }) {
            username
            userId
            name
            email
            IsEnable
            createdAt
        }
    }
`;

export const Change_Password = gql`
    mutation changePassword($oldPassword: String!, $password: String!) {
        changePassword(
            data: { oldPassword: $oldPassword, password: $password }
        ) {
            name
            email
        }
    }
`;

export const FORGOT_PASSWORD = gql`
    mutation forgotPasswords($email: String!) {
        forgotPasswords(data: { email: $email }) {
            token
            user {
                username
                userId
                name
                email
                IsEnable
            }
        }
    }
`;
export const FORGOT_PASSWORDS = gql`
    mutation forgotPassword($email: String!, $password: String!) {
        forgotPassword(data: { email: $email, password: $password }) {
            username
            userId
            name
            email
            IsEnable
        }
    }
`;

export const userProfile = gql`
    query {
        usersProfile {
            username
            userId
            name
            email
            IsEnable
            createdAt
        }
    }
`;

export const Event_Category = gql`
    query event($eventId: ID!) {
        event(eventId: $eventId) {
            description
            endDate
            fees
            imageUrl
            startDate
            title
            eventId
            lastRegistraionDate
        }
    }
    query {
        eventCategories {
            categoryId
            name
            imagePath
        }
    }
`;

// Dashboard

export const adminDashboard = gql`
    query {
        Dashboard {
            ongoingEvent
            commingEvent
            pastEvent
            currentUser
        }
    }
`;
