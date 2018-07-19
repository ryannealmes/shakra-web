import { withClientState } from 'apollo-link-state'
import gql from 'graphql-tag'

const typeDefs = `
  type Mutation {
    token(text: String!): String
    clearToken: Boolean
  }
  type Query {
    token: String
  }
`

const defaults = {
  token: null
}

const resolvers = {
  Mutation: {
    token: (_, { token }, { cache }) => {
      cache.writeData({ data: { token } })
      return token
    },
    clearToken: (_, __, { cache }) => {
      cache.writeData({ data: { token: null } })
      return true
    }
  },
  Query: {
    token: (_, ___, { cache }) => {
      const query = gql`
        query GetToken {
          token @client
        }
      `
      const result = cache.readQuery({ query })
      return result.token
    }
  }
}

export default cache => {
  return withClientState({ resolvers, defaults, cache, typeDefs })
}
