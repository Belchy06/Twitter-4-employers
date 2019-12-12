import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getPostsByUserId, getUserProfile, followUser, unfollowUser, refreshUserProfile } from '../../actions/profileActions'
import Post from '../Posts/Post'
import LoadingPosts from '../Posts/LoadingPosts'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

const styles = {
  handle: {
    color: '#888',
    display: 'inline-block',
    '&:hover': {
      textDecoration: 'none'
    }
  },
  following: {

  },
  followers: {

  },
  display: {
   marginTop: 5,
   marginBottom: 5
  },
  paper: {
    padding: 8
  },
  detailBlock: {
    display: 'flex'
  },
  detail: {
    marginRight: 5
  },
  btnBlock: {
    float: 'right',
    display: 'block'
  },
  btnFollow: {
    backgroundColor: 'inherit',
    color: '#78dd60',
    '&:hover': {
      color: '#fff',
      borderColor: '#78dd60',
      backgroundColor: '#78dd60'
    }
  }
}

class Profile extends Component {
  constructor(props) {
    super(props)

    this.handleFollow = this.handleFollow.bind(this)
    this.handleUnfollow = this.handleUnfollow.bind(this)
  }

  handleFollow () {
    this.props.followUser(this.props.profile._id)
  }

  handleUnfollow () {
    this.props.unfollowUser(this.props.profile._id)
  }

  render() {
    const classes = this.props.classes
    const profile = this.props.profile
    let followBtn
    if(this.props.auth.isAuthenticated) {
      if(this.props.user.following.indexOf(this.props.profile._id) === -1) {
        followBtn = (
          
            <Button variant="outlined" type="" className = { classes.btnFollow } onClick = { this.handleFollow }>
              Follow
            </Button>

        )
      } else {
        followBtn = (
          <span className = { classes.btnBlock }>
            <Button variant="outlined" type="" className = { classes.btnFollow } onClick = { this.handleUnfollow }>
              Unfollow
            </Button>
          </span>
        )
      }
    } 


    let profileInfo
    if(profile) {
      profileInfo = (
        <Paper className = { classes.paper }>
          <h1 className = { classes.display }>
            { profile.login }
            <span className = { classes.btnBlock }>{ followBtn }</span>
          </h1>
          <div className = { classes.handle }>@{ profile.handle }</div>
        </Paper>
        
      )
    }
    return (
      <div>{ profileInfo }</div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  auth: state.auth
})

export default connect(mapStateToProps, {  followUser, unfollowUser, refreshUserProfile })(withRouter(withStyles(styles)(Profile)))