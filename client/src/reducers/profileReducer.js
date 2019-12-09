import {
  LOAD_PROFILE,
  GET_PROFILE,
  SEARCH_USERS
} from '../constants'

const intialState = {
  loading: false,
  user: null
}

export default function ( state = intialState, action) {
  switch(action.type) {
    case LOAD_PROFILE:
      return {
        ...state,
        loading: true
      }
      case GET_PROFILE:
        return {
          ...state,
          loading: false,
          user: action.payload
        }
      case SEARCH_USERS:
        return {
          ...state,
          loading: false,
          list: action.payload 
        }
    default:
      return state
  }
}