import {Col, Input, Row} from "antd";
import React, {useMemo, useState} from "react";
import '../../../styles/SecondTab.scss';
import AdvInput from "../../../components/AdvInput";
import CusStep from "../../../components/CusSteps";

const SecondTab = (props) => {
  const { handleNext, handlePrev, type } = props;
  const {title:title, experimentTime: initExperimentTime, expirationTime: initExpirationTime, bweDuration:initBwe} = props.params;
  const [checkValid, setCheckValid] = useState(false);
  // alphaRTC job config
  const [participants, setParticipants] = useState('2');
  const [experimentTime, setExperimentTime] = useState(initExperimentTime ? initExperimentTime : 30);
  const [expirationTime, setExpirationTime] = useState(initExpirationTime ? initExpirationTime : 300);
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
          <AdvInput
            type="select"
            title="Participants"
            placeholder="2"
            value={participants}
            handleChange={setParticipants}
            showError={false}
            errorText="Select Participants"
            disabled={true}
          />
        </Col>
        <Col>
          <AdvInput
            type="numb"
            title="Experiment Time (s)"
            value={experimentTime}
            inputRange={[30, 600]}
            tipText={"30-600"}
            handleChange={setExperimentTime}
            showError={checkValid && !experimentTimeValid}
            errorText="Incorrect experiment time"
          />
        </Col>
        <Col>
          <AdvInput
            type="numb"
            title="Expiration (s)"
            value={expirationTime}
            inputRange={[300, 6000]}
            tipText={"300-6000"}
            handleChange={setExpirationTime}
            showError={checkValid && !expirationTimeValid}
            errorText="Incorrect expiration"
          />
        </Col>
      </Row>
      <Row className="third-row-config config-row">
        <Col>
          <AdvInput
            type="normal"
            title="Model Upload (optional)"
            value={model}
            handleChange={setModel}
            disabled={true}
          />
        </Col>
      </Row>
      <Row className="fourth-row-config config-row">
        <Col>
          <AdvInput
            type="numb"
            title="bwe-feedback-duration (s)"
            value={bwe}
            inputRange={[10, 1000]}
            tipText={"10-1000"}
            handleChange={setBwe}
            showError={checkValid && !bweValid}
            errorText="Incorrect bwe"
          />
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
        <AdvInput
          type="numb"
          title="TCP window size (KBytes)"
          value={tcpWindowSize}
          inputRange={[1, 2048]}
          tipText={"1-2048"}
          handleChange={setTcpWindowSize}
          showError={checkValid && !tcpWindowSize}
          errorText="Incorrect TCP window size"
        />
      </Col>
      <Col>
        <AdvInput
          type="numb"
          title="MSS"
          value={mss}
          inputRange={[1, 65336]}
          tipText={"1-65336"}
          handleChange={setMss}
          showError={checkValid && !mssValid}
          errorText="Incorrect mss"
        />
      </Col>
      <Col>
        <AdvInput
          type="select"
          title="TCP Control"
          value={tcpControl}
          handleChange={setTcpControl}
          showError={checkValid && !tcpControl}
          errorText="Choose control method"
          options={["CTCP"]}
          optionsValue={["CTCP"]}
        />
      </Col>
    </Row>
  );
  const udpConfig = (
    <Row className="fourth-row-config config-row">
      <Col>
        <AdvInput
          type="numb"
          title="Bandwidth (Kbit/s)"
          value={bandwidth}
          handleChange={setBandwidth}
          showError={checkValid && !bandwidthValid}
          errorText="Incorrect bandwidth"
          inputRange={[1, 100000]}
          tipText={"1-100000"}
        />
      </Col>
    </Row>);
  const probingConfig = (
    <div className="probing">
      <Row className="second-row-config config-row" gutter={[32, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
        <Col>
          <AdvInput
            type="numb"
            title="Interval (s)"
            value={interval}
            inputRange={[1, 10]}
            tipText={"1-10"}
            handleChange={setInterval}
            showError={checkValid && !intervalTimeValid}
            errorText="Incorrect interval"
          />
        </Col>
        <Col>
          <AdvInput
            type="numb"
            title="Length of Buffer (KBytes)"
            value={buffer}
            inputRange={[1, 1024]}
            tipText={"1-1024"}
            handleChange={setBuffer}
            showError={checkValid && !bufferValid}
            errorText="Incorrect buffer"
          />
        </Col>
        <Col>
          <AdvInput
            type="numb"
            title="Duration (s)"
            value={probingTimeout}
            inputRange={[1, 60]}
            tipText={"1-60"}
            handleChange={setProbingTimeout}
            showError={checkValid && !probingTimeoutValid}
            errorText="Incorrect timeout"
          />
        </Col>
      </Row>
      <Row className="third-row-config config-row">
        <Col>
          <AdvInput
            type="select"
            title="Mode"
            value={mode}
            handleChange={setMode}
            showError={checkValid && !mode}
            errorText="Choose mode"
            options={['TCP', 'UDP']}
            optionsValue={['tcp', 'udp']}
          />
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

  const alphaRTCFullConfigDic = ['expirationTime', 'experimentTime', 'bweDuration'];
  const alphaRTCFullConfig = [expirationTime, experimentTime, bwe];
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

  return (
    <div className="second-tab-container">
      <Row className="content-zone" justify="center">
        <Col span={20}>
          <Row className="title-zone">
            <span className="title">{type} Job Info</span>
            <div className="sub-title">
              <span> {title} </span>
              <span >   |   </span>
              <span> {type}</span>
            </div>
          </Row>
          <Row style={{marginTop:50}}>
            { type === 'AlphaRTC' && alphaConfig }
            { type === 'Probing' && probingConfig }
            { type === 'Advanced' && advancedConfig }
          </Row>
        </Col>
      </Row>
      <CusStep
        curStep={1}
        onHandleClickNext={onClickNext}
        onHandleClickPrev={handlePrev}
      />
    </div>
  );
};
export  default  SecondTab;
