import firebase from '../staticConfig/firebase';

export const FETCH_LOCATIONS = 'FETCH_LOCATIONS';
export const FETCH_MAP = 'FETCH_MAP';
export const FETCH_GOOGLE = 'FETCH_GOOGLE';

export const fetchLocations = () => dispatch => {
  let locations = [];
  let collection = firebase.firestore().collection('locations');

  collection.get().then((snapshot) => {
    snapshot.forEach(doc => {
      locations.push(doc.data());
    });
  });

  dispatch({
    type: FETCH_LOCATIONS,
    locations:locations,
  });
};

export const fetchGoogle = () => {
  let googleInstance = 'hi';
  // let collection = firebase.firestore().collection('locations');
  //
  // collection.get().then((snapshot) => {
  //   snapshot.forEach(doc => {
  //     locations.push(doc.data());
  //   });
  // });

  return {
    type: FETCH_GOOGLE,
    googleInstance: googleInstance,
  };
};

export const fetchMap = (google, currentLoc, zoom, node, markers) => {
  // const center = new google.maps.LatLng(currentLoc.lat, currentLoc.lng);
  // const mapConfig = Object.assign({}, {
  //   center: center,
  //   zoom: zoom
  // })
  //
  // let map = new google.maps.Map(node, mapConfig);
  // // let maps = new google.maps
  // // let map = maps.Map(node, mapConfig);
  // console.log(markers)
  //
  // markers.map(m => {
  //   let marker = new google.maps.Marker({
  //     position: {
  //       lat: m.lat,
  //       lng: m.lng
  //     },
  //     map: this.map,
  //     title: m.name
  //   })
  //   marker.addListener('click', () => this.props.handleMarkerClick(m.id));
  //   return marker;
  // });
  //
  // return {
  //   type: FETCH_MAP,
  //   // map: map,
  //   // center: center,
  //   markers: markers
  // };
};
