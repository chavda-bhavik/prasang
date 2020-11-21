const WinnerTypeDefs = `
    type Query {
        winners: [Winner!]!
    }
    type Mutation {
        addWinner(winDate: Date!, winDate: Date,priceAmount: Number,userId: String,eventId: String): Winner!
    }
    type Winner {
        winnerId:ID!
        winDate:Date!
        priceAmount:Number!
        userId:ID!
        eventId:ID!
    }
`

export default WinnerTypeDefs