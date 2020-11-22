import { gql }  from 'apollo-server'

const DemoTypeDef = gql`
    type Query {
        hello: String!,
        world: String!
    }
    type Mutation {
        hello(image: Upload!): String!
    }
`

export default DemoTypeDef