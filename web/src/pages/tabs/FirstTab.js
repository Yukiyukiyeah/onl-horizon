import {Button, Col, Input, Row, Select, Steps} from "antd";
import React, {useMemo, useState} from "react";
const { Step } = Steps;
import '../../styles/FirstTab.scss';
import ValidError from "../../components/ValidError";
const { Option } = Select;
const { TextArea } = Input;

const FirstTab = (props) => {
  const [title, setTitle] = useState('');
  const [appType, setType] = useState('');
  const [checkValid, setCheckValid] = useState(false);
  const [description, setDescription] = useState('');
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
      <Step title="Create Job" />
      <Step title="Job Info" />
      <Step title="Host Info" />
      <Step title="Completed" />
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
          <p className="title">Create Job</p>
          <div className="name">
            <p className="sub-title">Name</p>
            <Input className="name-input" placeholder={"the name of the job"} defaultValue={title} onChange={({ target: { value } }) => setTitle(value)} maxLength={30}/>
            {checkValid && !titleValid && <ValidError errorText={"Type job name"}/>}
          </div>
          <div className="type">
            <p className="sub-title">Type</p>
            <Select className="type-select" defaultValue={appType} size="large" onChange={(value) => setType(value)}>
              <Option value="WebRTC">
                AlphaRTC
              </Option>
              <Option value="Iperf">
                Probing
              </Option>
              <Option value="Advanced">
              Advanced
              </Option>
            </Select>
            {checkValid && !appType && <ValidError errorText={"Please choose job type"}/>}
          </div>
          <div className="description">
            <p className="sub-title">Description (optional)</p>
            <TextArea
              placeholder={"the description of the job"}
              defaultValue={ description }
              showCount
              autoSize = {{ minRows: 2, maxRows: 6 }}
              onChange={({ target: { value } }) => setDescription(value)}
              className="description-textarea" maxLength={100}/>
          </div>
        </Col>
        { stepsRow }
      </Row>
    </div>
  );
};

export default FirstTab;
