import React from "react";
import {Row, Col} from "antd";
import '../../styles/VerifyTab.scss';
import ReactJson from 'react-json-view';
import CusStep from "../../components/CusSteps";

const VerifyTab = (props) => {
  const { handleNext, handlePrev, type } = props;
  const {title:title} = props.params;
  const onClickNext = () => {
    handleNext({});
  };

  return (
    <div className="verify-tab-container">
      <Row justify="center">
        <Col span={20}>
          <Row className="title-zone">
            <span className="title">Confirmation</span>
            <div className="sub-title">
              <span> {title} </span>
              <span>   |   </span>
              <span> {type}</span>
            </div>
          </Row>
          <Row style={{marginTop:50}}>
            <ReactJson src={props.params}/>
          </Row>
        </Col>
      </Row>
      <CusStep
        curStep={3}
        onHandleClickNext={onClickNext}
        onHandleClickPrev={handlePrev}
      />
    </div>
  );
};

export  default  VerifyTab;
