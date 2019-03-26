import { FETCH_LOCATIONS, DELETE_LOCATION } from '../actions/actions';

export default (state = {}, { type, locations }) => {
  switch (type) {
    case DELETE_LOCATION:
      // let test = {...state};
      console.log(state.locations)

      // if (currentCart[action.item] > 1) {
      //   currentCart[action.item] -= 1;
      // } else {
      //   delete currentCart[action.item];
      // }
      // return currentCart;
      state.locations = locations;
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
