import {message} from "antd";
import {isMobile as isMobileDevice} from "react-device-detect";
import {tokenRequest} from "../auth/authConfig";

export let ServerUrl = '';

export function initServerUrl() {
  const hostname = window.location.hostname;
  if (hostname === 'localhost') {
    ServerUrl = `http://${hostname}:3000`;
  }
}

export function parseJson(s) {
  if (s === "") {
    return null;
  } else {
    return JSON.parse(s);
  }
}

export function goToLink(link) {
  window.location.href = link;
}

export function showMessage(type, text) {
  if (type === "") {
    return;
  } else if (type === "success") {
    message.success(text);
  } else if (type === "error") {
    message.error(text);
  }
}

export function isMobile() {
  // return getIsMobileView();
  return isMobileDevice;
}

export function getFirstName(s) {
  return s.split(' ')[0];
}

function getRandomInt(s) {
  let hash = 0;
  if (s.length !== 0) {
    for (let i = 0; i < s.length; i++) {
      let char = s.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
  }

  return hash;
}

export function getAvatarColor(s) {
  const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
  let random = getRandomInt(s);
  if (random < 0) {
    random = -random;
  }
  return colorList[random % 4];
}

export function getAccount(context) {
  if (context.accounts.length > 0) {
    return context.accounts[0];
  } else {
    return null;
  }
}

export function getAccountToken(context) {
  const account = getAccount(context);
  if (account === null) {
    return Promise.resolve(undefined);
    // return null;
  }

  let request = tokenRequest;
  request.account = account;
  return context.instance.acquireTokenSilent(request);
}
