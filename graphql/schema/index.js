const { buildSchema } = require('graphql');
const fs = require('fs');

const typeDef = fs.readFileSync(
  'graphql/schema/schema.gql', 'utf-8',
);

module.exports = buildSchema(typeDef);
