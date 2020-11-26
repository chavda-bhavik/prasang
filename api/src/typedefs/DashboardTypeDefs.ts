import { gql }  from 'apollo-server'

export const DashboardTypeDefs = gql`
    extend type Query {
        Dashboard:[DashboardType!]!
    }
    type DashboardType {
        ongoingEvent:Int!
        commingEvent:Int!
        pastEvent:Int!
        currentUser:Int!
    }
`