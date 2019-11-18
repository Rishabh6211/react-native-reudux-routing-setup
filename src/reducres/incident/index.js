import * as types from "../../actionTypes/";
import Immutable from "seamless-immutable";

const initialState = Immutable({
  data: null // 'login' / 'after-login'
});

export default function incident(state = initialState, action = {}) {
  switch (action.type) {
    case types.INCIDENT_FORM_SUCCESS:
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
}
