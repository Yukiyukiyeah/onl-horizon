import {message} from "antd";
import {isMobile as isMobileDevice} from "react-device-detect";
import {PublicClientApplication} from "@hsluoyz/msal-browser";
import {msalConfig} from "../auth/authConfig";

export let ServerUrl = '';

export const pca = new PublicClientApplication(msalConfig);

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

// 会向发出新的http请求
export function goToLink(link) {
  window.location.href = link;
}

// 不发出新的HTTP调用
export function goToLinkSoft(history, link) {
  history.push(link);
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

// context:{
// accounts: []
// inProgress: "none"
// instance: PublicClientApplication {isBrowserEnvironment: true, config: {…}, browserCrypto: CryptoOps, networkClient: FetchClient, logger: Logger, …}
// __proto__: Object
// }
export function getAccount(context) {
  if (context.accounts.length > 0) {
    return context.accounts[0];
  } else {
    return null;
  }
}

export function getAuthorizationHeader() {
  const accounts = pca.getAllAccounts();
  if (accounts.length === 0) {
    return "";
  }

  const account = accounts[0];
  if (account === null) {
    return "";
  } else {
    return `Bearer ${account.rawToken}`;
  }
}

export function getIdpAuthorizationHeader() {
  const accounts = pca.getAllAccounts();
  if (accounts.length === 0) {
    return "";
  }

  const account = accounts[0];
  if (account === null) {
    return "";
  } else {
    return `Bearer ${account.idTokenClaims.idp_access_token}`;
  }
}

// export function getAccountToken(context) {
//   const account = getAccount(context);
//   if (account === null) {
//     return Promise.resolve(null);
//     // return null;
//   }
//
//   return context.instance.acquireTokenSilent({
//     // scopes: ["User.Read"],
//     scopes: ["openid", "email", "profile"],
//     account: account,
//   });
// }

export function renderJson(object) {
  return JSON.stringify(object, null, 2);
}

export function getAvatarSrc() {
  const avatarData = localStorage.getItem("avatar");
  if (avatarData === null) {
    return "";
  } else {
    return `data:image/jpeg;base64,${avatarData}`;
  }
}

export function getUserId() {
  // return "E0000003-0000-0000-0000-000000000003";
  return localStorage.getItem("userId");
}

export const appTypeMap = {
  AlphaRTC: "WebRTC",
  Probing: "Iperf",
};

export const appTypeMapR = {
  WebRTC: "AlphaRTC",
  Iperf: "Probing",
};
