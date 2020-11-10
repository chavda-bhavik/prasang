import * as express from "express"
import { graphqlHTTP } from "express-graphql"
import { makeExecutableSchema } from '@graphql-tools/schema'

import typeDefs from './typedefs/index'
import resolvers from './resolvers/index'

// require('./models/_index');
import "./models/_index";

const app = express();
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

app.use('/graphql', (req,res) => {
    return graphqlHTTP({
      schema,
      graphiql: true,
      context: { req, res }
    })(req, res)
});

app.listen(3000,()=>{
    console.log("Server is running on 3000")
})