import { Button, Col, Input, Row, Select, Steps } from "antd";
import React, {useMemo, useState} from "react";
import '../../styles/SecondTab.scss';
const { Step } = Steps;
const { Option } = Select;
const { TextArea } = Input;

const SecondTab = (props) => {
  const { handleNext, handlePrev, title, type } = props;
  const [description, setDescription] = useState('');
  // alphaRTC
  const [parties, setParties] = useState('2');
  const [experimentTime, setExperimentTime] = useState();
  const [expirationTime, setExpirationTime] = useState();
  // eslint-disable-next-line no-unused-vars
  const [model, setModel] = useState();
  const [bwe, setBwe] = useState();

  // probing
  const [interval, setInterval] = useState();
  const [buffer, setBuffer] = useState();
  const [probingTimeout, setProbingTimeout] = useState();
  const [mode, setMode] = useState('');
  // probing -> TCP
  const [tcpWindowSize, setTcpWindowSize] = useState();
  const [mss, setMss] = useState();
  const [tcpControl, setTcpControl] = useState();

  // probing -> UDP
  const [bandwidth, setBandwidth] = useState();
  // eslint-disable-next-line no-unused-vars
  const [application, setApplication] = useState();
  // eslint-disable-next-line no-unused-vars
  const [jsonConfig, setJsonConfig] = useState();
  // eslint-disable-next-line no-unused-vars
  const [advancedTimeout, setAdvancedTimeout] = useState();
  // eslint-disable-next-line no-unused-vars
  const [hostChoice, setHostChoice] = useState(1);

  const alphaRTCFullConfigDic = ['description', 'parties', 'expirationTime', 'experimentTime', 'model', 'bweDuration'];
  const alphaRTCFullConfig = [description, parties, expirationTime, experimentTime, model, bwe];
  const probingFullConfigDic = ['description', 'interval', 'bufferLen', 'probingTimeout', 'mode', 'tcpWindowSize', 'mss', 'tcpControl', 'bandwidth'];
  const probingFullConfig =    [description, interval, buffer, probingTimeout, mode, tcpWindowSize, mss, tcpControl, bandwidth];
  const advancedFullConfigDic = ['description', 'jsonConfig', 'application', 'timeout'];
  const advancedFullConfig = [description, application, jsonConfig, advancedTimeout];

  const tcpConfig = (
    <Row className="fourth-row-config config-row" style={{marginTop:'20PX'}} gutter={[32, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
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
        <p className="title-row">TCP Control</p>
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

  const curConfig =  useMemo(() => {
    if (mode === 'TCP') {
      return tcpConfig;
    }
    else  if (mode === 'UDP'){
      return udpConfig;
    }
  }, [mode]);
  const probingConfig = (
    <div className="probing">
      <Row className="description">
        <Col>
          <p className="title-row">Description (optional)</p>
          <TextArea
            defaultValue={description}
            showCount
            autoSize = {{ minRows: 2, maxRows: 6 }}
            onChange={({ target: { value } }) =>  setDescription(value) }
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
            defaultValue={ mode }  size="large"
            onChange={(value) => { setMode(value);}}>
            <Option value='TCP'>
              TCP
            </Option>
            <Option value='UDP'>
              UDP
            </Option>
          </Select>
        </Col>
      </Row>
      {curConfig}

    </div>
  );
  const advancedConfig = (
    <div className="probing">
      <Row className="description">
        <Col>
          <p className="title-row">Description (optional)</p>
          <TextArea
            defaultValue={description}
            showCount
            autoSize = {{ minRows: 2, maxRows: 6 }}
            onChange={({ target: { value } }) => setDescription(value)}
            className="description-textarea" maxLength={100}/>
        </Col>
      </Row>
      <Row className="second-row-config config-row">
        <Col>
          <p className="title-row">Test Application (Executable File)</p>
          <Input className="file-path"/>
        </Col>
      </Row>
      <Row className="third-row-config config-row">
        <Col>
          <p className="title-row">JSON CMD Config</p>
          <Input className="file-path"/>
        </Col>
      </Row>
      <Row className="fourth-row-config config-row">
        <Col>
          <p className="title-row">Timeout (s)</p>
          <Input
            defaultValue={advancedTimeout}
            className=" default-width input"
            onChange={({ target: { value } }) => setAdvancedTimeout(value)}
            placeholder="100-3600">
          </Input>
        </Col>
      </Row>

    </div>
  );
  const alphaConfig = (
    <div className="alpha">
      <Row className="description">
        <Col>
          <p className="title-row">Description (optional)</p>
          <TextArea
            defaultValue={ description }
            showCount
            autoSize = {{ minRows: 2, maxRows: 6 }}
            onChange={({ target: { value } }) => setDescription(value)}
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
  const onClickNext = () => {
    let config = {};
    if (type === 'AlphaRTC') {
      for (let i in alphaRTCFullConfigDic) {
        const key = alphaRTCFullConfigDic[i];
        const val = alphaRTCFullConfig[i];
        config[key] = val;
      }
    }
    else if (type === 'Probing') {
      for (let i of probingFullConfig) {
        const key = probingFullConfigDic[i];
        const val = probingFullConfig[i];
        config[key] = val;
      }
    }
    else if (type === 'Advanced') {
      for (let i of advancedFullConfig) {
        const key = advancedFullConfigDic[i];
        const val = advancedFullConfig[i];
        config[key] = val;
      }
    }
    handleNext(config);
  };
  const steps = (
    <Steps className="steps" progressDot  current={1}>
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
        <Button type="primary" className="next-btn"  onClick={onClickNext} >NEXT
        </Button>
      </Col>
    </Row>
  );
  return (
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
          { type === 'AlphaRTC' && alphaConfig }
          { type === 'Probing' && probingConfig }
          { type === 'Advanced' && advancedConfig }
        </Row>
      </Col>
      { stepsRow }
    </Row>
  );
};
export  default  SecondTab;