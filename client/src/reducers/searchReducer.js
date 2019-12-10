import {
  SEARCH_USERS,
  SEARCH_POSTS,
  SEARCHING
} from '../constants'

const intialState = {
  searching: false,
  profiles: [],
  posts: []
}

export default function ( state = intialState, action) {
  switch(action.type) {
    case SEARCHING:
      return {
        ...state,
        loading: true
      }
      case SEARCH_POSTS:
        return {
          ...state,
          loading: false,
          posts: action.payload
        }
      case SEARCH_USERS:
        return {
          ...state,
          loading: false,
          profiles: action.payload
        }
    default:
      return state
  }
}