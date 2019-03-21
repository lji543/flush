import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import { fetchMap } from '../actions/actions';

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentLoc: {
        lat:this.props.initialCenter.lat,
        lng:this.props.initialCenter.lng
      },
      zoom: this.props.zoom
    }
  }

  static map;

  loadMap() {
    if (this.props && this.props.google) {
      const { google } = this.props;
      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      let { currentLoc, zoom } = this.state;
      // this.props.fetchMap(google, currentLoc, zoom, node, markers);
      // this.props.fetchMarkers(google, currentLoc, zoom, node);

      const center = new google.maps.LatLng(currentLoc.lat, currentLoc.lng);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom
      })

      this.map = new google.maps.Map(node, mapConfig);

      // // TODO improve and consolidate when adding more events
      // // https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/
      // let moveTimeout;
      // this.map.addListener('dragend', e => {
      //   if (moveTimeout) {
      //     clearTimeout(moveTimeout);
      //     moveTimeout = null;
      //   }
      //   moveTimeout = setTimeout(() => {
      //     this.props.onMove(this.map);
      //   }, 0);
      // })
    }
  }

  createMarkers() {
    const { google, data } = this.props;

    data.locations.map(m => {
      let marker = new google.maps.Marker({
        position: {
          lat: m.lat,
          lng: m.lng
        },
        map: this.map,
        title: m.name
      })
      marker.addListener('click', () => this.props.handleMarkerClick(m.id));
      return marker;
    });
  }

  componentDidMount() {
    this.loadMap();
    let timeout;
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    timeout = setTimeout(() => {
      this.createMarkers()
    }, 520);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps, prevState)
    if (this.props.data !== prevProps.data) {
      this.createMarkers();
    }
  }

  render() {
    return (
      <div style={{ height: '50vh', width: '100%' }} ref='map'>
        Loading Map...
      </div>
    )
  }
};

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = {
  fetchMap
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
