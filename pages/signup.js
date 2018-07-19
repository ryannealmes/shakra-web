import Grid from '@material-ui/core/Grid'
import App from '../components/App'
import Signup from '../components/Signup'

const SignupPage = () => {
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
        <Signup />
      </Grid>
    </App>
  )
}

export default SignupPage
