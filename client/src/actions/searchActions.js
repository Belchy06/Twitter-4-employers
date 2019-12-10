import axios from 'axios'
import { SEARCHING, SERVER_URL, SEARCH_POSTS, SEARCH_USERS } from '../constants'

export const searchUsers = (query) => dispatch => {
  dispatch(loadProfile())
  axios.post(SERVER_URL + `api/users/${query}`)
    .then(res => dispatch({
      type: SEARCH_USERS,
      payload: res.data
    }))
    .catch(err => console.log(err))
}

export const searchPosts = (query) => dispatch => {
  dispatch(loadProfile())
  axios.post(SERVER_URL + `api/posts/${query}`)
    .then( res => dispatch({
      type: SEARCH_POSTS,
      payload: res.data
    }))
    .catch(err => console.log(err))
}

export const loadProfile = () => {
  return {
    type: SEARCHING
  }
}

export const loadPosts = () => {
  return {
    type: SEARCHING
  }
}