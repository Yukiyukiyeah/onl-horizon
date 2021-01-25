import React, { useState, useEffect } from 'react';
import {Button, Upload, Col, Row} from "antd";
import AdvInput from "../../components/AdvInput";
import '../../styles/SubmitChallenge.scss';

const SubmitChallenge = (props) => {
  const { title: initTitle, handleNext } = props;
  const [title, setTitle] = useState(initTitle ? initTitle : '');

  const onClickNext = () => {
    const param = {
      'title': title,
    };

    handleNext(param);
  };



  // todo: upload the binary model
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
              handleChange={setTitle}
              widthRange={[200, 1200]}
              isAdaptive={true}
              height="40px"
            />
          </div>

          <Row className="model">
            <AdvInput
              type="normal"
              title="Model Upload"
              placeholder={'Please upload your model'}
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
          <Button type="primary" onClick={onClickNext}>NEXT</Button>
        </Col>
      </Row>
    </div>
  );
};


export default SubmitChallenge;