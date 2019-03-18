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

class MainView extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    //
  }

  render() {
    // console.log(this.props)
    return (
      <div>name list view </div>
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
)(MainView);
