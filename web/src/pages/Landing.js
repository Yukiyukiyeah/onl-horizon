import React, { useState } from 'react';
import { Row, Col } from 'antd';
import loginButton from '../assets/login-button.png';
import chat from '../assets/landing-chat.png';
import data from '../assets/landing-data.png';
import realtime from '../assets/landing-data.png';
import map from '../assets/landing-map.png';
import { useHistory } from "react-router-dom";

import '../styles/Landing.scss';

const Landing = () => {
  const history = useHistory();
  const handleLogin = () => {
    history.push("/home")
  };

  return (
    <div className="container">
      <Row className="home-hero">
        <div className="bg">
          <p className="bg-title">What's OpenNetLab</p>
          <p className="bg-description">OpenNetLab is to build
            and provide a distributed networking platform with many collaborative nodes
            and a common benchmarking dataset (a.k.a imageNet in Networking Area)
            through this platform for the researchers to collect real networking data and
            traning/evaluating their AI models for various networking environment,
            including Internet/cloud, Wireless and mobile network</p>
          <img src={loginButton} className="login" onClick={handleLogin} />
        </div>

      </Row>
      <Row class="chat" type="flex" justify="center" align="middle">
        <Col
          span={10} class="text right margin-right">
          <p className="title">Contribute to research comunity</p>
          <p className="description">Platform - Free to networking research community</p>
          <p className="description">Dataset - Publish to GitHub for researcher to reproduce the experiments and train
            models</p>
        </Col>;
        <Col span={10} class="img-container">
          <img className="img" src={chat} />
        </Col>;
      </Row>
      <Row class="data" type="flex" justify="center" align="middle">
        <Col
          span={10} class="img-container right margin-right">
          <img className="img " src={data} />
        </Col>
        <Col
          span={10} class="text left">
          <p className="title">Data Centric for networking-related AI</p>
          <p className="description">Automatic data collection, data storing, data aggregation, and data sharing</p>
        </Col>;
      </Row>
      <Row class="application" type="flex" justify="center" align="middle">
        <Col
          span={10} class="text right margin-right">
          <p className="title">Real applications</p>
          <p className="description">Real Time Communication (RTC)</p>
          <p className="description">Video/Data Streaming</p>
          <p className="description">Web Service/CDN</p>
          <p className="description">Other networking applications</p>
        </Col>;
        <Col span="10" class="img-container">
          <img className="img" src={realtime} />
        </Col>;
      </Row>
      <Row className="map" type="flex" justify="center" align="middle">
        <Col
          span={10} class="img-container right margin-right">
          <img className="img" src={map} />
        </Col>
        <Col
          span={10} class="text left">
          <p className="title">Distributed heterogenous test nodes</p>
          <p className="description">Geo-distributed testbed</p>
          <p className="description">Heterogenous network (LAN, wireless, 4G/5G, etc)</p>
          <p className="description">Web Service/CDN</p>
          <p className="description">Various user devices (desktop, Mobile, etc)</p>
        </Col>;
      </Row>
    </div>
  );
};

export default Landing;
