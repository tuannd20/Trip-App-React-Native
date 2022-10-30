export const SET_ID = 'SET_ID';
export const SET_NAME_TRIP = 'SET_NAME_TRIP';
export const SET_DESTINATION = 'SET_DESTINATION';
export const SET_DATE = 'SET_DATE';
export const SET_ASSESSMENT = 'SET_ASSESSMENT';
export const SET_DESCRIPTION = 'SET_DESCRIPTION';

export const setId = id => dispatch => {
  dispatch({
    type: SET_ID,
    payload: id,
  });
};

export const setName = name => dispatch => {
  dispatch({
    type: SET_NAME_TRIP,
    payload: name,
  });
};

export const setDestination = destination => dispatch => {
  dispatch({
    type: SET_DESTINATION,
    payload: destination,
  });
};

export const setDate = date => dispatch => {
  dispatch({
    type: SET_DATE,
    payload: date,
  });
};

export const setAssessment = assessment => dispatch => {
  dispatch({
    type: SET_ASSESSMENT,
    payload: assessment,
  });
};

export const setDescription = description => dispatch => {
  dispatch({
    type: SET_DESCRIPTION,
    payload: description,
  });
};
