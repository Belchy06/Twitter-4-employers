import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getPostsByUserId, getUserProfile, followUser, unfollowUser, refreshUserProfile } from '../../actions/profileActions'
import Post from '../Posts/Post'
import LoadingPosts from '../Posts/LoadingPosts'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'

const styles = {
  handle: {
    color: '#8899a6',
    display: 'inline-block',
    '&:hover': {
      textDecoration: 'none'
    },
    fontSize: 14,
    fontWeight: 400
  },
  display: {
   marginTop: 5,
   marginBottom: 5
  },
  paper: {
    padding: '1rem',
    borderRadius: 0,
  },
  detail: {
    marginRight: '1.5rem',
    color: '#8899a6',
    display: 'block',
    textAlign: 'left',
    fontWeight: 700,
    fontSize: 12
  },
  profile: {
    borderRadius: 0,
    backgroundColor: '#15202b',
    padding: '1rem',
    border: '1px solid #8899a6' ,
    display: 'block'
  },
  link: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 700
  },
  value: {
    color: '#19cf86',
    fontWeight: 700,
    fontSize: 18,
    textAlign: 'left'
  },
  btnBlock: {
    display: 'block',
    float: 'right',
  },
  btnFollow: {
    backgroundColor: 'inherit',
    color: '#19cf86',
    border: '1px solid #19cf86',
    '&:hover': {
      backgroundColor: '#1A383E'
    },
    fontSize: 12,
    fontWeight: 700,
    borderRadius: 25
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
      if(this.props.user.following.findIndex(profile => profile._id === this.props.profile._id) === -1) {
        followBtn = (
          <Button variant="outlined" type="" className = { classes.btnFollow } onClick = { this.handleFollow }>
            Follow
          </Button>
        )
      } else {
        followBtn = (
          <Button variant="outlined" type="" className = { classes.btnFollow } onClick = { this.handleUnfollow }>
            Unfollow
          </Button>
        )
      }
    } 


    let profileInfo
    if(profile) {
      profileInfo = (
        <Paper className = { classes.profile }>
          <div>
            <Link href = { `/profile/${profile._id}` } className = { classes.link }> 
              { profile.login }         
            </Link>
            <span className = { classes.btnBlock }>
              { followBtn }
            </span>
          </div>
          <div className = { classes.handle }>
            @{ profile.handle }
          </div>
        </Paper>
        
      )
    }
    return (
      <Grid item sm={5} style={{ marginRight: '1rem' }}>
        { profileInfo }
      </Grid>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  auth: state.auth
})

export default connect(mapStateToProps, {  followUser, unfollowUser, refreshUserProfile })(withRouter(withStyles(styles)(Profile)))