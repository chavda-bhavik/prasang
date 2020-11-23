import { gql }  from 'apollo-server'

const DashboardTypeDefs = gql`
    extend type Query {
        OngoingEvent : Int!
        CommingEvent : Int!
        PastEvent : Int!
        CurrentUser : Int!
    }
`

export default DashboardTypeDefs