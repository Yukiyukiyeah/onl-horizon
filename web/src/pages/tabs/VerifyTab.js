import React from "react";
import {Row, Col, Steps, Button} from "antd";
const { Step } = Steps;
import '../../styles/VerifyTab.scss';
import ReactJson from 'react-json-view';

const VerifyTab = (props) => {
  const { handleNext, handlePrev, type } = props;
  const {title:title} = props.params;
  const steps = (
    <Steps className="steps" progressDot current={3}>
      <Step title="Create Job" />
      <Step title="Job Info" />
      <Step title="Host Info" />
      <Step title="Completed" />
    </Steps>
  );
  const stepsRow = (
    <Row className="steps-container" justify="space-between">
      <Col >
        <Button type="primary" className="prev-btn btn-text" onClick={handlePrev} >PREV</Button>
      </Col>
      <Col >
        {steps}
      </Col>
      <Col >
        <Button type="primary" className="next-btn btn-text" onClick={handleNext} >NEXT
        </Button>
      </Col>
    </Row>
  );
  return (
    <Row className="verify-tab-container" justify="center">
      <Col span={20}>
        <Row className="title-zone">
          <span className="title">Verify Job Config</span>
          <div className="sub-title">
            <span> {title} </span>
            <span>   |   </span>
            <span> {type}</span>
          </div>
        </Row>
        <Row className="content-zone">
          <ReactJson src={props.params}/>
        </Row>
      </Col>
      { stepsRow }
    </Row>
  );
};

export  default  VerifyTab;
