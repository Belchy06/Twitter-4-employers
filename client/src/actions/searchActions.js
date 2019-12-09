import axios from 'axios'
import { SEARCH_POSTS, SEARCH_USERS, SERVER_URL } from '../constants'

export const searchUser = (searchData) => dispatch => {
  axios.post(SERVER_URL + `api/users/${searchData}`)
  .then(res => dispatch({
    type: SEARCH_USERS,
    payload: res.data
  }))
  .catch(err => console.log(err))
}