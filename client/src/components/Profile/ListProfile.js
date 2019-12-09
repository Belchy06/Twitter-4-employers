import React, { Component } from 'react'
import SearchProfile from './SearchProfile'
import { connect } from 'react-redux'
import { searchUser } from '../../actions/searchActions'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  load: {
    textAlign: 'center',
    marginTop: 25,
    width: '100%'
  },
  loadIcon: {
    color: '#8A2BE2'
  }
}

class ListProfile extends Component {
  componentDidMount() {
    this.props.searchUser(this.props.inheritedProps.match.params.query)
  }

  render() {
    const { list, loading, classes, user } = this.props
    let profile
    if(list) {
      var filtered = list.filter(function(item) {
        return (item !== null && item !== '')
      })
      profile = filtered && filtered.map(el => <SearchProfile targetUser={el._id} profile={ el } currentUserId={user.id}/>)
    }
    if(profile) {
      return (
        <div>
          { loading ? 'Loading...' : profile }
        </div> 
      )
    } else {
      return (
        <div className = { classes.load }>
          <CircularProgress className = { classes.loadIcon }/>
        </div>
      )
    }
  }
}


const mapStateToProps = (state) => ({
	list: state.profile.list,
  loading: state.profile.loading,
  auth: state.auth,
  user: state.auth.user
})

export default connect(mapStateToProps, { searchUser })(withStyles(styles)(ListProfile))