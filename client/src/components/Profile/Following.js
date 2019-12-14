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
import Profile from './FollowProfile'

const styles = {

}

class Following extends Component {
  componentDidMount() {
    
  }


  render() {
    let items
    console.log(this.props)
    if(this.props.user) {
      let list = this.props.user.following
      var filtered = list.filter(function(item) {
        return (item !== null && item !== '')
      })
      items = filtered.map(info => <Profile key = { info._id } profile = { info }/>)
    }
    
    return (
      <div>{ items }</div>
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

export default connect(mapStateToProps, { getPostsByUserId, getUserProfile, followUser, unfollowUser, refreshUserProfile, getPosts })(withStyles(styles)(Following))