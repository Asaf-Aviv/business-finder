const express = require('express');
const axios = require('axios');
const graphqlHTTP = require('express-graphql');
const schema = require('../graphql/schema');

// const resolvers = require('../graphql/resolvers')

const createFetcher = (apiKey) => {
  const instance = axios.create({
    method: 'POST',
    url: 'https://api.yelp.com/v3/graphql',
    headers: { Authorization: `Bearer ${apiKey}` },
  });

  instance.query = (queryString, variables) => instance({
    data: {
      query: queryString,
      variables,
    },
  });

  return instance;
};

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
