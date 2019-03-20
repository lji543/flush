import React from 'react';

import { connect } from 'react-redux';
// import { fetchAllUsers } from '../actions/userActions';


class ListView extends React.Component {
  componentDidMount() {
    //
  }

  render() {
    return (
      <div>list view </div>
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
)(ListView);
