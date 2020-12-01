import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './pages/App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Landing from "./pages/Landing";

import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";

// MSAL configuration
const configuration = {
  auth: {
    clientId: "d0984d5d-b8cf-42b9-9002-3a11685c34d6",
    redirectUri: "http://localhost:2000/home", //defaults to application start page
    postLogoutRedirectUri: "http://localhost:2000",
  }
};

const pca = new PublicClientApplication(configuration);

ReactDOM.render(
  <MsalProvider instance={pca}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing}/>
        <Route component={App}/>
      </Switch>
    </BrowserRouter>
  </MsalProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
