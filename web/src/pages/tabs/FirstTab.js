import {Button, Col, Input, Row, Select, Steps} from "antd";
import React, {useState} from "react";
import '../../styles/FirstTab.scss';
const { Option } = Select;

const FirstTab = (props) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const { handleNext } = props;

  const onClickNext = () => {
    const param = {
      'title': title,
      'type': type
    };
    handleNext(param);
  };
  return (
    <div className="first-tab-container">
      <Row className="content-zone" justify="center">
        <Col span={20}>
          <p className="title">Job Type</p>
          <div className="name">
            <p className="sub-title">Name</p>
            <Input className="name-input" defaultValue={title} onChange={({ target: { value } }) => setTitle(value)}  maxLength={30}/>
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