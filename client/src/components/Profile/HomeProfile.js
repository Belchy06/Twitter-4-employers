import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import { connect } from 'react-redux'
import { getPostsByUserId, getUserProfile } from '../../actions/profileActions'
import { withStyles } from '@material-ui/core/styles'
import Link from '@material-ui/core/Link'

const styles = {
  handle: {
    color: '#8899a6',
    paddingLeft: 5,
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
    borderRadius: 0
  },
  detailBlock: {
    display: 'flex',
    marginTop: 10
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
          <div className = { classes.detailBlock }>
            <div className = { classes.detail }>
              <span> Posts</span>
              <div className = { classes.value }>
                { posts.length }
              </div>              
            </div>
            <div className = { classes.detail }>
              <span className = { classes.followers }>
                Followers
              </span>
              <div className = { classes.value }>
                { profile.followers.length }
              </div>
            </div>


            <div className = { classes.detail }>
              <span className = { classes.following }>
                Following
              </span>
              <div className = { classes.value }>
                { profile.following.length }
              </div>
            </div>
          </div>
        </Paper>
      )
    }
    return (
      <div style = {{ justify: 'center'}}>
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