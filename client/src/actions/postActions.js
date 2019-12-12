import axios from 'axios'
import { ADD_POST, SERVER_URL, GET_POSTS, LOADING_POSTS, LIKE_POST, UNLIKE_POST, ADDUSER_POST } from '../constants'
import { getPostsByUserId } from './profileActions'

export const addPost = postData => dispatch => {
  axios.post(SERVER_URL + 'api/posts/add', postData)
    .then(res => dispatch({ type: ADD_POST, payload: res.data }))
    .then(res => dispatch({ type: ADDUSER_POST, payload: res.payload}))
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

export const likePost = (postId) => dispatch => {
  axios.post(SERVER_URL + 'api/posts/like', { postId })
    .then(res => dispatch({
      type: LIKE_POST,
      payload: res.data
    }))
    .catch(err => console.log(err))
}

export const unlikePost = (postId) => dispatch => {
  axios.post(SERVER_URL + 'api/posts/unlike', { postId })
    .then(res => dispatch({
      type: UNLIKE_POST,
      payload: res.data
    }))
    .catch(err => console.log(err))
}