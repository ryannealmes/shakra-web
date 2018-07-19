import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { withRouter } from 'next/router'

const TOKEN = gql`
  query GetAuthenticationToken {
    token @client
  }
`

const withAuthentication = WrappedComponent => {
  return withRouter(
    class extends React.Component {
      render() {
        return (
          <Query query={TOKEN}>
            {props => {
              let data = props.data
              // if (error) return <Error />
              // if (loading || !data) return <Fetching />
              if (data.token) {
                return <WrappedComponent {...this.props} />
              } else {
                this.props.router.push('/login')
                return null
              }
            }}
          </Query>
        )
      }
    }
  )
}

export default hoc => {
  return withAuthentication(hoc)
}
