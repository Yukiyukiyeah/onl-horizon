import {Button, Col, Row, Steps} from "antd";
import React from "react";
const { Step } = Steps;

const btn = {
  width: '100px',
  fontWeight: 'bold'
};
const stepsContainer = {
  width: '100%',
  minWidth: '600px',
  maxWidth: '1500px',
  position: 'absolute',
  bottom: 0
};
const InternalStep = (props, ref) => {
  const {
    curStep,
    onHandleClickPrev,
    onHandleClickNext,
    prevDisabled = false,
    nextDisabled = false,
    stepsWrapper,
  } = props;
  const internalRef = ref || React.createRef();
  const steps = (
    <Steps className="steps" progressDot current={curStep}>
      <Step title="Basic Info" />
      <Step title="Job Info" />
      <Step title="Host Info" />
      <Step title="Confirmation" />
    </Steps>
  );
  return (
    <div className={stepsWrapper} ref={internalRef}>
      <Row style={stepsContainer} justify="space-between">
        <Col>
          <Button type="primary" style={btn} disabled={prevDisabled} onClick={onHandleClickPrev}>PREV</Button>
        </Col>
        <Col>
          {steps}
        </Col>
        <Col>
          <Button type="primary" style={btn} disbaled={nextDisabled} onClick={onHandleClickNext}>NEXT</Button>
        </Col>
      </Row>
    </div>);
};

const CusStep = React.forwardRef(InternalStep);
export default CusStep;