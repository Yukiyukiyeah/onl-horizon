import React from 'react';
import {Col, Row, Button} from 'antd';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import '../styles/InfoCard.scss';
import dotGreen from '../assets/dot-green.svg';
import dotRed from '../assets/dot-red.svg';
import dotBlue from '../assets/dot-blue.svg';
import PieChart from "./PieChart";
import * as Setting from "../utils/Setting";

const InfoCard = (props) => {
  const {title, showIcon, valueAry, keyAry, showChart = false, height, width} = props;

  let history = useHistory();

  return (
    <div className="info-card-container">
      <div className="wrapper" style={{height:height, width:width}} >
        <Row className="title" justify="space-between">
          {title}
          {showChart && (<Link to="/jobs"><span className="link" style={{fontSize:14}}>{`Explore >>`} </span></Link>)}
        </Row>
        {showChart && <Row style={{marginTop: 0, paddingBottom:48}}>
          <PieChart data={{succeeded: valueAry[0], failed: valueAry[1], running: valueAry[2]}} />
        </Row>  }
        <div className="row-container">
          <Row className="row r1">
            <Col className="left">
              {
                showIcon && <img src={dotGreen} width={16} height={16}/>
              }
              <span className="key">{keyAry[0]}</span>
            </Col>
            <span className="value">{valueAry[0]}</span>
          </Row>
          <Row className="row r2">
            <Col className="left">
              {
                showIcon && <img src={dotRed} width={16} height={16}/>
              }
              <span className="key">{keyAry[1]}</span>
            </Col>
            <Col className="value">{valueAry[1]}</Col>
          </Row>
          <Row className="row r3">
            <Col className="left">
              {
                showIcon && <img src={dotBlue} width={16} height={16}/>
              }
              <span className="key">{keyAry[2]}</span>
            </Col>
            <Col className="value">{valueAry[2]}</Col>
          </Row>
        </div>
        {showChart &&
            <Row justify="center" style={{marginTop:"128px"}}>
              <Button type="primary" size={"large"} onClick={() => Setting.goToLinkSoft(history, "/jobs/create")}>CREATE JOB</Button>
            </Row>
        }
      </div>
    </div>
  );
};

export default InfoCard;
