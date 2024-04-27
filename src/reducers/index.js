import { combineReducers } from 'redux';
import { LOAD_USER_DATA } from '../redux/actions/app-action';

// Reducers
const initialState = {
  user: null
};

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOAD_USER_DATA:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};

// Combine Reducers
const rootReducer = combineReducers({
  user: userReducer,
  // Add other reducers here if you have more
});

export default rootReducer;