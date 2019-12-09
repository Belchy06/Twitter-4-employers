import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Link from '@material-ui/core/Link'

const styles = {
  paper: {
		padding: 10,
		display: 'flex',
		marginTop: 10,
	},
	avatar: {
		minWidth: 10,
		margin: '4px 10px 4px 4px'
	},
	login: {
		marginBottom: 5
	},
	time: {
		marginTop: 5,
		color: '#bbb',
		fontSize: 14
  },
  handle: {
    color: '#888',
    paddingLeft: 5,
    display: 'inline-block',
    '&:hover': {
      textDecoration: 'none'
    }
  }
}

class Post extends Component {
  render() {
    const { classes, post } = this.props
    if(typeof post !== "undefined") {
      return (
        <Paper className = { classes.paper }>
          <div
            style={{ backgroundColor: `#${post.user.id.slice(post.user.id.length - 3)}` }}
            className={ classes.avatar }
          />
          <div> 
            <h3>
              <Link href = { `/profile/${post.user.id}` }
              className = { classes.link }> 
                { post.user.login }
                <span className = { classes.handle }>
                  @{ post.user.handle }
                </span>
              </Link>
            </h3>
            { post.text }
            <div className = { classes.time }>
              { new Date(post.createdAt).toLocaleString() }
            </div>
          </div>
        </Paper>
      )
    } else {
      return(
        ''
      )
    }
  }
}

export default withStyles(styles)(Post)