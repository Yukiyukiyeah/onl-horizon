import React from 'react';
import {Col, Row} from 'antd';
import '../styles/InfoCard.scss';
import green from '../assets/green-square.png';
import red from '../assets/red-square.png';
import blue from '../assets/blued-square.png';

const InfoCard = (props) => {
  return (
    <div className="info-card-container">
      <div className="wrapper">
        <Row className="title">{props.title}</Row>
        {props.slot && <Row>{props.slot}</Row>}
        <div className="row-container">
          <Row className="row r1">
            <Col className="left"> {
              props.showIcon && <img src={green} width={16} height={16}
              />
            }

            <span className="key">{props.keyAry[0]}</span>
            </Col>
            <span className="value">{props.valueAry[0]}</span>
          </Row>
          <Row className="row r2">
            <Col className="left">
              {
                props.showIcon && <img src={red} width={16} height={16}
                />
              }
              <span className="key">{props.keyAry[1]}</span>
            </Col>
            <Col className="value">{props.valueAry[1]}</Col>
          </Row>
          <Row className="row r3">
            <Col className="left">
              {
                props.showIcon && <img src={blue} width={16} height={16}
                />
              }
              <span className="key">{props.keyAry[2]}</span>
            </Col>

            <Col className="value">{props.valueAry[2]}</Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
