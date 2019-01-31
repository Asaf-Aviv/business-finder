const axios = require('axios');

exports.createFetcher = (apiKey) => {
  const instance = axios.create({
    method: 'POST',
    url: process.env.YELP_GRAPHQL_URL,
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
