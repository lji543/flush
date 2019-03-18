import React from 'react';
// import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
// import { logout } from '../actions/authActions';

import ListView from './ListView';
import MainView from './MainView';
import Favorites from './Favorites';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const NavBar = props => {
  console.log(props)
  const menuItems = [
    {
      text: 'Home',
      // onClick: () => history.push('/'),
      path: '',
      component: MainView
    },
    {
      text: 'List',
      // onClick: () => history.push('/list'),
      path: 'list',
      component: ListView
    },
    {
      text: 'My Favorites',
      // onClick: () => history.push('/favorites'),
      path: 'favorites',
      component: Favorites
    },
  ]

// onClick={() => history.push(`/${item.path}`)}
// add redirect
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          {menuItems.map((item,idx) => {
            return (
              <Button key={idx}
                color="inherit"

                >{item.text}
              </Button>
            )
          })}
        </Toolbar>
      </AppBar>

      <div style={{ marginTop: '56px' }}>
        <Switch>
          {menuItems.map((item,idx) => {
            return (
              <Route key={idx}
                exact path={`/${item.path}`}
                component={item.component}
              />
            )
          })}
        </Switch>
      </div>
    </div>
  )
}

export default NavBar

// <NavigationBar
//   menuItems={[
//     {
//       text: 'Faces',
//       onClick: () => history.push('/'),
//     },
//     {
//       text: 'Teams',
//       onClick: () => history.push('/teams'),
//     },
//     {
//       text: 'Add new user',
//       onClick: () => history.push('/newUser'),
//     },
//     ...(given_name ? [{ text: 'Profile', onClick: () => history.push('/profile') }] : []),
//     {
//       text: given_name ? 'Logout' : 'Login',
//       onClick: () => {
//         logout();
//         history.push('/login');
//       },
//     },
//   ]}
// />
