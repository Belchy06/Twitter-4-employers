import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles'
import { MenuList, MenuItem } from '@material-ui/core';

const style = {
  
}

class Drawer extends Component {
  render () {
    const drawer = (
      <div>
        <MenuList>
          <MenuItem to="/">
            Home
          </MenuItem>
          <MenuItem to="/login">
            Login
          </MenuItem>
          <MenuItem to="/signup">
            Signup
          </MenuItem>
        </MenuList>
      </div>
    )
    return drawer
  }
}

export default withStyles(style)(Drawer)