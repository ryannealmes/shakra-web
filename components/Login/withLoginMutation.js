import React from 'react'
import { Mutation } from 'react-apollo'
import LOGIN from '../../queries/login'

const withLogin = WrappedComponent => {
  return class extends React.Component {
    render() {
      return (
        <Mutation
          mutation={LOGIN}
          update={(cache, { data }) => {
            cache.writeData({ data: { token: data.login } })
          }}
        >
          {login => {
            // if (error) return <Error />
            // if (loading || !data) return <Fetching />
            return <WrappedComponent {...this.props} login={login} />
          }}
        </Mutation>
      )
    }
  }
}

export default hoc => {
  return withLogin(hoc)
}
