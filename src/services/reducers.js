import {
  SET_ID,
  SET_NAME_TRIP,
  SET_DESTINATION,
  SET_DATE,
  SET_ASSESSMENT,
  SET_DESCRIPTION,
} from './actions';

const defaultState = {
  id: 0,
  name: '',
  destination: '',
  date: '',
  assessment: '',
  description: '',
};

function payloadReducer(state, action) {
  switch (action.type) {
    case SET_ID:
      return {...state, id: action.payload};
    case SET_NAME_TRIP:
      return {...state, name: action.payload};
    case SET_DESTINATION:
      return {...state, destination: action.payload};
    case SET_DATE:
      return {...state, date: action.payload};
    case SET_ASSESSMENT:
      return {...state, assessment: action.payload};
    case SET_DESCRIPTION:
      return {...state, description: action.payload};
    default:
      return defaultState;
  }
}

export default payloadReducer;
