import React from 'react';
// import ReactDOM from 'react-dom';

class MapMarker extends React.Component {
  // constructor(props) {
  //   super(props);
  //
  // }

  componentDidUpdate(prevProps) {
    console.log(prevProps)
    if ((this.props.map !== prevProps.map) ||
      (this.props.position !== prevProps.position)) {
        this.renderMarker();
    }
  }

  renderMarker() {
    console.log(this.props)
    let {
      map, google, position, mapCenter
    } = this.props;

    let pos = position || mapCenter;
    position = new google.maps.LatLng(pos.lat, pos.lng);

    const pref = {
        map: map,
        position: position
      };
    this.marker = new google.maps.Marker(pref);
  }

  render() {
    // console.log('marker')
    // return null;
    return (
      <div>hi</div>
    )
  }
};

export default MapMarker;
