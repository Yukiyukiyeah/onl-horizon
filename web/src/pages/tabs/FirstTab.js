import {Button, Col, Input, Row, Select, Steps} from "antd";
import React, {useMemo, useState} from "react";
import '../../styles/FirstTab.scss';
import ValidError from "../../components/ValidError";
const { Option } = Select;

const FirstTab = (props) => {
  const [title, setTitle] = useState('');
  const [appType, setType] = useState('');
  const [checkValid, setCheckValid] = useState(false);
  const { handleNext } = props;

  const onClickNext = () => {
    const param = {
      'title': title,
      'appType': appType
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
          </div>
          {checkValid && !appType && <ValidError errorText={"Please choose job type"}/>}
        </Col>
        <Row className="btn-row" justify="center">
          <Col span={20}>
            <Button type="primary" className="" onClick={() => onClickNext()}>
              <span className="btn-text">NEXT</span>
            </Button>
          </Col>
        </Row>
      </Row>
    </div>
  );
};

export default FirstTab;
