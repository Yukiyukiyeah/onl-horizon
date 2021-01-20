import axios from 'axios';
import * as Setting from "../utils/Setting";

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

function getAxiosConfig(params, data) {
  const authHeader = Setting.getAuthorizationHeader();
  let res = {};

  if (authHeader !== "") {
    res.headers = {"Authorization": authHeader};
  }
  if (params !== null) {
    res.params = params;
  }
  if (data !== null) {
    res.data = data;
  }

  return res;
}

function getAxiosConfigIdp(params, data) {
  const authHeader = Setting.getIdpAuthorizationHeader();
  let res = {};

  if (authHeader !== "") {
    res.headers = {"Authorization": authHeader};
  }
  if (params !== null) {
    res.params = params;
  }
  if (data !== null) {
    res.data = data;
  }

  res.responseType = "arraybuffer";

  return res;
}

const getHeaderToken = () => {
  return {
    'Content-Type': 'application/json',
    'Authorization': Setting.getAuthorizationHeader()
  };
};

/**
 * get method
 * @param {String} url [request url]
 * @param {Object} params [request parameters]
 */

export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, getAxiosConfig(params))
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
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params, {
      headers: getHeaderToken()
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
 * post file method
 * @param {String} url [request url]
 * @param {Object} params [request parameters]
 */
export function postFile(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': Setting.getAuthorizationHeader()
      }
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
 * deleteData method
 * @param {String} url [request url]
 * @param {Object} params [request parameters]
 */

// eslint-disable-next-line no-unused-vars
export function deleteData(url, data, header) {
  return new Promise((resolve, reject) => {
    axios.delete(url, getAxiosConfig(null, data))
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
    axios.patch(url, getAxiosConfig(params))
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data);
      });
  });
}

export function getAvatar() {
  const url = "https://graph.microsoft.com/beta/me/photo/$value";
  return new Promise((resolve, reject) => {
    axios.get(url, getAxiosConfigIdp(null))
      .then(res => {
        const buffer = Buffer.from(res.data, 'binary').toString('base64');
        localStorage.setItem("avatar", buffer);
        resolve(buffer);
      })
      .catch(err => {
        console.log(err);
        localStorage.removeItem("avatar");
        // alert(err);
        reject(err.data);
      });
  });
}
