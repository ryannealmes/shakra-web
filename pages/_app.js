import withApolloClient from '../lib/withApolloClient'
import { ApolloProvider } from 'react-apollo'
import React from 'react'
import App, { Container } from 'next/app'
import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import JssProvider from 'react-jss/lib/JssProvider'
import getPageContext from '../lib/getPageContext'

class MyApp extends App {
  constructor(props) {
    super(props)
    this.pageContext = getPageContext()
  }

  pageContext = null

  componentDidMount() {
    //   // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }

  render() {
    const { Component, pageProps, apolloClient } = this.props
    return (
      <Container>
        <JssProvider
          registry={this.pageContext.sheetsRegistry}
          generateClassName={this.pageContext.generateClassName}
        >
          <MuiThemeProvider
            theme={this.pageContext.theme}
            sheetsManager={this.pageContext.sheetsManager}
          >
            <CssBaseline />
            <ApolloProvider client={apolloClient}>
              <Component pageContext={this.pageContext} {...pageProps} />
            </ApolloProvider>
          </MuiThemeProvider>
        </JssProvider>
        <style jsx global>{`
          html,
          body {
            height: 100%;
          }

          div#__next,
          div#__next > main {
            height: 100%;
          }
        `}</style>
      </Container>
    )
  }
}

export default withApolloClient(MyApp)
