import React, { useState, useEffect } from 'react';
import {Button, Upload, Col, Row} from "antd";
import AdvInput from "../../components/AdvInput";
import '../../styles/SubmitChallenge.scss';

const SubmitChallenge = (props) => {
  const [modelName, setModelName] = useState("");
  return(
    <div className="submit-challenge-container">
      <Row className="content-zone" justify="center">
        <Col span={20}>
          <p className="title">Challenge</p>
          <div className="model-name">
            <AdvInput
              type="normal"
              title="Name"
              placeholder="the name of model"
              widthRange={[200, 1200]}
              isAdaptive={true}
              height="40px"
            />
          </div>

          <Row className="model">
            <AdvInput
              type="normal"
              title="Model Upload"
              placeholder={modelName}
              widthRange={[200, 400]}
              isAdaptive={false}
              height="40px"
            />
            <div className="upload">
              <Upload {...props} >
                <Button>Browse</Button>
              </Upload>
            </div>
          </Row>
        </Col>
      </Row>
      <Row justify="end">
        <Col span={4}>
          <Button type="primary" onClick={props.handleNext}>NEXT</Button>
        </Col>
      </Row>
    </div>
  );
};


export default SubmitChallenge;