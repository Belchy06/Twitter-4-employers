import React, { Component } from 'react'
import { connect } from 'react-redux'
import { searchUsers } from '../../actions/searchActions'
import Profile from '../Profile/SearchProfile'
import Loading from '../Posts/LoadingPosts'

class Profiles extends Component {
  componentDidMount() {
    this.props.searchUsers(this.props.query)
  }

  componentDidUpdate(oldProps) {
    if(oldProps.query !== this.props.query) {
      this.props.searchUsers(this.props.query)
    }
  }

  render () {
    let list = this.props.profiles
    var filtered = list.filter(function(item) {
      return (item !== null && item !== '')
    })
    const items = filtered.slice(0, 2).map(info => <Profile key = { info._id } profile = { info } />)
    let profiles
    if(items.length !== 0) {
      profiles =  (
        <div>
          <h1>Profiles:</h1>
          { items }
        </div>
      )
    } else {
      profiles =  (
        <div>
        </div>
      )
    }

    return (
      <div>{ profiles }</div>
    )
  }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    auth: state.auth,
    profiles: state.search.profiles,
    searching: state.search.searching
  }
)

export default connect(mapStateToProps, { searchUsers })(Profiles)