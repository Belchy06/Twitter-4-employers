import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { APP_NAME } from '../../constants'


const styles = (theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
})

class SearchForm extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    const searchData = {
      text: e.target.value
    }
    if(searchData.text !== '') {
      if(e.key === 'Enter') {
        this.props.history.push(`/search/${searchData.text}`)
      }
    }
    
  }

  render() {
    const { classes } = this.props
    return (
      <div className = { classes.search }>
        <div className = { classes.searchIcon }>
          <SearchIcon />
        </div>
        <InputBase
          placeholder = { 'Search ' +  APP_NAME }
          classes = {{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
          onKeyPress = { this.handleSubmit }
        />
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(SearchForm))