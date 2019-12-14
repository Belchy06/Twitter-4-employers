import {
  LOAD_PROFILE,
  GET_PROFILE,
  GET_USERPOSTS,
  ADDUSER_POST
} from '../constants'

const intialState = {
  loading: false,
  user: null,
  posts: []
}

export default function ( state = intialState, action) {
  switch(action.type) {
    case LOAD_PROFILE:
      return {
        ...state,
        loading: true
      }
      case GET_PROFILE:
        console.log('getting profile')
        return {
          ...state,
          loading: false,
          user: action.payload
        }
      case GET_USERPOSTS:
        return {
          ...state,
          loading: false,
          posts: action.payload
        }
      case ADDUSER_POST: {
        return {
          ...state,
          posts: [action.payload, ...state.posts]
        }
      }
    default:
      return state
  }
}