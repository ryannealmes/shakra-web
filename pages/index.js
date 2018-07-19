import Grid from '@material-ui/core/Grid'
import App from '../components/App'
import withAuthentication from './withAuthentication'

const Dashboard = () => {
  return (
    <App>
      <Grid container item xs={12}>
        <p>Dashboard</p>
      </Grid>
    </App>
  )
}

export default withAuthentication(Dashboard)
