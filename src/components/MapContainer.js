import React from 'react';

import { connect } from 'react-redux';
import { fetchLocations } from '../actions/actions';

import { googleMapsAPIKey } from '../staticConfig/constants';

// import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import { GoogleApiWrapper } from 'google-maps-react';
import Map from './Map';
// import MapMarker from './MapMarker';

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

  handleMarkerClick = (id) => {
    let loc = this.props.data.locations.filter(loc => {
      return loc.id === id;
    })
    console.log(loc)
    this.setState({
      selectedLoc: loc[0],
      // activeMarker: marker,
      showInfoWindow: true
    });
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

    // console.log(this.state.showInfoWindow)
    // <InfoWindow
    //   visible = { this.state.showInfoWindow }>
    // laura
    // </InfoWindow>
    //markers={this.state.markers}
    // console.log(this.props)
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
          >
        </Map>
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

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(MapContainer);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoogleApiWrapper({
  apiKey: googleMapsAPIKey
})(MapContainer));

// export default GoogleApiWrapper({
//   apiKey: googleMapsAPIKey
// })(MapContainer)
