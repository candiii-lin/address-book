const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./src/schema.js');
const cors = require('cors')

let port = 3000;
const app = express();

app.use(cors({
  origin: "http://localhost:8080"
}));

app.use('/', graphqlHTTP({
  schema: schema,
  graphiql: true //set to false if you don't want graphiql enabled
}));

app.listen(port);
console.log('GraphQL API server running at localhost:'+ port);
