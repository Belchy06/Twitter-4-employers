import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Link from '@material-ui/core/Link'
import Moment from 'moment'
import { connect } from 'react-redux'
import SvgIcon from '@material-ui/core/SvgIcon'
import IconButton from '@material-ui/core/IconButton'
import FavouriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavouriteIcon from '@material-ui/icons/Favorite';
import Button from '@material-ui/core/Button'
import { likePost, unlikePost } from '../../actions/postActions'

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
    fontSize: 14,
    paddingLeft: 5
  },
  handle: {
    color: '#888',
    paddingLeft: 5,
    display: 'inline-block',
    '&:hover': {
      textDecoration: 'none'
    }
  },
  userInfo: {
    marginTop: 5,
    marginBottom: 5
  },
  like: {
    padding: 5
  },
  heart: {
    '&:hover': {
      color: '#ff007f'
    }
  },
  liked: {
    color: '#F00'
  }
}

function timeSince(str) {
  var date = Moment(str)
  var seconds = Math.floor((new Date() - date) / 1000);
  var intervalType;

  var interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    intervalType = 'year';
  } else {
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      intervalType = 'month';
    } else {
      interval = Math.floor(seconds / 86400);
      if (interval >= 1) {
        intervalType = 'day';
      } else {
        interval = Math.floor(seconds / 3600);
        if (interval >= 1) {
          intervalType = "hour";
        } else {
          interval = Math.floor(seconds / 60);
          if (interval >= 1) {
            intervalType = "minute";
          } else {
            interval = seconds;
            intervalType = "second";
          }
        }
      }
    }
  }

  if (interval > 1 || interval === 0) {
    intervalType += 's';
  }

  return interval + ' ' + intervalType;
};

class Post extends Component {
  constructor(props) {
    super(props)

    this.handleLike = this.handleLike.bind(this)
    this.handleUnlike = this.handleUnlike.bind(this)
  }

  handleLike() {
    this.props.likePost(this.props.post._id) 
  }

  handleUnlike() {
    this.props.unlikePost(this.props.post._id) 
  }

  render() {
    const { classes, post, user, auth } = this.props
    let socialIcons
    console.log(this.props)
    if(auth.isAuthenticated) {
      if(post && user) {
        if(post.likes.indexOf(user.id) === -1) {
          //Like post
          socialIcons = (
            <span>
              { post.likes.length }
              <IconButton className = { classes.like } onClick = { this.handleLike }>
              <FavouriteBorderIcon className = { classes.heart }/>
              </IconButton>
            </span>
          )
        } else {
          //Unlike post
          socialIcons = (
            <span>
              { post.likes.length }
              <IconButton className = { classes.like } onClick = { this.handleUnlike }>
                <FavouriteIcon className = { classes.liked }/>
              </IconButton>
            </span>
          )
        }
      }
    }
      
      
    if(typeof post !== "undefined") {
      return (
        <Paper className = { classes.paper }>
          <div
            style={{ backgroundColor: `#${post.user.id.slice(post.user.id.length - 3)}` }}
            className={ classes.avatar }
          />
          <div> 
            <h3 className = { classes.userInfo }>
              <Link href = { `/profile/${post.user.id}` }
              className = { classes.link }> 
                { post.user.login }
                <span className = { classes.handle }>
                  @{ post.user.handle }
                </span>
              </Link>
              <span className = { classes.time} >
                ·  { timeSince( post.createdAt )} ago
              </span>
            </h3>
            { post.text }
            <div>
              { socialIcons }
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

const mapStateToProps = (state) => ({
  user: state.auth.user,
  auth: state.auth
})

export default connect(mapStateToProps, { likePost, unlikePost })(withStyles(styles)(Post))