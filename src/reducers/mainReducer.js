import { FETCH_LOCATIONS } from '../actions/actions';

export default (state = {}, { type, locations }) => {
  switch (type) {
    case FETCH_LOCATIONS:
      // TODO does this need to be added to state and not just returned?
      return locations;
    default:
      return state;
  }
};
