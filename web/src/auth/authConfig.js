import apiConfig from "./apiConfig";
import b2cPolicies from "./policies";

// MSAL configuration
// https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/46886ff0856ce02e0d2113525ccb05bb68f92a93/lib/msal-browser/docs/configuration.md
export const msalConfig = {
  auth: {
    clientId: "170cd5f3-4611-4882-a714-235c1390b138",
    authority: b2cPolicies.authorities.signUpSignIn.authority,
    knownAuthorities: [b2cPolicies.authorityDomain],
    redirectUri: "https://v2.opennetlab.org/home", //defaults to application start page
    // postLogoutRedirectUri: "http://localhost:2000",
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: ["openid", apiConfig.b2cScopes[0]],
};

export const tokenRequest = {
  scopes: [apiConfig.b2cScopes[0]],  // e.g. ["https://fabrikamb2c.onmicrosoft.com/helloapi/demo.read"]
  forceRefresh: false // Set this to "true" to skip a cached token and go to the server to get a new token
};
