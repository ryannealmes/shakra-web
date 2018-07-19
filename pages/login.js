import Grid from '@material-ui/core/Grid'
import App from '../components/App'
import Login from '../components/Login'

const LoginPage = () => {
  return (
    <App>
      <Grid
        container
        item
        xs={12}
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Login />
      </Grid>
    </App>
  )
}

export default LoginPage
