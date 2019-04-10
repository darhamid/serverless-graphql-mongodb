/**
 * Import npm module
 */
const { makeExecutableSchema } = require("graphql-tools");
import { resolvers } from "./resolverWithdb";

const typeDefs = `
    type appId { 
        _id:String,
        name: String, 
        email: String,
        created_at: String,
        updated_at: String,
    }
    type Query {
        
        appId(_id:String) : appId

    }
`;

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

export { schema };
