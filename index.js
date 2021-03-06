const {ApolloServer} = require("apollo-server");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({req})
});

mongoose
    .connect(process.env.MONGODB, {
        useNewUrlParser: true
    })
    .then(() => {
        console.log("MongoDB connected");
        return server.listen(5000);
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`);
    });