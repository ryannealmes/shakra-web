import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  root: {
    display: 'flex'
  }
})

const App = ({ children, classes }) => (
  <main className={classes.root}>{children}</main>
)

export default withStyles(styles)(App)
