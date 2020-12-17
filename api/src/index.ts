import * as express from "express"
import { ApolloServer } from "apollo-server-express";
import { merge } from "lodash";
import db from "./models/_index";
import typeDefs from './typedefs/index'
import resolvers from './resolvers/index'
import { applyMiddleware } from "graphql-middleware";
import { makeExecutableSchema } from "graphql-tools";
import { getUser,Permissions } from './Permissions';

const PORT = process.env.PORT || 8080;

const app = express();
const schema = applyMiddleware(
  makeExecutableSchema({
    typeDefs,
    resolvers: merge(resolvers)
  }),
  Permissions
);

const server = new ApolloServer({
  typeDefs,
  resolvers: merge(resolvers),
  schema:schema,
  async context({ req, res }) {
      return {
          db,
          req,
          res,
          user: await getUser(req, db)
      }
  }
});
server.applyMiddleware({ app });

app.listen({ port: PORT }, () => {
  console.log(`Server is runnuing on PORT ${PORT}`);
})