import { ApolloClient } from 'apollo-boost'
import { InMemoryCache } from 'apollo-boost'
import fetch from 'isomorphic-unfetch'
import { setContext } from 'apollo-link-context'
import { createHttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'
import withClientState from './withClientState'

let apolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch
}

const contextLink = setContext(() => {
  // request, previousContext
  return {
    headers: {
      authorization:
        'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNqaXhlaHU5cDAwMG8wOTg2cGs0bmtxZDMiLCJpYXQiOjE1MzAxMjA5MzF9.U9y0O6PjQLnpxm2ATrTyOaZMi0kfyP-WFqFqZUDeQhixun-cbHazvtc17AuQyZDG3jGm_BuVRgV8Pz8xFtjf2lO4ozi82KFhkbsSK1oQJd7InELkr6w20f8QhEu8qqwcn--_T38SslEBsdP7v4sHKuwadYGOQuNn-25BMftxu7E'
    }
  }
})

const serviceLink = () =>
  createHttpLink({
    uri: 'http://localhost:3000',
    credentials: 'same-origin',
    fetch
  })

function create(initialState) {
  const cache = new InMemoryCache().restore(initialState || {})

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: ApolloLink.from([withClientState(cache), contextLink, serviceLink()]),
    cache
  })
}

export default function initApollo(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState)
  }

  return apolloClient
}
