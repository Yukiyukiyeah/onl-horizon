import React, {useState} from "react";
import {Row, Col, Radio, Steps, Button} from "antd";
const { Step } = Steps;
import '../../styles/ThirdTab.scss';

const ThirdTab = (props) => {
  const [hostChoice, setHostChoice] = useState(1);
  const { handleNext, handlePrev, type } = props;
  const {title:title} = props.params;
  const onHostChoiceChange = (e) => {
    setHostChoice(e.target.value);
  };
  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };
  const hostDetail = (
    <Radio.Group className="radio-group" onChange={onHostChoiceChange} value={hostChoice}>
      <Radio style={radioStyle} value={1}>Auto-selection</Radio>
      <Radio style={radioStyle} disabled value={2}>Customized</Radio>
    </Radio.Group>
  );
  const onClickNext = () => {
    let config = {
      'modeChoice' : hostChoice
    };
    handleNext(config);
  };
  const steps = (
    <Steps className="steps" progressDot current={2}>
      <Step title="Basic Info" />
      <Step title="Job Info" />
      <Step title="Host Info" />
      <Step title="Confirmation" />
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
        <Button type="primary" className="next-btn btn-text" onClick={onClickNext} >NEXT
        </Button>
      </Col>
    </Row>
  );
  return (
    <Row className="third-tab-container" justify="center">
      <Col span={20}>
        <Row className="title-zone">
          <span className="title">Host Info</span>
          <div className="sub-title">
            <span> {title} </span>
            <span>   |   </span>
            <span> {type}</span>
          </div>
        </Row>
        <Row className="content-zone">
          {hostDetail}
        </Row>
      </Col>
      { stepsRow }
    </Row>
  );
};

export  default  ThirdTab;
