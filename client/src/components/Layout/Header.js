import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Button from '@material-ui/core/Button';

import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import { logoutUser } from '../../actions/authActions' 
import SvgIcon from '@material-ui/core/SvgIcon'
import SearchForm from '../Search/SearchForm'

const style = {
  root: {
    flexGrow: 1
  },
  logo: {
    color: '#fff',
    fontSize: 30,
    textTransform: 'uppercase'
  },
  space: {
    justifyContent: 'space-between'
  },
  btn: {
    paddingLeft: 10
  }
}

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
    )
}

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    }
    this.handleLogout = this.handleLogout.bind(this)  
  }

  handleMenu = (event) => { this.setState({ anchorEl: event.currentTarget }) }
  handleClose = () => { this.setState({ anchorEl: null })}
  handleLogout () {
    this.setState({ anchorEl: null })
    this.props.logoutUser()
  }

  render() {
    const { classes, isAuthenticated, user } = this.props
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)

    const guestLinks = (
      <div>
          <Link to="/login"  className = { classes.btn }>
            <Button variant="outlined">
              Login
            </Button>
          </Link>
          <Link to="/signup"  className = { classes.btn }>
            <Button variant="outlined">
              Signup
            </Button>
          </Link>
      </div>
    )

    const authLinks = isAuthenticated && (
      <div className = { classes.right }>
        <IconButton
          aria-owns = { open ? 'menu-appbar' : undefined }
          aria-haspopup = "true"
          color = "inherit"
          onClick = { this.handleMenu }
        >
          <AccountCircle/>
        </IconButton>
        <Menu
          id = "menu-appbar"
          open = { open }
          anchorEl = { anchorEl }
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          onClose={ this.handleClose }
        >
          <MenuItem onClick={ this.handleClose }>
            <Link to={ `/profile/${user.id}` }>Profile</Link>
          </MenuItem>
          <MenuItem>
            <Link to='/#' onClick={ this.handleLogout }>Logout</Link>
          </MenuItem>
        </Menu>
      </div>
    )
    return (
      <div className = {classes.root}>
        <AppBar position="static" style={{ backgroundColor: '#78dd60', padding: 10 }}>
          <ToolBar className = { classes.space }>
            <div className = { classes.left }>
              <Link to='/'>
                <IconButton aria-label="delete">
                  <HomeIcon style={{ color: '#fff' }}/>
                </IconButton>
              </Link>
            </div>
            < SearchForm />
            { isAuthenticated ? authLinks : guestLinks }
          </ToolBar>
        </AppBar>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
})

export default connect(mapStateToProps, { logoutUser })(withStyles(style)(Header))