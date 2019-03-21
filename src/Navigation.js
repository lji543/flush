import React from 'react';

import { Route, Switch, withRouter } from 'react-router-dom';

import AddLocation from './components/AddLocation';
import Favorites from './views/Favorites';
import ListView from './views/ListView';
import MainView from './views/MainView';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const Navigation = ({ history }) => {
  // () => <item.component google={propsgoogle}/>

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
    {
      text: 'Add a New Spot',
      path: 'addnew',
      component: AddLocation
    },
  ]
  //
  // function grabGoogle() {
  //   console.log('google')
  // }

// component={item.component}
  //TODO add redirect / not found onClick={() => history.push(`/${item.path}`)}
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

// const mapStateToProps = state => {
//   return state;
// };
//
// const mapDispatchToProps = {
//   fetchGoogle
// };
//
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Navigation);


export default withRouter(Navigation);

// export default GoogleApiWrapper({
//   apiKey: googleMapsAPIKey
// })(Navigation)
