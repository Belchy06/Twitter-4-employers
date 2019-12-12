import React, { Component } from 'react'
import Profiles from './SearchProfiles'
import { APP_NAME } from '../../constants/index'
import { connect } from 'react-redux'

class Results extends Component {
  render() {
    return (
      <div>
        <h1>Searching { APP_NAME } for: { this.props.match.params.query }</h1>
        <Profiles query = { this.props.match.params.query }/>
      </div>
    )
  }
}

export default Results