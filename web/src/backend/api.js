import {get, post, deleteData, patch} from './http';
import * as Setting from "../utils/Setting";
const multiDownload = require('multi-download');

// local test
// const baseUrl = '/api'
// vm test

// Production Env
// const baseUrl = 'https://api.opennetlab.org/api';

// DEV Env
const baseUrl = 'https://dev-api.opennetlab.org/api';
// create job
export const sendCreateJobReq = (params = {}) => {
  const createJobDefaultParams = {"RequiredMachineNumber": 2, "userId": Setting.getUserId()};
  for (const key of Object.keys(params)) {
    createJobDefaultParams[key] = params[key];
  }
  return post(`${baseUrl}/jobs`, createJobDefaultParams);
};

// get one job info
export const getJobInfo = (jobId) => {
  return get(`${baseUrl}/display/jobDetail/${jobId}`);
};

// get job info list
export const allJobInfo = (userId = Setting.getUserId()) => {
  const param = {userId: userId, currentPage: 0, pageSize: 99999};
  return get(`${baseUrl}/display/jobList`, param);
};

// delete job
export const deleteJob = (jobId, data = {}, header = {}) => {
  return deleteData(`${baseUrl}/jobs/${jobId}`, data, header);
};

// restart job
export const restartJob = (jobId, params = {}) => {
  return post(`${baseUrl}/${jobId}/restart`, params);
};

// stop job
const defaultParam = '[{"value": 1,"path": "status", "op": "replace"}]';
export const stopJob = (jobId, params = defaultParam) => {
  return patch(`${baseUrl}/jobs?id=${jobId}`, params);
};

// download dataset
//GET http://opennetlab.org/api/results/download/e0000001-0000-0000-0000-000000000001?filename=webrtc_send_20201119082250.log,
export const downloadDataset = (jobId, filename) => {
  const param = {'filename': filename};
  return get(`${baseUrl}/results/download/${jobId}`, param);
};

// get user name by user id
// export const getUserName = (userId = '00000000-0000-0000-0000-000000000001') => {
//   const url = baseUrl + '/users' + '/' + userId;
//   return get(url);
// };

// run job
export const runApp = (jobId, appName, params) => { //
  const url = `${baseUrl}/display/runJob/${jobId}?appName=${appName}`;
  return post(url, params);
};

// get user ID
export const getUserId = () => {
  return get(`${baseUrl}/auth`)
    .then((res) => {
      const userId = res.id;
      localStorage.setItem("userId", userId);
      const role = res.role;
      localStorage.setItem("role", role);
    })
    .catch(err => {
      localStorage.setItem("userId", "forbidden");
      localStorage.setItem("role", "forbidden");
      // alert(err);
    });
};

export const getMyJobStates = (userId = Setting.getUserId()) => {
  return get(`${baseUrl}/display/jobStatistics?userId=${userId}`);
};

export const getGlobalJobStates = () => {
  return get(`${baseUrl}/display/jobStatistics`);
};

export const getGlobalMachineStates = () => {
  return get(`${baseUrl}/display/machineStatistics`);
};

export const getMachineLocations = () => {
  return get(`${baseUrl}/display/machineLocation`);
};

export const downloadMultipleFiles = (data) => {
  const urls = data.map(dataItem => `${baseUrl}/results/download/${dataItem.id}?filename=${dataItem.file}`);
  multiDownload(urls);
};
