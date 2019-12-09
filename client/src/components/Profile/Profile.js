import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
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
    this.handleEdit = this.handleEdit.bind(this)
  }

  componentDidMount() {
    this.props.getPostsByUserId(this.props.match.params.userId)
    this.props.getUserProfile(this.props.match.params.userId)
  }

  componentDidUpdate(oldProps) {
    if(this.props.auth.isAuthenticated) {
      if(oldProps.user && oldProps.user.following !== this.props.user.following) {
        this.props.refreshUserProfile(this.props.match.params.userId)
      }
    } 
  }

  handleFollow () {
    this.props.followUser(this.props.match.params.userId)
  }

  handleUnfollow () {
    this.props.unfollowUser(this.props.match.params.userId)
  }

  handleEdit () {
    console.log('Edit User')
  }

  render() {
    const { classes, loadingPosts, loadingProfile, list, auth, user, profile } = this.props

    let followBtn
    if(auth.isAuthenticated) {
      if(user.following.indexOf(this.props.match.params.userId) === -1) {
        if(user.id === this.props.match.params.userId){
          followBtn = (
            <span className = { classes.btnBlock }>
              <Button variant="outlined" type="" className = { classes.btnFollow } onClick = { this.handleEdit }>
                Edit Profile
              </Button>
            </span>
          )
        } else {
          followBtn = (
            <span className = { classes.btnBlock }>
              <Button variant="outlined" type="" className = { classes.btnFollow } onClick = { this.handleFollow }>
                Follow
              </Button>
            </span>
          )

        }
      } else {
        followBtn = (
          <span className = { classes.btnBlock }>
            <Button variant="outlined" type="" className = { classes.btnFollow }  onClick = { this.handleUnfollow }>
              Unfollow
            </Button>
          </span>
        )
      }
    }
    
    
    let items;
    items = list && list.map(el => <Post key={ el._id } post={ el }/>)
    let profileInfo;
    if(profile && items) {
      profileInfo = (
        <Paper className = { classes.paper }>
          <h1 className = { classes.display }>
            { profile.login }
            { followBtn }
          </h1>
          <div className = { classes.handle }>@{ profile.handle }</div>
          <div className = { classes.detailBlock }>
            <div  className = { classes.detail }>
              { items.length }
              <span> posts</span>
            </div>
            <div  className = { classes.detail }>
              <span className = { classes.followers }>
                { profile.followers.length + ' ' }
                followers
              </span>
            </div>
            <div  className = { classes.detail }>
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
      <div>
        { loadingProfile ? <div>Loading...</div> : profileInfo }
        { loadingPosts ? <LoadingPosts/> : items}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  loadingPosts: state.post.loading,
  list: state.post.list,
  profile: state.profile.user,
  loadingProfile: state.profile.loading,
  auth: state.auth,
  user: state.auth.user
})

export default connect(mapStateToProps, { getPostsByUserId, getUserProfile, followUser, unfollowUser, refreshUserProfile })(withStyles(styles)(Profile))