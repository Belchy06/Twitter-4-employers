import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import { connect } from 'react-redux'
import { getPostsByUserId, getUserProfile } from '../../actions/profileActions'
import { withStyles } from '@material-ui/core/styles'
import Link from '@material-ui/core/Link'

const styles = {
  handle: {
    color: '#888',
    paddingLeft: 5,
    display: 'inline-block',
    '&:hover': {
      textDecoration: 'none'
    }
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
  profile: {
    width: '100%'
  }
}

class Profile extends Component {
  componentDidMount() {
    this.props.getPostsByUserId(this.props.user.id)
    this.props.getUserProfile(this.props.user.id)
  }

  render() {
    const { user, auth, posts, profile, classes } = this.props
    let profileInfo
    if(profile) {
      profileInfo = (
        <Paper className = { classes.profile }>
          <Link href = { `/profile/${profile._id}` } className = { classes.link }> 
            { profile.login }
            <span className = { classes.handle }>
              @{ profile.handle }
            </span>
          </Link>
          <div>
            <div className = { classes.detail }>
              { posts.length }
              <span> posts</span>
            </div>
            <div className = { classes.detail }>
              <span className = { classes.followers }>
                { profile.followers.length + ' ' }
                followers
              </span>
            </div>
            <div className = { classes.detail }>
              <span className = { classes.following }>
                { profile.following.length + ' ' }
                following
              </span>
            </div>
          </div>
        </Paper>
      )
    }
    return (
      <div className = { classes.profile }>
        { profileInfo }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.auth.user,
  posts: state.profile.posts,
  profile: state.profile.user,
})

export default connect(mapStateToProps, { getPostsByUserId, getUserProfile })(withStyles(styles)(Profile))