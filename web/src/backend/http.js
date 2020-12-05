import axios from 'axios';
import {getAuthorizationHeader} from "../utils/Setting";

/* change the base url based on the environment
if (process.env.NODE_END == 'development') {
    axios.defaults.baseURL = ''
}
else if (process.env.NODE_END == 'debug') {
    axios.defaults.baseURL = ''
}

else if (process.env.NODE_END == 'production') {
    axios.defaults.baseURL = ''
}*/


// defalut timeout
axios.defaults.timeout = 100000;

// set header of post request
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.patch['Content-Type'] = 'application/json';

/*
axios.interceptors.request.use(
    config => {

    },
    error => {

    }
)*/

/**
 * get method
 * @param {String} url [request url]
 * @param {Object} params [request parameters]
 */
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    const authHeader = getAuthorizationHeader();
    axios.get(url, authHeader === "" ?
      {params: params} :
      {params: params, headers: {"Authorization": authHeader}}
    )
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}

/**
 * post method
 * @param {String} url [request url]
 * @param {Object} params [request parameters]
 */

export function post(url, params, data) {
  return new Promise((resolve, reject) => {
    axios.post(url, params, data)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}

/**
 * deleteData method
 * @param {String} url [request url]
 * @param {Object} params [request parameters]
 */

export function deleteData(url, data, header) {
  return new Promise((resolve, reject) => {
    axios.delete(url, {
      data: data,
      header: header
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}

/**
 * patch method
 * @param {String} url [request url]
 * @param {Object} params [request parameters]
 */

export function patch(url, params) {
  return new Promise((resolve, reject) => {
    axios.patch(url, params)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}
