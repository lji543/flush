import React from 'react';

import { connect } from 'react-redux';
// import { fetchAllUsers } from '../actions/userActions';

const style = {
  gridContainer: {
    minWidth: 350,
  },
  hr: {
    margin: 20,
  },
  typeDiv: {
    paddingLeft: 40,
  },
};

class Favorites extends React.Component {
  componentDidMount() {
    //
  }

  render() {
    return (
      <div>my faves</div>
    );
  }
}
const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = {
  // fetchAllUsers,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favorites);
