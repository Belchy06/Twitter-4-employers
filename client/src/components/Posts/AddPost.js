import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { ClickAwayListener } from '@material-ui/core';
import { connect } from 'react-redux'
import { addPost } from '../../actions/postActions'

const styles = {
  paper: {
    padding: 8,
    backgroundColor: '#1a383e',
    border: '1px solid #8899a6',
    borderRadius: 0,
    color: '#fff'
  },
  textField: {
    color: '#fff',
    marginTop: '0 !important'
  },
  btn: {
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#15202b',
    color: '#19cf86',
    border: '1px solid #19cf86',
    '&:hover': {
      color: '#fff',
      backgroundColor: '#19cf86'
    }
  },
  root: {
    width: 'calc(100% - 10px)',
    overflow: 'hidden',
    borderRadius: 4,
    padding: 5,
    backgroundColor: '#15202b',
    '& label': {
      color: '#8899a6',
      paddingLeft: 5,
      marginTop: -10
    },
    '& label.Mui-focused': {
      display: 'none'
    },
    'MuiInput-formControl': {
      marginTop: 0
    }
  },
  underline: {
    borderBottom: '2px solid white',
  }
}

class AddPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      focused: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleClickAway = this.handleClickAway.bind(this)
  }
  handleChange(e) {
    this.setState({ text: e.target.value })
  }
  handleSubmit(e) {
    e.preventDefault()
    const postData = {
      text: this.state.text
    }
    this.props.addPost(postData)
    this.setState({ text: '' })
  }

  handleFocus(e) {
    this.setState({ focused: true })
  }

  handleClickAway(e) {
    this.setState({ focused: false })
  }
  render() {
    const { classes } = this.props
    let buttons
    if(this.state.focused) {
      buttons = (
        <Button 
          variant="outlined" 
          className = { classes.btn }
          onClick = { this.handleSubmit }
          type = "">
            Post!
        </Button>
      )
    }
    return (
      <Paper className = { classes.paper }>
        <ClickAwayListener onClickAway = { this.handleClickAway }>
          <TextField
            multiline
            rows = {this.state.focused ? "4" : "1"}
            label="What's on your mind?"
            className = { classes.root }
            InputProps = {{ className: classes.textField }}
            onClick = { this.handleFocus }
            InputLabelProps = {{ shrink: false }}
            onChange = { this.handleChange }
            value = { this.state.text }
          />
        </ClickAwayListener>
        { buttons }
        
      </Paper>
    )
  }
}

export default connect(null, { addPost })(withStyles(styles)(AddPost))