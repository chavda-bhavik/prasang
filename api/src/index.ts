import * as express from "express"
import { ApolloServer } from "apollo-server-express";
import { merge } from "lodash";
import db from "./models/_index";
import typeDefs from './typedefs/index'
import resolvers from './resolvers/index'

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers: merge(resolvers),
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