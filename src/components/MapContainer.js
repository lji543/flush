import React from 'react';

import { connect } from 'react-redux';
import { fetchLocations } from '../actions/actions';

import { googleMapsAPIKey } from '../staticConfig/constants';

import { GoogleApiWrapper } from 'google-maps-react';
import Map from './Map';

const defaultData = {
  lat: 47.6062,
  lng: -122.3321,
  zoom: 12
}

class MapContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      center: {
        lat:defaultData.lat,
        lng:defaultData.lng
      },
      zoom: defaultData.zoom,
      showInfoWindow: false,
      activeMarker: {},
      selectedLoc: {},
      iwContent: 'hello'
    }
  };

  handleMarkerClick = (map,marker,iw) => {
    // console.log(marker,iw)
    iw.open(map, marker);

  };

  onMarkerClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showInfoWindow: false,
        activeMarker: null
      });
    }
  };

  handleMapMove = map => {
    console.log('you have moved the map! ',map)
  };

  render() {
    if (!this.props.loaded) {
      console.log(this.props)
      return <div>Loading...</div>
    }

    return (
      <div style={{ height: '70vh', width: '100%' }}>
        <Map
          google={this.props.google}
          zoom={this.state.zoom}
          initialCenter={{
            lat: this.state.center.lat,
            lng: this.state.center.lng
          }}
          onMove={this.handleMapMove}
          handleMarkerClick={this.handleMarkerClick}
          iwContent={this.state.iwContent}
        />
      </div>
    )
  }
};

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = {
  fetchLocations,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoogleApiWrapper({
  apiKey: googleMapsAPIKey
})(MapContainer));
