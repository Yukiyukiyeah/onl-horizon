import { Col, Row, Steps } from "antd";
import React from "react";
import submitImg from  '../../assets/submit-img.png';
import { Link } from "react-router-dom";
const { Step } = Steps;

const LastTab = (props) => {
  const { title, error, curStatusStep } = props;
  return (
    <Row className="last-tab-container" justify="center">
      <Col span={20}>
        <Row justify="center"><p className="taskName" >{title}</p></Row>
        <Row style={{marginTop: 100}}>
          <Steps current={curStatusStep} status={error ? "error" : "finish"}>
            <Step title="Finished" description="Job configure has been completed" />
            <Step title="Created" description="Job is created successfully" />
            <Step title="Running" description="Job is running" />
          </Steps>,
        </Row>
        {curStatusStep > 0 && (<Row justify="center">
          <div className="link-text">
            <span>You can find your job in the</span>
            <Link to="/jobs"><span className="link"> Job List</span></Link>
          </div>
        </Row>)
        }
      </Col>
    </Row>
  );
};

export default LastTab;