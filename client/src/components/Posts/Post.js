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
    marginTop: 0,
    backgroundColor: '#15202b',
    color: '#fff',
    borderRadius: 0,
    border: '1px solid #8899a6',
    borderTop: 0
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
		color: '#8899a6',
    fontSize: 14,
    paddingLeft: 5,
    fontWeight: 400
  },
  handle: {
    color: '#8899a6',
    paddingLeft: 5,
    display: 'inline-block',
    '&:hover': {
      textDecoration: 'none'
    },
    fontSize: 14,
    fontWeight: 400
  },
  userInfo: {
    marginTop: 5,
    marginBottom: 5,
    color: '#fff'
  },
  like: {
    padding: 5,
    color: '#8899a6',
    '&:hover': {
      color: '#e0245e'
    }
  },
  likes: {
    fontSize: 12,
    fontWeight: 'bold',
    padding: 5
  },
  heart: {
    fontSize: 18,
  },
  liked: {
    color: '#e0245e',
    padding: 5
  },
  link: {
    fontWeight: '700',
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
    if(auth.isAuthenticated) {
      if(post && user) {
        if(post.likes.indexOf(user.id) === -1) {
          //Like post
          socialIcons = (
            <span>      
              <IconButton className = { classes.like } onClick = { this.handleLike }>
                <FavouriteBorderIcon className = { classes.heart }/>
                <span className = { classes.likes }>
                  { post.likes.length }
                </span>
              </IconButton>
              
            </span>
          )
        } else {
          //Unlike post
          socialIcons = (
            <IconButton className = { classes.liked } onClick = { this.handleUnlike }>
              <FavouriteIcon className = { classes.heart }/>
              <span className = { classes.likes }>
                { post.likes.length }
              </span>
            </IconButton>
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
              <Link href = { `/profile/${post.user.id}` } style = {{ color: '#fff' }}
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