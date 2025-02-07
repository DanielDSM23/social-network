import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers.js";
import { getUser } from "./modules/auth.js";
import db from "./datasources/db.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");

    if (req.method === "OPTIONS") {
      res.statusCode = 204; 
      res.end();
      return;
    }

    const authorization = req.headers.authorization?.split("Bearer ")?.[1];
    const user = authorization ? getUser(authorization) : null;

    return {
      user,
      dataSources: {
        db,
      },
    };
  },
});

console.log(`🚀 Server ready at: ${url}`);
