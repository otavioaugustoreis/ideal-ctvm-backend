const { ApolloServer, gql } = require('apollo-server');
const fetch = require('node-fetch');

// Mock data
const users = [
  { id: '1', name: 'Alice', assets: [] },
  { id: '2', name: 'Bob', assets: [] },
];

const assets = [
  { symbol: 'AAPL', name: 'Apple Inc.' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.' },
  { symbol: 'MSFT', name: 'Microsoft Corporation' },
  { symbol: 'AMZN', name: 'Amazon.com, Inc.' },
];

// Helper function to get asset quote from API
async function getAssetQuote(symbol) {
  const response = await fetch(
    `https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=${symbol}`,
    { headers: { 'X-API-KEY': 'YOUR_YAHOO_API_KEY_HERE' } }
  );
  const data = await response.json();
  return data.quoteResponse.result[0].regularMarketPrice;
}

// Construct a schema using GraphQL's schema language
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    assets: [Asset!]!
  }

  type Asset {
    symbol: String!
    name: String!
    quote: Float
  }

  type Query {
    users: [User!]!
    assets: [Asset!]!
  }

  type Mutation {
    createUser(name: String!): User!
    addAsset(userId: ID!, assetSymbol: String!): User!
  }
`;

// Provide resolver functions for the schema fields
const resolvers = {
  Query: {
    users: () => users,
    assets: () => assets,
  },

  Mutation: {
    createUser: (_, { name }) => {
      const user = { id: String(users.length + 1), name, assets: [] };
      users.push(user);
      return user;
    },

    addAsset: async (_, { userId, assetSymbol }) => {
      const user = users.find((user) => user.id === userId);
      if (!user) throw new Error('User not found');
      const asset = assets.find((asset) => asset.symbol === assetSymbol);
      if (!asset) throw new Error('Invalid asset symbol');
      user.assets.push({ ...asset, quote: await getAssetQuote(assetSymbol) });
      return user;
    },
  },

  User: {
    assets: (user) => user.assets,
  },

  Asset: {
    quote: (asset) => asset.quote,
  },
};

// Create an ApolloServer instance with the schema and resolvers
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

