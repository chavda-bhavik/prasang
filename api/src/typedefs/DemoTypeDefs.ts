import { gql }  from 'apollo-server'

const DemoTypeDef = gql`
    type Query {
        hello: String!,
        world: String!
    }
    type Mutation {
        hello: String!
    }
`

export default DemoTypeDef