import React, { Component } from 'react'
import SearchProfile from './SearchProfile'
import { connect } from 'react-redux'
import { searchUser } from '../../actions/searchActions'

class ListPost extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.searchUser(this.props.inheritedProps.match.params.query)
  }

  render() {
    console.log(this.props)
    const { list, loading } = this.props
    let items
    if(list) {
      var filtered = list.filter(function(item) {
        return (item !== null && item !== '')
      })
      items = filtered && filtered.map(el => <SearchProfile key={el._id} profile={el} />)
      console.log(items)
    }
    return (
      <div>
        { loading ? <div></div> : items }
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
	list: state.profile.list,
	loading: state.profile.loading
})

export default connect(mapStateToProps, { searchUser })(ListPost)