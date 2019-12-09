import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { getPostsByUserId, getUserProfile, followUser, unfollowUser, refreshUserProfile } from '../../actions/profileActions'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'

const styles = {
  handle: {
    color: '#888',
    display: 'inline-block',
    '&:hover': {
      textDecoration: 'none',
    }
  },
  following: {

  },
  followers: {

  },
  display: {
    marginTop: 5,
    marginBottom: 5,
    color: "#333",
    '&:hover': {
      textDecoration: 'underline #333'
    }
  },
  paper: {
    padding: 8,
    marginBottom: 10
  },
  detail: {
    marginRight: 5
  },
  btnBlock: {
    float: 'right',
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

  componentDidMount() {
    getUserProfile(this.props.targetUser)
    getPostsByUserId(this.props.targetUser)
  }

  componentWillMount() {
    getUserProfile(this.props.targetUser)
    getPostsByUserId(this.props.targetUser)
  }

  componentDidUpdate(oldProps) {
    if(this.props.auth.isAuthenticated) {
      if(oldProps.user && oldProps.user.following !== this.props.user.following) {
        this.props.user.following.map((id, i) => {
          this.props.getUserProfile(id)
        })
      }
    } 
  }

  handleFollow () {
    this.props.followUser(this.props.profile._id)
  }

  handleUnfollow () {
    this.props.unfollowUser(this.props.profile._id)
  }


  render() {
    const { classes, loadingProfile, auth, user, profile } = this.props
    
    let followBtn
    if(auth.isAuthenticated) {
      if(user.following.indexOf(this.props.profile._id) === -1) {
        followBtn = (
          <span className = { classes.btnBlock }>
            <Button variant="outlined" type="" className = { classes.btnFollow } onClick = { this.handleFollow }>
              Follow
            </Button>
          </span>
        )
      } else {
        followBtn = (
          <span className = { classes.btnBlock }>
            <Button variant="outlined" type="" className = { classes.btnFollow }  onClick = { this.handleUnfollow }>
              Unfollow
            </Button>
          </span>
        )
      }
    } else {
      followBtn = (
        <span className = { classes.btnBlock }>
          <Button variant="outlined" type="" className = { classes.btnFollow }  href="/login">
            Login
          </Button>
        </span>
      )
    }
    
    let profileInfo;
    if(profile) {
      console.log(this.props)
      if(this.props.currentUserId !== this.props.targetUser) {
        profileInfo = (
          <Paper className = { classes.paper }>
            <Link href = { `/profile/${this.props.targetUser}` }>
              <h1 className = { classes.display }>
                { profile.login }
                { followBtn }  
              </h1> 
            </Link>
            <div className = { classes.handle }>@{ profile.handle }</div> 
            
          </Paper>
        )
      } 
    }

    return (
      <div>
        { loadingProfile ? <div>Loading...</div> : profileInfo }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  list: state.post.list,
  //profile: '',
  loadingProfile: state.profile.loading,
  auth: state.auth,
  user: state.auth.user
})

export default connect(mapStateToProps, { getPostsByUserId, getUserProfile, followUser, unfollowUser, refreshUserProfile })(withStyles(styles)(Profile))