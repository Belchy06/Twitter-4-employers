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

}

class Followers extends Component {
  render() {
    return (
      <div> Followers </div>
    )
  }
}

const mapStateToProps = (state) => ({
  loadingPosts: state.post.loading,
  list: state.profile.posts,
  profile: state.profile.user,
  loadingProfile: state.profile.loading,
  auth: state.auth,
  user: state.auth.user
})

export default connect(mapStateToProps, { getPostsByUserId, getUserProfile, followUser, unfollowUser, refreshUserProfile, getPosts })(withStyles(styles)(Followers))