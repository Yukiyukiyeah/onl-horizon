import React from "react";
import AdvInput from "../../components/AdvInput";
import {Row, Column, Col, Upload, Button} from 'antd';
import * as Setting from "../../utils/Setting";
import {getUser} from "../../backend/api";

const SignUpPage = (props) => {

  return(
    <div className="signup-container">
      <Row className="landing-header" justify="space-between">
        <div>
          {
            Setting.isMobile() ? null : <a className="logo" href={"/"} />
          }
        </div>
        <div className="contact">
          <a href="/contact">CONTACT US</a>
        </div>
      </Row>
      <Row className="signup-panel-container">
        <Col span={20}>
          <p className="title">Supplement Information</p>
          <div className="model-name">
            <AdvInput
              type="normal"
              title="Name"
              placeholder="Model Name"
              widthRange={[200, 1200]}
              errorText="Please enter your name"
              isAdaptive={true}
              height="40px"
            />
          </div>

          <Row className="model">
            <AdvInput
              type="normal"
              title="Model Upload"
              widthRange={[200, 400]}
              errorText="Please upload your model"
              isAdaptive={false}
              height="40px"
              disabled={true}
            />
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default SignUpPage;