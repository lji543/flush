import firebase from '../staticConfig/firebase';

export const FETCH_LOCATIONS = 'FETCH_LOCATIONS';
export const DELETE_LOCATION = 'DELETE_LOCATION';

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

export const deleteLoc = (loc) => {
  return {
    type: DELETE_LOCATION,
    loc:loc
  }
};
