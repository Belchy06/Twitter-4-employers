import { 
  ADD_POST,
  LOADING_POSTS,
  GET_POSTS,
  LIKE_POST,
  UNLIKE_POST
} from '../constants'
import update from 'react-addons-update';

const initialState = {
  list: [],
  loading: false,
}

export default function ( state = initialState, action ) {
  let index
  switch(action.type) {
    case ADD_POST:
      return {
        ...state,
        list: [action.payload, ...state.list]
      }
    case LOADING_POSTS:
      return {
        ...state,
        loading: true
      }
    case GET_POSTS:
      return {
        ...state,
        loading: false,
        list: action.payload
      }
    case LIKE_POST:
      index = state.list.findIndex(o => o._id === action.payload.postId)
      return update(state, {
        list: {
          [index]: {
            likes: {$set: [action.payload.userId, ...state.list[index].likes]}
          }
        }
      })
    case UNLIKE_POST:
      console.log(state)
      console.log(action.payload)
      index = state.list.findIndex(o => o._id === action.payload.postId)
      let totalLikes = state.list[index].likes.filter(item => item !== action.payload.userId)
      return update(state, {
        list: {
          [index]: {
            likes: {$set: totalLikes}
          }
        }
      })
    default: 
      return state
  }
}