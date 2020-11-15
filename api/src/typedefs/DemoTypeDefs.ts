const DemoTypeDef = `
    type Query {
        hello: String!,
        world: String!,
        roles(query: String): [Roles!]!
    }
`

export default DemoTypeDef