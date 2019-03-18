import React from 'react';
// import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
// import { logout } from '../actions/authActions';

import ListView from './components/ListView';
import MainView from './components/MainView';
import Favorites from './components/Favorites';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const Navigation = ({ history }) => {

  const menuItems = [
    {
      text: 'Home',
      path: '',
      component: MainView
    },
    {
      text: 'List',
      path: 'list',
      component: ListView
    },
    {
      text: 'My Favorites',
      path: 'favorites',
      component: Favorites
    },
  ]

//TODO add redirect / not found
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          {menuItems.map((item,idx) => {
            return (
              <Button key={idx}
                color="inherit"
                onClick={() => history.push(`/${item.path}`)}
                >
                {item.text}
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

export default withRouter(Navigation);
