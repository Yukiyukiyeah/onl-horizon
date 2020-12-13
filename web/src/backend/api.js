import {get, post, deleteData, patch} from './http';
import * as Setting from "../utils/Setting";

// local test
// const baseUrl = '/api'
// vm test
const baseUrl = 'https://api.opennetlab.org/api';

// create job
export const sendCreateJobReq = (params = {}) => {
  const createJobDefaultParams = {"RequiredMachineNumber": 2, "userId": Setting.getUserId()};
  for (const key of Object.keys(params)) {
    createJobDefaultParams[key] = params[key];
  }
  return post(baseUrl + '/jobs', createJobDefaultParams);
};

// get one job info
export const getJobInfo = (jobId) => {
  const infoUrl = baseUrl + '/display/jobDetail/' + jobId;
  return get(infoUrl);
};

// get job info list
export const allJobInfo = (userId = Setting.getUserId()) => {
  const url = baseUrl + '/display/jobList';
  const param = {'userId': userId};
  return get(url, param);
};

// delete job
export const deleteJob = (jobId, data = {}, header = {}) => {
  const deleteJobId = baseUrl + '/jobs/' + jobId;
  return deleteData(deleteJobId, data, header);
};

// restart job
export const restartJob = (jobId, params = {}) => {
  const restartJobUrl = baseUrl + '/' + jobId + '/restart';
  return post(restartJobUrl, params);
};

// stop job
const defaultParam = '[{"value": 1,"path": "status", "op": "replace"}]';
export const stopJob = (jobId, params = defaultParam) => {
  const stopJobUrl = baseUrl + '/jobs?id=' + jobId;

  return patch(stopJobUrl, params);
};

// download dataset
//GET http://opennetlab.org/api/results/download/e0000001-0000-0000-0000-000000000001?filename=webrtc_send_20201119082250.log,
export const downloadDataset = (jobId, filename) => {
  const downloadUrl = baseUrl + '/results/download/' + jobId;
  const param = {'filename': filename};
  return get(downloadUrl, param);
};

// get user name by user id
export const getUserName = (userId = '00000000-0000-0000-0000-000000000001') => {
  const url = baseUrl + '/users' + '/' + userId;
  return get(url);
};

// run job
export const runApp = (jobId, appName, params) => { //
  const url = `${baseUrl}/display/runJob/${jobId}?appName=${appName}`;
  return post(url, params);
};

// get user ID
export const getUserId = () => {
  const infoUrl = baseUrl + '/auth';
  return get(infoUrl)
    // .then(res => res.json())
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
