import React from 'react';

import { connect } from 'react-redux';
import { fetchLocations } from '../actions/actions';

// import GoogleMapReact from 'google-map-react';

import MapContainer from '../components/MapContainer';

class MainView extends React.Component {

  componentWillMount() {
    this.props.fetchLocations();
  }

  render() {
    // console.log(this.props)
    return (
      <div>
        <MapContainer/>
      </div>
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
