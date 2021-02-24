import React from "react";
import {Row, Col} from "antd";
import '../../../styles/VerifyTab.scss';
import ReactJson from 'react-json-view';
import CusStep from "../../../components/CusSteps";

const VerifyTab = (props) => {
  const { handleNext, handlePrev, type, params } = props;
  const {title:title} = params;
  const onClickNext = () => {
    handleNext({});
  };
  // filterDics
  // todo: advanced?
  const alphaRTCFullConfigDic = ['title', 'appType', 'description', 'expirationTime', 'machineFilter'];
  const probingFullConfigDicTCP = ['title', 'appType', 'description', 'interval', 'bufferLen', 'timeout', 'mode', 'tcpWindowSize', 'mss', 'tcpControl',  'machineFilter'];
  const probingFullConfigDicUDP = ['title', 'appType', 'description', 'interval', 'bufferLen', 'timeout', 'mode', 'bandwidth', 'machineFilter'];
  // todo: advanced?
  const paramsFilter = (p) => {
    const filteredParams = {};
    let filterDic = [];
    if (type === 'AlphaRTC') {
      filterDic = alphaRTCFullConfigDic;
    }
    else if (type === 'Probing') {
      if (p.mode === 'tcp') {
        filterDic = probingFullConfigDicTCP;
      }
      else if (p.mode === 'udp') {
        filterDic = probingFullConfigDicUDP;
      }
    }
    else {
      return p;
    }
    for (const key of filterDic) {
      // todo: no modeChoice?
      if (key === 'modeChoice') {
        filteredParams[key] = 'auto selection';
        continue;
      }
      filteredParams[key] = params[key];
    }
    return filteredParams;

  };
  return (
    <div className="verify-tab-container">
      <Row justify="center">
        <Col span={20}>
          <Row className="title-zone">
            <span className="title">Confirmation</span>
            <div className="sub-title">
              <span> {title} </span>
              <span>   |   </span>
              <span> {type}</span>
            </div>
          </Row>
          <Row style={{marginTop:50}}>
            <ReactJson src={paramsFilter(params)}/>
          </Row>
        </Col>
      </Row>
      <CusStep
        curStep={3}
        onHandleClickNext={onClickNext}
        onHandleClickPrev={handlePrev}
      />
    </div>
  );
};

export  default  VerifyTab;
