const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('../graphql/schema');
const { createFetcher } = require('../utils');

const resolvers = require('../graphql/resolvers');

const yelpFetcher = createFetcher(process.env.YELP_API_KEY);

const app = express();

app.use(express.json());

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: {
    search: async (args) => {
      const res = await yelpFetcher.query(`
        query search($term: String, $location: String!) {
          search(term: $term, location: $location) {
            total
            business {
              id
              name
              is_closed
              phone
              rating
              review_count
              distance
              location {
                formatted_address
              }
            }
          }
        }
      `, args);

      console.log(res.data.data.search);
      return res.data.data.search;
    },
  }, // resolvers
  graphiql: process.env.NODE_ENV !== 'production',
}));

module.exports = app;
