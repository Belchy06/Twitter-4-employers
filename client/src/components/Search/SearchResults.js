import React, { Component } from 'react'
import { connect } from 'react-redux'
import ListProfile from '../Profile/ListProfile'

class Results extends Component {
  render() {
    console.log(this.props)
    return (
      <div><ListProfile inheritedProps = { this.props } /></div>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.isAuthenticated
})

export default Results