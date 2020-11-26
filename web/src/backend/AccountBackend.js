import * as Setting from "../Setting";

export function getUser(username) {
  return fetch(`${Setting.ServerUrl}/api/get-user?username=${username}`, {
    method: 'GET',
    credentials: 'include'
  }).then(res => res.json());
}

export function getAccount() {
  return fetch(`${Setting.ServerUrl}/api/get-account`, {
    method: 'GET',
    credentials: 'include'
  }).then(res => res.json());
}

export function register(values) {
  return fetch(`${Setting.ServerUrl}/api/register`, {
    method: 'POST',
    credentials: "include",
    body: JSON.stringify(values),
  }).then(res => res.json());
}

export function login(values) {
  return fetch(`${Setting.ServerUrl}/api/login`, {
    method: 'POST',
    credentials: "include",
    body: JSON.stringify(values),
  }).then(res => res.json());
}

export function logout() {
  return fetch(`${Setting.ServerUrl}/api/logout`, {
    method: 'POST',
    credentials: "include",
  }).then(res => res.json());
}
