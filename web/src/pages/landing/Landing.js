import React, {useContext /*useState*/} from 'react';
import {Row, Col, Avatar} from 'antd';

import * as Setting from "../../utils/Setting";
import {Redirect, Route, Switch, useHistory} from "react-router-dom";
import {MsalContext} from "@hsluoyz/msal-react";

import LandingPage from "./LandingPage";
import AboutPage from "./AboutPage";
import ContactPage from "./ContactPage";

import '../../styles/Landing.scss';


const Landing = () => {
  const history = useHistory();
  const msalContext = useContext(MsalContext);
  console.log(msalContext.accounts);


  const renderAvatar = () => {
    const account = Setting.getAccount(msalContext);
    const imageSrc = Setting.getAvatarSrc();
    const name = account.name;
    if (imageSrc === "") {
      return (
        <div>
          <Avatar size="large" style={{ backgroundColor: Setting.getAvatarColor(account.name), verticalAlign: 'middle' }}>
            {Setting.getFirstName(account.name)}
          </Avatar>
          &nbsp;
          &nbsp;
          <span style={{fontWeight: "bold"}}>{Setting.isMobile() ? null : name}</span>
          &nbsp;
          &nbsp;
          &nbsp;
        </div>
      );
    } else {
      return (
        <div>
          <Avatar size="large" src={imageSrc} />
          &nbsp;
          &nbsp;
          <span style={{fontWeight: "bold", fontColor: "#FFFFFF"}}>{Setting.isMobile() ? null : name}</span>
          &nbsp;
          &nbsp;
          &nbsp;
        </div>
      );
    }
  };

  return (
    <div className="landing-container">
      <div className="landing-header-container">
        <Row className="landing-header" justify="space-between" align="top">
          <div className="landing-header-container">
            <div className="landing-logo">
              {
                Setting.isMobile() ? null : <a className="logo" href={"/"} />
              }
            </div>
            <ul className="landing-nav">
              <li className="landing-nav-item">
                <a href="#">RESEARCH</a>
              </li>
              <li className="landing-nav-item">
                <a href="#">DATA</a>
              </li>
              <li className="landing-nav-item">
                <a href="/about">ABOUT US</a>
              </li>
              <li className="landing-nav-item">
                <a href="/join">JOIN US</a>
              </li>
              <li>
                <div className="landing-profile">
                  {msalContext.accounts.length === 0 ? null : renderAvatar()}
                </div>
              </li>
            </ul>
          </div>
        </Row>
      </div>
      <div className="landing-content-container">
        <Switch>
          <Route exact path="/" component={LandingPage}/>
          <Route path="/about" component={AboutPage}/>
          <Route path="/contact" component={ContactPage} />
          <Redirect to="/" />
        </Switch>
      </div>

    </div>
  );
};

export default Landing;
