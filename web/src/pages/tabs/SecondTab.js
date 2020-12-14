import { Button, Col, Input, Row, Select, Steps } from "antd";
import React, {useMemo, useState} from "react";
import '../../styles/SecondTab.scss';
import ValidError from "../../components/ValidError";
const { Step } = Steps;
const { Option } = Select;
const { TextArea } = Input;

const SecondTab = (props) => {
  const { handleNext, handlePrev, title, type } = props;
  const [checkValid, setCheckValid] = useState(false);
  const [description, setDescription] = useState('');
  // alphaRTC job config
  const [parties, setParties] = useState('2');
  const [experimentTime, setExperimentTime] = useState();
  const [expirationTime, setExpirationTime] = useState();
  // eslint-disable-next-line no-unused-vars
  const [model, setModel] = useState('default');
  const [bwe, setBwe] = useState();
  const experimentTimeValid = useMemo(() => {
    return !(!experimentTime || isNaN(experimentTime) || experimentTime > 600 || experimentTime < 30);
  }, [experimentTime]);
  const expirationTimeValid = useMemo(() => {
    return !(!experimentTime || isNaN(experimentTime) || experimentTime > 6000 || experimentTime < 300);
  }, [expirationTime]);
  const bweValid = useMemo(() => {
    return !(!bwe || isNaN(bwe) || bwe > 1000 || experimentTime < 10);
  }, [bwe]);
  const alphaNextValid = useMemo(() => {
    return experimentTimeValid && experimentTimeValid && bweValid;
  }, [expirationTimeValid, experimentTimeValid, bweValid]);
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
        <Col>
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
          {checkValid && !experimentTimeValid  && <ValidError errorText={"Incorrect experiment time"}/>}
        </Col>
        <Col>
          <p className="title-row">Expiration (s)</p>
          <Input
            defaultValue={ expirationTime }
            className=" default-width input"
            onChange={({ target: { value } }) => setExpirationTime(value)}
            placeholder="300-6000">
          </Input>
          {checkValid && !expirationTimeValid && <ValidError errorText={"Incorrect expiration"}/>}
        </Col>
      </Row>
      <Row className="third-row-config config-row">
        <Col>
          <p className="title-row">Model Upload (optional)</p>
          <Input disabled className="file-path"/>
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
          {checkValid && !bweValid && <ValidError errorText={"Incorrect bwe"}/>}
        </Col>
      </Row>
    </div>
  );
  // probing job Config
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
  const intervalTimeValid = useMemo(() => {
    return !(!interval || isNaN(interval) || interval > 10 || experimentTime < 1);
  }, [interval]);
  const bufferValid = useMemo(() => {
    return !(!buffer || isNaN(buffer) || experimentTime > 1000 || experimentTime < 1);
  }, [buffer]);
  const probingTimeoutValid = useMemo(() => {
    return !(!probingTimeout || isNaN(probingTimeout) || experimentTime > 60 || experimentTime < 1);
  }, [probingTimeout]);
  const tcpWindowSizeValid = useMemo(() => {
    return !(!tcpWindowSize || isNaN(tcpWindowSize) || tcpWindowSize > 2048 || tcpWindowSize < 1);
  }, [tcpWindowSize]);
  const mssValid = useMemo(() => {
    return !(!mss || isNaN(mss) || mss > 65536 || mss < 1);
  }, [mss]);
  const bandwidthValid = useMemo(() => {
    return !(!bandwidth || isNaN(bandwidth) || bandwidth > 100000 || experimentTime < 1);
  }, [bandwidth]);
  const probingNextValid = useMemo(() => {
    const commonParamsValid = intervalTimeValid  && probingTimeoutValid && bufferValid && !!mode;
    if (mode === 'tcp') {
      return commonParamsValid && tcpWindowSizeValid && mssValid && !!tcpControl;
    }
    else if ( mode === 'udp') {
      return commonParamsValid && bandwidthValid;
    }
    return false;
  }, [mode, tcpControl, intervalTimeValid, bufferValid, probingTimeoutValid, tcpWindowSizeValid, mssValid, bandwidthValid ]);
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
        {checkValid && !tcpWindowSize  && <ValidError errorText={"Incorrect TCP window size"}/>}
      </Col>
      <Col>
        <p className="title-row">MSS</p>
        <Input
          className="default-width input"
          defaultValue={mss}
          onChange={ ({ target: { value } }) => setMss(value) }
          placeholder="1-65336">
        </Input>
        {checkValid && !mssValid  && <ValidError errorText={"Incorrect mss"}/>}
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
        {checkValid && !tcpControl  && <ValidError errorText={"Choose control method"}/>}
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
        {checkValid && !bandwidthValid  && <ValidError errorText={"Incorrect bandwidth"}/>}
      </Col>
    </Row>);
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
          {checkValid && !intervalTimeValid  && <ValidError errorText={"Incorrect interval"}/>}
        </Col>
        <Col>
          <p className="title-row">Length of Buffer (KBytes)</p>
          <Input
            className="default-width input"
            defaultValue={buffer}
            onChange={ ({ target: { value } }) => setBuffer(value) }
            placeholder="1-1000">
          </Input>
          {checkValid && !bufferValid  && <ValidError errorText={"Incorrect buffer"}/>}
        </Col>
        <Col>
          <p className="title-row">Timeout (s)</p>
          <Input
            defaultValue={probingTimeout}
            className=" default-width input"
            onChange={({ target: { value } }) => setProbingTimeout(value)}
            placeholder="1-60">
          </Input>
          {checkValid && !probingTimeoutValid  && <ValidError errorText={"Incorrect timeout"}/>}
        </Col>
      </Row>
      <Row className="third-row-config config-row">
        <Col>
          <p className="title-row">Mode</p>
          <Select
            className="input default-width"
            defaultValue={ mode }  size="large"
            onChange={(value) => { setMode(value);}}>
            <Option value='tcp'>
              TCP
            </Option>
            <Option value='udp'>
              UDP
            </Option>
          </Select>
          {checkValid && !mode  && <ValidError errorText={"Choose mode"}/>}
        </Col>
      </Row>
      {mode === 'tcp' && tcpConfig}
      {mode === 'udp' && udpConfig}
    </div>
  );
  // advanced job config
  const advancedValid = true;
  // eslint-disable-next-line no-unused-vars
  const [application, setApplication] = useState();
  // eslint-disable-next-line no-unused-vars
  const [jsonConfig, setJsonConfig] = useState();
  const [advancedTimeout, setAdvancedTimeout] = useState();
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

  const alphaRTCFullConfigDic = ['description', 'parties', 'expirationTime', 'experimentTime', 'model', 'bweDuration'];
  const alphaRTCFullConfig = [description, parties, expirationTime, experimentTime, model, bwe];
  const probingFullConfigDic = ['description', 'interval', 'bufferLen', 'timeout', 'mode', 'tcpWindowSize', 'mss', 'tcpControl', 'bandwidth'];
  const probingFullConfig =    [description, interval, buffer, probingTimeout, mode, tcpWindowSize, mss, tcpControl, bandwidth];
  const advancedFullConfigDic = ['description', 'jsonConfig', 'application', 'timeout'];
  const advancedFullConfig = [description, application, jsonConfig, advancedTimeout];
  const onClickNext = () => {
    let config = {};
    if (type === 'AlphaRTC') {
      if (!alphaNextValid) {
        setCheckValid(true);
        return;
      }
      for (let i in alphaRTCFullConfigDic) {
        const key = alphaRTCFullConfigDic[i];
        const val = alphaRTCFullConfig[i];
        config[key] = val;
      }
      handleNext(config);
    }
    else if (type === 'Probing') {
      if (!probingNextValid) {
        setCheckValid(true);
        return;
      }
      for (let i in probingFullConfig) {
        const key = probingFullConfigDic[i];
        const val = probingFullConfig[i];
        config[key] = val;
      }
      handleNext(config);
    }
    else if (type === 'Advanced') {
      if (!advancedValid)  {
        setCheckValid(true);
        return;
      }
      for (let i in advancedFullConfig) {
        const key = advancedFullConfigDic[i];
        const val = advancedFullConfig[i];
        config[key] = val;
      }
      handleNext(config);
    }
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
