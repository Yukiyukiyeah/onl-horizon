import { Col, Row } from "antd";
import React from "react";
import submitImg from  '../../assets/submit-img.png';
import { Link } from "react-router-dom";

const LastTab = (props) => {
  const { title } = props;
  return (
    <Row className="last-tab-container" justify="center">
      <Col span={20}>
        <Row className="container" justify="center">
          <div className="success-img">
            <img src={submitImg} style={{width:"139px", height:"139px"}}/>
          </div>
        </Row>
        <Row justify="center"><p className="taskName" >{title}</p></Row>
        <Row justify="center"><p className="status">Submitted successfully!</p></Row>
        <Row justify="center">
          <div className="link-text">
            <span>You can find your job in the</span>
            <Link to="/jobs"><span className="link"> Job List</span></Link>
          </div></Row>
      </Col>
    </Row>
  );
};

export default LastTab;