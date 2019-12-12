import React, { Component } from 'react'
import { connect } from 'react-redux'
import ListPosts from './Posts/ListPost'
import Login from './Auth/Login'
import Profile from './Profile/HomeProfile'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  'MuiGrid-root': {
    flexGrow: 1,
  },
  sticky: {
    justifyContent: "center",
    alignItems: "center",
    position: '-webkit-sticky', /* Safari */
    position: 'sticky',
    top: 0,
  }
}

class Home extends Component {
  render() {
    const { isAuthenticated } = this.props

    return (
      <Grid container >
        <Grid container direction="row" sm={12}>
          <Grid item sm={3}>
            <Grid container direction="column" className = { this.props.classes.sticky }>
 	            <Grid item alignContent="center">
               { isAuthenticated ? <Profile/> : '' }
              </Grid>
              <Grid item alignContent="center">
         	      Trends
              </Grid>
            </Grid>
          </Grid>
          <Grid item className = { this.props.classes.sticky } sm={6}>
            { isAuthenticated ? <ListPosts/> : <Login/> }
          </Grid>
          <Grid item sm={3}>
            <Grid container direction="column" className = { this.props.classes.sticky }>
 	            <Grid item>
                Ad
              </Grid>
              <Grid item>
         	      Who To Follow
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>






     
              
    )
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.isAuthenticated,
})

export default connect(mapStateToProps, null)(withStyles(styles)(Home))