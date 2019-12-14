import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { getPostsByUserId, getUserProfile, followUser, unfollowUser, refreshUserProfile } from '../../actions/profileActions'
import { getPosts } from '../../actions/postActions'
import Post from '../Posts/Post'
import LoadingPosts from '../Posts/LoadingPosts'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
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
    'box-shadow': 'none'
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
  constructor(props) {
    super(props)

    this.handleFollow = this.handleFollow.bind(this)
    this.handleUnfollow = this.handleUnfollow.bind(this)
  }

  componentDidUpdate(oldProps) {
    if(this.props.auth.isAuthenticated) {
      console.log(this.props)
      if(oldProps.user && (oldProps.user.following !== this.props.user.following || oldProps.user.followers !== this.props.user.followers)) {
        console.log('refresh')
        this.props.refreshUserProfile(this.props.profile._id)
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
    const { classes, loadingPosts, loadingProfile, list, auth, user, profile } = this.props
    console.log(this.props)
    let followBtn
    if(auth.isAuthenticated) {
      if(user.following.findIndex(profile => profile._id === this.props.profile._id) === -1) {
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
    }
    
    
    let items;
    items = list && list.map(el => <Post key={ el._id } post={ el }/>)
    let profileInfo;
    if(profile && items) {
      profileInfo = (
        <Paper className = { classes.profile }>
          <div className = { classes.link }> 
            { profile.login }
          </div>
          <div className = { classes.handle }>
            @{ profile.handle }
          </div>
          { followBtn }
        </Paper>

      )
    }
    return (
      <Grid container>
        <Grid item sm={4}>{ loadingProfile ? <div>Loading...</div> : profileInfo }</Grid>
        <Grid item sm={7}>{ loadingPosts ? <LoadingPosts/> : <div style={{paddingTop: '1rem'}}>{items}</div>}</Grid>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => ({
  loadingPosts: state.post.loading,
  list: state.profile.posts,
  loadingProfile: state.profile.loading,
  auth: state.auth,
  user: state.auth.user,
  new: state.profile.user
})

export default connect(mapStateToProps, { getPostsByUserId, getUserProfile, followUser, unfollowUser, refreshUserProfile, getPosts })(withStyles(styles)(Profile))