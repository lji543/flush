import { FETCH_LOCATIONS, FETCH_MAP, FETCH_GOOGLE } from '../actions/actions';

export default (state = {}, { type, locations, map, googleInstance }) => {
  switch (type) {
    case FETCH_MAP:
    // console.log(locations, map)
      state.map = map;
      return state;
    case FETCH_GOOGLE:
    // console.log(locations, map)
      // TODO does this need to be added to state and not just returned?
      state.googleInstance = googleInstance;
      return state;
    case FETCH_LOCATIONS:
    // console.log(locations, map)
      // TODO does this need to be added to state and not just returned?
      state.locations = locations;
      return state;
    default:
      return state;
  }
};
