// import axios from "axios";

import axios from './axios.js'


export const getData = (params) => {
    return axios
    .get('/users/' + params)
    .then(res => {
        return res
    })
    .catch(err => {
        console.log('err', err) 
    })   
}



