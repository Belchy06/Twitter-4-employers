import React, { Component } from 'react'
import AddPost from './AddPost'
import Post from './Post'
import { connect } from 'react-redux'
import { getPosts } from '../../actions/postActions'
import LoadingPosts from './LoadingPosts'

class ListPost extends Component {
  componentDidMount() {
    this.props.getPosts()
  }
  render() {
    const { list, loading } = this.props
    var filtered = list.filter(function(item) {
      return (item !== null && item !== '')
    })
    const items = filtered && filtered.map(el => <Post key={el._id} post={el} />)
    console.log(items)
    return (
      <div>
        <AddPost/>
        { loading ? <LoadingPosts/> : items }
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
	list: state.post.list,
	loading: state.post.loading
})

export default connect(mapStateToProps, { getPosts })(ListPost)