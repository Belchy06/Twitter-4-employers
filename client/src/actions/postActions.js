import axios from 'axios'
import { ADD_POST, SERVER_URL, GET_POSTS, LOADING_POSTS } from '../constants'

export const addPost = postData => dispatch => {
  axios.post(SERVER_URL + 'api/posts/add', postData)
    .then(res => dispatch({
      type: ADD_POST,
      payload: res.data
    }))
    .catch(err => console.log(err))
}

export const getPosts = () => dispatch => {
	dispatch(loadPosts)
	axios.get(SERVER_URL + 'api/posts')
		.then(res => dispatch({
			type: GET_POSTS,
			payload: res.data 
    }))
		.catch(err => console.log(err))
}

export const loadPosts = () => {
  return {
    type: LOADING_POSTS
  }
}