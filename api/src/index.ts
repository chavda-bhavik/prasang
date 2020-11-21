import * as express from "express"
import { ApolloServer, makeExecutableSchema } from "apollo-server-express";
import { merge } from "lodash";
import db from "./models/_index";
import typeDefs from './typedefs/index'
import resolvers from './resolvers/index'
import DemoTypedefs from './typedefs/DemoTypeDefs'
import DemoQueries from './resolvers/demo/Query'
import DemoMutations from './resolvers/demo/Mutation'

const app = express();
// const schema = makeExecutableSchema({
//   typeDefs,
//   resolvers: merge(...resolvers)
// })
const server = new ApolloServer({
  typeDefs,
  resolvers: merge(resolvers),
  // schema,
  // typeDefs: DemoTypedefs,
  // resolvers: merge(
  //   { Query: DemoQueries,
  //   Mutation: DemoMutations }
  // ),
  context({ req, res }) {
      return {
          db,
          request: req,
          response: res
      }
  }
});
server.applyMiddleware({ app });

app.listen({ port: 3000 }, () => {
  console.log("Server is runnuing on PORT 3000");
})