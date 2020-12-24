import { gql }  from 'apollo-server'
const WinnerTypeDefs = gql`
    extend type Query {
        winners(eventId: ID): [Winner!]!
    }
    extend type Mutation {
        setWinner(photoId: ID!): Winner
    }
    type Winner {
        winnerId:ID!
        winDate:String!
        rank: Int!
        priceAmount:Int!
        participation:Participations
    }
`

export default WinnerTypeDefs