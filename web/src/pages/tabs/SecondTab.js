import {Button, Col, Input, InputNumber, Row, Select, Steps, Tooltip} from "antd";
import React, {useMemo, useState} from "react";
import '../../styles/SecondTab.scss';
import ValidError from "../../components/ValidError";
const { Step } = Steps;
const { Option } = Select;
const { TextArea } = Input;

const SecondTab = (props) => {
  const { handleNext, handlePrev, type } = props;
  const {title:title, experimentTime: initExperimentTime, expirationTime: initExpirationTime, bweDuration:initBwe} = props.params;
  const [checkValid, setCheckValid] = useState(false);
  // alphaRTC job config
  const [parties, setParties] = useState('2');
  const [experimentTime, setExperimentTime] = useState(initExperimentTime ? initExperimentTime : 30);
  const [expirationTime, setExpirationTime] = useState(initExpirationTime ? initExpirationTime : 22);
  // eslint-disable-next-line no-unused-vars
  const [model, setModel] = useState('default');
  const [bwe, setBwe] = useState(initBwe ? initBwe : 10);
  const experimentTimeValid = useMemo(() => {
    return !(!experimentTime || isNaN(experimentTime) || experimentTime > 600 || experimentTime < 30);
  }, [experimentTime]);
  const expirationTimeValid = useMemo(() => {
    return !(!expirationTime || isNaN(expirationTime) || expirationTime > 6000 || expirationTime < 300);
  }, [expirationTime]);
  const bweValid = useMemo(() => {
    return !(!bwe || isNaN(bwe) || bwe > 1000 || bwe < 10);
  }, [bwe]);
  const alphaNextValid = useMemo(() => {
    return experimentTimeValid && experimentTimeValid && bweValid;
  }, [expirationTimeValid, experimentTimeValid, bweValid]);
  const alphaConfig = (
    <div className="alpha">
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
          <Tooltip
            trigger={['focus']}
            title={"30-600"}
            placement="bottomLeft"
            overlayClassName="numeric-input"
          >
            <InputNumber
              min={30}
              max={600}
              className="default-width input"
              defaultValue={experimentTime}
              onChange={ (value) => setExperimentTime(value) }
              placeholder="30-600">
            </InputNumber>
          </Tooltip>
          {checkValid && !experimentTimeValid  && <ValidError errorText={"Incorrect experiment time"}/>}
        </Col>
        <Col>
          <Tooltip
            trigger={['focus']}
            title={"300-6000"}
            placement="bottomLeft"
            overlayClassName="numeric-input"
          >
            <p className="title-row">Expiration (s)</p>
            <InputNumber
              min={300}
              max={6000}
              defaultValue={ expirationTime }
              className=" default-width input"
              onChange={ (value) => setExpirationTime(value)}
              placeholder="300-6000">
            </InputNumber>
          </Tooltip>
          {checkValid && !expirationTimeValid && <ValidError errorText={"Incorrect expiration"}/>}
        </Col>
      </Row>
      <Row className="third-row-config config-row">
        <Col>
          <p className="title-row">Model Upload (optional)</p>
          <Input disabled className="default-width file-path"/>
        </Col>
      </Row>
      <Row className="fourth-row-config config-row">
        <Col>
          <p className="title-row">bwe-feedback-duration (s)</p>
          <Tooltip
            trigger={['focus']}
            title={"10-1000"}
            placement="bottomLeft"
            overlayClassName="numeric-input"
          >
            <InputNumber
              defaultValue={bwe}
              min={10}
              max={1000}
              className="default-width input"
              onChange={(value) => setBwe(value)}
              placeholder="10-1000">
            </InputNumber>
          </Tooltip>
          {checkValid && !bweValid && <ValidError errorText={"Incorrect bwe"}/>}
        </Col>
      </Row>
    </div>
  );
  // probing job Config
  const {interval: initInterval, bufferLen: initBufferLen,
    timeout:initTimeout, mode:initMode, tcpWindowSize:initTcpWindowSize,
    tcpControl: initTcpControl, mss: initMss, bandwidth: initBandWidth} = props.params;
  const [interval, setInterval] = useState(initInterval ? initInterval : 1);
  const [buffer, setBuffer] = useState( initBufferLen ? initBufferLen : 8);
  const [probingTimeout, setProbingTimeout] = useState(initTimeout ? initTimeout: 10);
  const [mode, setMode] = useState(initMode ? initMode : 'tcp');
  // probing -> TCP
  const [tcpWindowSize, setTcpWindowSize] = useState(initTcpWindowSize ? initTcpWindowSize : 2048);
  const [mss, setMss] = useState(initMss ? initMss : 1400);
  const [tcpControl, setTcpControl] = useState(initTcpControl ? initTcpControl : 'CTCP');
  // probing -> UDP
  const [bandwidth, setBandwidth] = useState(initBandWidth ? initBandWidth : 10000);
  const intervalTimeValid = useMemo(() => {
    return !(!interval || isNaN(interval) || interval > 10 || experimentTime < 1);
  }, [interval]);
  const bufferValid = useMemo(() => {
    return !(!buffer || isNaN(buffer) || experimentTime > 1000 || experimentTime < 1);
  }, [buffer]);
  const probingTimeoutValid = useMemo(() => {
    return !(!probingTimeout || isNaN(probingTimeout) || probingTimeout > 60 || probingTimeout < 1);
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
        <Tooltip
          trigger={['focus']}
          title={"1-2048"}
          placement="bottomLeft"
          overlayClassName="numeric-input"
        >
          <InputNumber
            defaultValue={tcpWindowSize}
            min={1}
            max={2048}
            className="default-width input"
            onChange={ (value) => setTcpWindowSize(value) }
            placeholder="1-2048"
          />
        </Tooltip>
        {checkValid && !tcpWindowSize  && <ValidError errorText={"Incorrect TCP window size"}/>}
      </Col>
      <Col>
        <p className="title-row">MSS</p>
        <Tooltip
          trigger={['focus']}
          title={"1-65336"}
          placement="bottomLeft"
          overlayClassName="numeric-input"
        >
          <InputNumber
            min={1}
            max={65336}
            className="default-width input"
            defaultValue={mss}
            onChange={ (value) => setMss(value) }
            placeholder="1-65336">
          </InputNumber>
        </Tooltip>
        {checkValid && !mssValid  && <ValidError errorText={"Incorrect mss"}/>}
      </Col>
      <Col>
        <p className="title-row">TCP Control</p>
        <Select
          defaultValue={tcpControl}
          className="default-width input"
          onChange={(value) => setTcpControl(value)}
        >
          <Option value="CTCP">
            CTCP
          </Option>
          {/*<Option value="Cubic">*/}
          {/*  Cubic*/}
          {/*</Option>*/}
          {/*<Option value="BBR">*/}
          {/*  BBR*/}
          {/*</Option>*/}
          {/*<Option value="Reno">*/}
          {/*  Reno*/}
          {/*</Option>*/}
        </Select>
        {checkValid && !tcpControl  && <ValidError errorText={"Choose control method"}/>}
      </Col>
    </Row>
  );
  const udpConfig = (
    <Row className="fourth-row-config config-row">
      <Col>
        <p className="title-row">Bandwidth (Kbit/s)</p>
        <Tooltip
          trigger={['focus']}
          title={"1-1024"}
          placement="bottomLeft"
          overlayClassName="numeric-input"
        >
          <InputNumber
            min={1}
            max={100000}
            defaultValue={ bandwidth }
            className="default-width input"
            onChange={ (value) => setBandwidth(value) }
            placeholder="1-100000"
          />
        </Tooltip>
        {checkValid && !bandwidthValid  && <ValidError errorText={"Incorrect bandwidth"}/>}
      </Col>
    </Row>);
  const probingConfig = (
    <div className="probing">
      <Row className="second-row-config config-row" gutter={[32, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
        <Col>
          <p className="title-row">Interval (s)</p>
          <Tooltip
            trigger={['focus']}
            title={"1-10"}
            placement="bottomLeft"
            overlayClassName="numeric-input"
          >
            <InputNumber
              defaultValue={interval}
              min={1}
              max={10}
              className="default-width input"
              onChange={ (value) => setInterval(value) }
              placeholder="1-10"
            />
          </Tooltip>
          {checkValid && !intervalTimeValid  && <ValidError errorText={"Incorrect interval"}/>}
        </Col>
        <Col>
          <p className="title-row">Length of Buffer (KBytes)</p>
          <Tooltip
            trigger={['focus']}
            title={"1-1024"}
            placement="bottomLeft"
            overlayClassName="numeric-input"
          >
            <InputNumber
              className="default-width input"
              defaultValue={buffer}
              min={1}
              max={1024}
              onChange={ (value) => setBuffer(value) }
              placeholder="1-1024">
            </InputNumber>
          </Tooltip>
          {checkValid && !bufferValid  && <ValidError errorText={"Incorrect buffer"}/>}
        </Col>
        <Col>
          <p className="title-row">Duration (s)</p>
          <Tooltip
            trigger={['focus']}
            title={"1-60"}
            placement="bottomLeft"
            overlayClassName="numeric-input"
          >
            <InputNumber
              defaultValue={probingTimeout}
              className=" default-width input"
              min={1}
              max={60}
              onChange={(value) => setProbingTimeout(value)}
              placeholder="1-60">
            </InputNumber>
          </Tooltip>
          {checkValid && !probingTimeoutValid  && <ValidError errorText={"Incorrect timeout"}/>}
        </Col>
      </Row>
      <Row className="third-row-config config-row">
        <Col>
          <p className="title-row">Mode</p>
          <Select
            className="input default-width"
            defaultValue={ mode }
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
          <p className="title-row">Duration (s)</p>
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

  const alphaRTCFullConfigDic = ['parties', 'expirationTime', 'experimentTime', 'model', 'bweDuration'];
  const alphaRTCFullConfig = [parties, expirationTime, experimentTime, model, bwe];
  const probingFullConfigDic = ['interval', 'bufferLen', 'timeout', 'mode', 'tcpWindowSize', 'mss', 'tcpControl', 'bandwidth'];
  const probingFullConfig =    [interval, buffer, probingTimeout, mode, tcpWindowSize, mss, tcpControl, bandwidth];
  const advancedFullConfigDic = ['jsonConfig', 'application', 'timeout'];
  const advancedFullConfig = [ application, jsonConfig, advancedTimeout];
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
    <Steps className="steps" progressDot current={1}>
      <Step title="Basic Info" />
      <Step title="Job Info" />
      <Step title="Host Info" />
      <Step title="Confirmation" />
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
          <span className="title">{type} Job Info</span>
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
