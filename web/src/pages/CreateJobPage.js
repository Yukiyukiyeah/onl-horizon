import React, {useMemo, useState} from "react";
import { Steps, Button, Col, Row, Input, Select } from "antd";
import '../styles/CreateJobPage.scss';

const { Step } = Steps;
const { Option } = Select;
const { TextArea } = Input;
const maxStep = 3;

const CrateJob = () => {
  // eslint-disable-next-line no-unused-vars
  const [curStep, setStep] = useState(0);
  const nextDisabled = useMemo(() => {
    if (curStep < maxStep) {
      return false;
    }
    else {
      return true;
    }
  }, [curStep]);

  // eslint-disable-next-line no-unused-vars
  const [title, setTitle] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [type, setType] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [description, setDescription] = useState('');
  // alphaRTC
  // eslint-disable-next-line no-unused-vars
  const [parties, setParties] = useState('2');
  // eslint-disable-next-line no-unused-vars
  const [experimentTime, setExperimentTime] = useState();
  // eslint-disable-next-line no-unused-vars
  const [expirationTime, setExpirationTime] = useState();
  // eslint-disable-next-line no-unused-vars
  const [model, setModel] = useState();
  // eslint-disable-next-line no-unused-vars
  const [bwe, setBwe] = useState();

  // probing
  // eslint-disable-next-line no-unused-vars
  const [interval, setInterval] = useState();
  // eslint-disable-next-line no-unused-vars
  const [buffer, setBuffer] = useState();
  // eslint-disable-next-line no-unused-vars
  const [probingTimeout, setProbingTimeout] = useState();
  // eslint-disable-next-line no-unused-vars
  const [mode, setMode] = useState('');
  // probing -> TCP
  // eslint-disable-next-line no-unused-vars
  const [tcpWindowSize, setTcpWindowSize] = useState();
  // eslint-disable-next-line no-unused-vars
  const [mss, setMss] = useState();
  // eslint-disable-next-line no-unused-vars
  const [tcpControl, setTcpControl] = useState();

  // probing -> UDP
  // eslint-disable-next-line no-unused-vars
  const [bandwidth, setBandwidth] = useState();
  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line no-unused-vars
  const [curMode, setCurMode] = useState('tcpConfig');

  const handlePrev = () => {
    setStep(curStep - 1);
  };

  const handleNext = () => {
    setStep(curStep + 1);
    console.log('next' + curStep);
  };
  const firstTab = (
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
            <Button type="primary" className="btn" onClick={() => handleNext()}>
              <span className="btn-text">CREATE</span>
            </Button>
          </Col>
        </Row>
      </Row>
    </div>
  );

  const steps = (
    <Steps className="steps" progressDot  current={curStep}>

      <Step title="Job Type" />
      <Step title="Job Detail" />
      <Step title="Host Info" />
      <Step title="Submitted"/>

    </Steps>
  );
  const stepsRow = (
    <Row className="steps-container" justify="space-between">
      <Col >
        <Button type="primary" className="prev-btn"  onClick={handlePrev} >PREV</Button>
      </Col>
      <Col >
        {steps}
      </Col>
      <Col >
        <Button type="primary" className="next-btn"  onClick={handleNext} disabled={nextDisabled}>NEXT
        </Button>
      </Col>
    </Row>
  );

  const alphaConfig = (
    <div className="alpha">
      <Row className="description">
        <Col>
          <p className="title-row">Description (optional)</p>
          <TextArea
            defaultValue={description}
            showCount
            autoSize = {{ minRows: 2, maxRows: 6 }}
            onChange={(value) => setDescription(value)}
            className="description-textarea" maxLength={100}/>
        </Col>
      </Row>
      <Row className="second-row-config config-row" gutter={[32, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
        <Col >
          <p className="title-row">Participants</p>
          <Select
            disabled
            className="default-width input"
            onChange={(value) => setParties(value) }
            defaultValue={parties}
          >
            <Option value="1">
          1
            </Option>
          </Select>
        </Col>
        <Col>
          <p className="title-row">Experiment Time (s)</p>
          <Input
            className="default-width input"
            defaultValue={experimentTime}
            onChange={ ({ target: { value } }) => setExperimentTime(value) }
            placeholder="30-600">
          </Input>
        </Col>
        <Col>
          <p className="title-row">Expiration (s)</p>
          <Input
            defaultValue={ expirationTime }
            className=" default-width input"
            onChange={({ target: { value } }) => setExpirationTime(value)}
            placeholder="300-6000">
          </Input>
        </Col>
      </Row>
      <Row className="third-row-config config-row">
        <Col>
          <p className="title-row">Model Upload (optional)</p>
          <Input className="file-path"/>
        </Col>
      </Row>
      <Row className="fourth-row-config config-row">
        <Col>
          <p className="title-row">bwe-feedback-duration (s)</p>
          <Input
            defaultValue={bwe}
            className="bwe-select input"
            onChange={({ target: { value } }) => setBwe(value)}
            placeholder="10-1000">
          </Input>
        </Col>
      </Row>
    </div>
  );

  const tcpConfig = (
    <Row className="fourth-row-config config-row" gutter={[32, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
      <Col>
        <p className="title-row">TCP window size (KBytes)</p>
        <Input
          defaultValue={tcpWindowSize}
          className="default-width input"
          onChange={ ({ target: { value } }) => setTcpWindowSize(value) }
          placeholder="1-2048"
        />
      </Col>
      <Col>
        <p className="title-row">MSS</p>
        <Input
          className="default-width input"
          defaultValue={mss}
          onChange={ ({ target: { value } }) => setMss(value) }
          placeholder="1-65336">
        </Input>
      </Col>
      <Col>
        <p className="title-row">Timeout (s)</p>
        <Select
          defaultValue={tcpControl}
          className=" default-width input"
          onChange={(value) => setTcpControl(value)}
        >
          <Option value="Cubic">
            Cubic
          </Option>
          <Option value="BBR">
            BBR
          </Option>
          <Option value="Reno">
            Reno
          </Option>
        </Select>
      </Col>
    </Row>
  );

  const udpConfig = (
    <Row className="fourth-row-config config-row">
      <Col>
        <p className="title-row">Bandwidth (Kbit/s)</p>
        <Input
          defaultValue={ bandwidth }
          className="default-width input"
          onChange={ ({ target: { value } }) => setBandwidth(value) }
          placeholder="1-100000"
        />
      </Col>
    </Row>);

  const handleModeChange= ((mode) => {
    console.log(mode);
    if (mode === 'TCP') {
      setCurMode(tcpConfig);
    }
    else  if (mode === 'UDP'){
      setCurMode(udpConfig);
    }
  });

  const probingConfig = (
    <div className="probing">
      <Row className="description">
        <Col>
          <p className="title-row">Description (optional)</p>
          <TextArea
            defaultValue={description}
            showCount
            autoSize = {{ minRows: 2, maxRows: 6 }}
            onChange={(value) => setDescription(value)}
            className="description-textarea" maxLength={100}/>
        </Col>
      </Row>
      <Row className="second-row-config config-row" gutter={[32, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
        <Col>
          <p className="title-row">Interval (s)</p>
          <Input
            defaultValue={interval}
            className="default-width input"
            onChange={ ({ target: { value } }) => setInterval(value) }
            placeholder="1-10"
          />
        </Col>
        <Col>
          <p className="title-row">Length of Buffer (KBytes)</p>
          <Input
            className="default-width input"
            defaultValue={buffer}
            onChange={ ({ target: { value } }) => setBuffer(value) }
            placeholder="1-1000">
          </Input>
        </Col>
        <Col>
          <p className="title-row">Timeout (s)</p>
          <Input
            defaultValue={probingTimeout}
            className=" default-width input"
            onChange={({ target: { value } }) => setProbingTimeout(value)}
            placeholder="1-60">
          </Input>
        </Col>
      </Row>
      <Row className="third-row-config config-row">
        <Col>
          <p className="title-row">Mode</p>
          <Select
            className="input default-width"
            defaultValue={mode}  size="large"
            onChange={(value) => { setMode(value); handleModeChange(value);}}>
            <Option value="TCP">
              TCP
            </Option>
            <Option value="UDP">
              UDP
            </Option>
          </Select>
        </Col>
      </Row>
      <div className="row-container">
        {curMode}
      </div>
    </div>
  );

  const jobDetailConfig = useMemo(() => {
    if (type === 'AlphaRTC') {
      return alphaConfig;
    }
    else if (type === 'Probing') {
      return probingConfig;
    }
    return alphaConfig;
  }, [type]);

  const secondTab = (
    <Row className="second-tab-container" justify="center">
      <Col span={20}>
        <Row className="title-zone">
          <span className="title">Job Detail</span>
          <div className="sub-title">
            <span> {title} </span>
            <span >   |   </span>
            <span> {type}</span>
          </div>
        </Row>
        <Row className="content-zone">
          { jobDetailConfig }
        </Row>
      </Col>
    </Row>
  );

  const curTab = useMemo(() => {
    if (curStep === 0) {
      return firstTab;
    }
    else  {
      return secondTab;
    }
  }, [curStep]);
  // const advancedConfig;
  // const probingConfig;

  return (
    <div className="create-job-container">
      {curTab}
      <div>
        {curStep > 0 && curStep < maxStep && stepsRow}
      </div>
    </div>
  );
};

export default CrateJob;
