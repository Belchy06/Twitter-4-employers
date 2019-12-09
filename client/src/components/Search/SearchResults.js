import React, { Component } from 'react'
import { connect } from 'react-redux'
import ListProfile from '../Profile/ListProfile'

class Results extends Component {
  componentDidMount() {
    //this.props.searchUser(this.props.match.params.query)
  }

  render() {
    console.log(this.props)
    return (
      <div><ListProfile inheritedProps = { this.props } /></div>
    )
  }
}

const mapStateToProps = (state) => (
  console.log(state)
)

export default (Results)