// import axios from "axios";

import axios from './axios.js'

export const getPlayerInfoById = id => {
  return axios.get(`/users/${id}`)
}
