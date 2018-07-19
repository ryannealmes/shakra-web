import React from 'react'
import { withRouter } from 'next/router'
import { withStyles } from '@material-ui/core/styles'
import withLoginMutation from './withLoginMutation'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import validate from './validations'

const styles = theme => {
  return {
    paper: { display: 'flex', flexDirection: 'column', padding: 15 },
    loginButton: {
      margin: theme.spacing.unit,
      marginTop: theme.spacing.unit * 2
    },
    signButton: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit
    },
    alert: {
      margin: theme.spacing.unit,
      padding: theme.spacing.unit,
      backgroundColor: '#ffc8c8'
    }
  }
}

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    errors: {}
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  handleSubmit = e => {
    const { login } = this.props

    e.preventDefault()
    const { errors, isValid } = validate(this.state)
    this.setState({ errors })

    if (isValid) {
      login({
        variables: {
          email: this.state.email,
          password: this.state.password
        }
      })
        .then(() => {
          this.props.router.push('/')
        })
        .catch(() => {
          this.setState({
            errors: { base: 'Invalid email or password' }
          })
        })
    }
  }

  render() {
    const { classes } = this.props

    return (
      <form onSubmit={this.handleSubmit}>
        <Paper className={classes.paper}>
          <Typography variant="display1">Sign into Shakra</Typography>

          {this.state.errors.base && (
            <Paper color="error" className={classes.alert} elevation={0}>
              <Typography color="error">{this.state.errors.base}</Typography>
            </Paper>
          )}
          <TextField
            id="email"
            label="Email"
            className={classes.textField}
            value={this.state.email}
            onChange={this.handleChange('email')}
            margin="normal"
            error={this.state.errors.email ? true : false}
            helperText={this.state.errors.email}
          />
          <TextField
            id="password"
            label="Password"
            className={classes.textField}
            value={this.state.password}
            onChange={this.handleChange('password')}
            margin="normal"
            type="password"
            error={this.state.errors.password ? true : false}
            helperText={this.state.errors.password}
          />
          <Button
            variant="contained"
            className={classes.loginButton}
            type="submit"
          >
            LOG IN
          </Button>
          <Button
            className={classes.signButton}
            onClick={() => {
              this.props.router.push('/signup')
            }}
          >
            SIGN UP
          </Button>
        </Paper>
      </form>
    )
  }
}

export default withLoginMutation(withRouter(withStyles(styles)(Login)))
