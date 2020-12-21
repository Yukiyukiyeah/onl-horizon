import {Button, Col, Input, Row, Select, Steps} from "antd";
import React, {useMemo, useState} from "react";
const { Step } = Steps;
import '../../styles/FirstTab.scss';
import ValidError from "../../components/ValidError";
import AdvInput from "../../components/AdvInput";
const { Option } = Select;
const { TextArea } = Input;

const FirstTab = (props) => {
  const {title:initTitle, description:initDescription, appType: initAppType} = props.params;
  const [title, setTitle] = useState(initTitle ? initTitle : '');
  const [appType, setType] = useState(initAppType ? initAppType : '');
  const [checkValid, setCheckValid] = useState(false);
  const [description, setDescription] = useState(initDescription ? initDescription : '');
  const { handleNext } = props;

  const onClickNext = () => {
    const param = {
      'title': title,
      'appType': appType,
      'description': description
    };
    if (nextValid) {
      handleNext(param);
    }
    else {
      setCheckValid(true);
    }
  };
  const titleValid = useMemo(() => {
    return !(!title || title.length > 100);
  }, [title]);
  const nextValid = useMemo(() => {
    return titleValid && !!appType;
  }, [titleValid, appType]);
  const steps = (
    <Steps className="steps" progressDot current={0}>
      <Step title="Basic Info" />
      <Step title="Job Info" />
      <Step title="Host Info" />
      <Step title="Confirmation" />
    </Steps>
  );
  const stepsRow = (
    <Row className="steps-container" justify="space-between">
      <Col >
        <Button type="primary" className="prev-btn btn-text" disabled >PREV</Button>
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
    <div className="first-tab-container">
      <Row className="content-zone" justify="center">
        <Col span={20}>
          <p className="title">Basic Info</p>
          <div className="name">
            <AdvInput
              type="normal"
              title="Name"
              placeholder="the name of the job"
              value={title}
              handleChange={setTitle}
              showError={checkValid && !titleValid}
              errorText="Type job name"
              isAdaptive={true}
              widthRange={[200, 1200]}
              height="40px"
            />
          </div>
          <div className="type">
            <AdvInput
              type="select"
              title="Type"
              value={appType}
              size="large"
              handleChange={setType}
              options={['AlphaRTC', 'Probing', 'Advanced']}
              optionsValue={['WebRTC', 'Iperf', 'Advanced']}
              errorText={"Please choose job type"}
              showError={checkValid && !appType}
              isAdaptive={true}
              widthRange={[200, 1200]}
            />
          </div>
          <div className="description">
            <AdvInput
              title='Description (optional)'
              type='text'
              isAdaptive={true}
              widthRange={[200, 1200]}
              placeholder={"the description of the job"}
              value={ description }
              onChange={setDescription}
              maxLength={100}
            />
          </div>
        </Col>
        { stepsRow }
      </Row>
    </div>
  );
};

export default FirstTab;
