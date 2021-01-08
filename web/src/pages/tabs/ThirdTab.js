import React, {useEffect, useState} from "react";
import {Row, Col, Radio} from "antd";
import '../../styles/ThirdTab.scss';
import {getMachineList}  from '../../backend/api';
import CusStep from "../../components/CusSteps";
import MachineSelector from "../../components/MachineSelector";

const ThirdTab = (props) => {
  const [hostChoice, setHostChoice] = useState(1);
  const { handleNext, handlePrev, type, participants = 2 } = props;
  const {title:title} = props.params;

  useEffect(() => {
    getMachineList();
  }, []);
  const onHostChoiceChange = (e) => {
    setHostChoice(e.target.value);
  };
  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };
  const hostDetail = (
    <Radio.Group className="radio-group" onChange={onHostChoiceChange} value={hostChoice}>
      <Radio style={radioStyle} value={1}>Auto-selection</Radio>
      <Radio style={radioStyle} disabled value={2}>Customized</Radio>
    </Radio.Group>
  );
  const onClickNext = () => {
    let config = {
      'modeChoice' : hostChoice
    };
    handleNext(config);
  };
  const getMachineSelector = () => {
    const machineSelectors = [];
    for (let i = 1; i <= participants; i++) {
      machineSelectors.push(<MachineSelector key={i} order={i}/>);
    }
    return machineSelectors;
  };

  return (
    <div className="third-tab-container">
      <Row justify="center">
        <Col span={20}>
          <Row className="title-zone">
            <span className="title">Host Info</span>
            <div className="sub-title">
              <span> {title} </span>
              <span>   |   </span>
              <span> {type}</span>
            </div>
          </Row>
          <Row style={{marginTop:50}}>
            {getMachineSelector()}
          </Row>
        </Col>
      </Row>
      <CusStep
        curStep={2}
        onHandleClickNext={onClickNext}
        onHandleClickPrev={handlePrev}
      />
    </div>
  );
};

export  default  ThirdTab;
