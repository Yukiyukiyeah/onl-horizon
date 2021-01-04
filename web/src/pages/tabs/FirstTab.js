import {Col, Row} from "antd";
import React, {useMemo, useState} from "react";
import '../../styles/FirstTab.scss';
import AdvInput from "../../components/AdvInput";
import CusStep from "../../components/CusSteps";

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
              handleChange={setDescription}
              maxLength={100}
            />
          </div>
        </Col>
      </Row>
      <CusStep
        curStep={0}
        onHandleClickNext={onClickNext}
        prevDisabled={true}
      />
    </div>
  );
};

export default FirstTab;
