const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLString } = require('graphql');
const axios = require('axios');

const app = express();

const characterType = new GraphQLObjectType({
  name: 'Character',
  fields: {
    name: { type: GraphQLString },
    species: { type: GraphQLString },
  },
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    characters: {
      type: new GraphQLList(characterType),
      resolve: async () => {
        try {
          const response = await axios.get('https://rickandmortyapi.com/api/character/');
          return response.data.results;
        } catch (error) {
          console.error('Error fetching data:', error);
          return [];
        }
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: queryType,
});

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
