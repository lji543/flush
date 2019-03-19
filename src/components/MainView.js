import React from 'react';

import { connect } from 'react-redux';
import { fetchLocations } from '../actions/actions';

class MainView extends React.Component {
  // constructor() {
  //   super()
  // }

  componentDidMount() {
    this.props.fetchLocations();
  }

  render() {
    return (
      <div>Main view </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = {
  fetchLocations,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainView);
