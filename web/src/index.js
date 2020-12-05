import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './pages/App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Landing from "./pages/Landing";

import { MsalProvider } from "@hsluoyz/msal-react";
import { PublicClientApplication } from "@hsluoyz/msal-browser";
import {msalConfig} from "./auth/authConfig";

const pca = new PublicClientApplication(msalConfig);

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
