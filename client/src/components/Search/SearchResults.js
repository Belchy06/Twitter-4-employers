import React, { Component } from 'react'
import Profiles from './SearchProfiles'
import { APP_NAME } from '../../constants/index'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

const styles = {
  heading: {
    backgroundColor: '#19cf86',
    marginTop: 0,
    padding: 15
  }
}

class Results extends Component {
  render() {
    const { classes } = this.props
    return (
      <div>
        <h1 className = { classes.heading }>Searching { APP_NAME } for: { this.props.match.params.query }</h1>
        <div style = {{ margin: 15 }}>
          <Profiles query = { this.props.match.params.query }/>
        </div>   
      </div>
    )
  }
}

export default withStyles(styles)(Results)