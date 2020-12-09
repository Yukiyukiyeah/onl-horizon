import {Button, Col, Input, Row, Select, Steps} from "antd";
import React, {useMemo, useState} from "react";
import '../../styles/FirstTab.scss';
import ValidError from "../../components/ValidError";
const { Option } = Select;

const FirstTab = (props) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [checkValid, setCheckValid] = useState(false);
  const { handleNext } = props;

  const onClickNext = () => {
    const param = {
      'title': title,
      'type': type
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
    return titleValid && !!type;
  }, [titleValid, type]);

  return (
    <div className="first-tab-container">
      <Row className="content-zone" justify="center">
        <Col span={20}>
          <p className="title">Job Type</p>
          <div className="name">
            <p className="sub-title">Name</p>
            <Input className="name-input" defaultValue={title} onChange={({ target: { value } }) => setTitle(value)}  maxLength={30}/>
            {checkValid && !titleValid && <ValidError errorText={"Type job name"}/>}
          </div>
          <div className="type">
            <p className="sub-title">Type</p>
            <Select className="type-select"  defaultValue={type}  size="large"  onChange={(value) => setType(value)}>
              <Option value="AlphaRTC">
              AlphaRTC
              </Option>
              <Option value="Probing">
              Probing
              </Option>
              <Option value="Advanced">
              Advanced
              </Option>
            </Select>
          </div>
          {checkValid && !type && <ValidError errorText={"Please choose job type"}/>}
        </Col>
        <Row className="btn-row" justify="center">
          <Col span={20}>
            <Button type="primary" className="btn" onClick={() => onClickNext()}>
              <span className="btn-text">CREATE</span>
            </Button>
          </Col>
        </Row>
      </Row>
    </div>
  );
};

export default FirstTab;