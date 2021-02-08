import React, {useEffect, useState} from "react";
import {Row, Col, Radio} from "antd";
import '../../../styles/ThirdTab.scss';
import {getMachineList}  from '../../../backend/api';
import CusStep from "../../../components/CusSteps";
import MachineSelector from "../../../components/MachineSelector";

const labels = ['location', 'networkType', 'machineType'];

//todo: what is the data struc of machineData?
class TrieNode {
  constructor(value, label, depth = -1) {
    this.value = value;
    this.label = label;
    this.depth = depth;
    this.children = [];
  }
  findNode(value, depth) {
    for (const child of this.children) {
      if (child && child.value === value && child.depth === depth) {
        return child;
      }
    }
    return null;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode(null, null, -1);
  }
  // @machineInfo: Array[dt.location, dt.networkType, dt.machineType]
  insert(machineInfo) {
    let node = this.root;
    for (const info of machineInfo) {
      const curDepth = node.depth + 1;
      let curNode = node.findNode(info, curDepth);
      if (!curNode) {
        curNode = new TrieNode(info, labels[curDepth], curDepth);
        node.children.push(curNode);
      }
      node = curNode;
    }
  }
}

const ThirdTab = (props) => {
  const [hostChoice, setHostChoice] = useState(1);
  const { handleNext, handlePrev, type, participants = 2 } = props;
  const {title:title} = props.params;
  const [rowMachineData, setRowMachineData] = useState(null);
  const [machineData, setMachineData] = useState(null);
  const [checkValid, setCheckValid] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const [machineFilters, setMachineFilters] = useState([]);

  const isFieldsValid = (res) => {
    setIsNext(res);
    return res;
  };

  // todo: call when render?
  // let machineFilters = new Array(participants).fill({});

  // todo:call when render? participants = 2
  const ary = new Array(participants).fill(1);

  useEffect(() => {
    getMachineList()
      .then((r) => {
        handleRowData(r);
      })
      .catch(e => {console.log('err', e);});
  }, []);

  // setRowMachineData, setMachineData
  const handleRowData = (rowData) => {
    setRowMachineData(rowData);
    console.log('rowMachineData:', rowMachineData);
    if (!rowData) {
      return null;
    }
    // initMachineFilters(); // machineFilters = rowMachineData
    const nt = new Trie(); // create a tree of machine list
    for (const dt of rowData) {
      if (dt.location == null) dt.location = 'null'; //todo
      nt.insert([dt.location, dt.networkType, dt.machineType]);
    }
    setMachineData(nt); // machineData: Trie(), all machine's data
    // console.log('machineData:', machineData);
  };

  const initMachineFilters = () => {
    // setMachineFilters(rowMachineData);
    // console.log('initMachineFilters', machineFilters);
  };

  // todo: call when user finish one line's input ?
  // machineFilter is the result of user's selection
  const handleMachineFilters = (location, networkType, machineType, idx) => {
    const insertIdx = idx - 1;
    const filterObj = {
      "location":location,
      "networkType": networkType,
      "machineType": machineType,
    };
    // machineFilters[insertIdx] = JSON.stringify(filterObj);
    setMachineFilters(()=> {
      machineFilters[insertIdx] = JSON.stringify(filterObj);
      return machineFilters;
    });
    console.log('handle - MachineFilters:', machineFilters);
    console.log('handle - rowMachineData:', rowMachineData);
    console.log('handle - initMachineFilters', machineFilters);
    console.log('handle - machineData:', machineData);

  };

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
      <Radio style={radioStyle} value={2}>Customized</Radio>
    </Radio.Group>
  );

  // todo: when to use? seems to appear in local version
  const getMachineSelector = () => {
    const machineSelectors = [];
    for (let i = 1; i <= participants; i++) {
      machineSelectors.push(<MachineSelector key={i} order={i} data={machineData}/>);
    }
    return machineSelectors;
  };

  const onClickNext = () => {
    if (hostChoice === 1 || isNext) {
      let config = {
        "machineFilters": machineFilters
      };
      handleNext(config);
    } else {
      setCheckValid(true);
    }
  };

  const renderServer = () => {
    return(
      <Row style={{marginTop:50}}>
        {
          ary.map((item, idx) => (
            <MachineSelector
              key={idx}
              order={idx + 1}
              data={(machineData && machineData.root) ? machineData.root : null}
              defaultData={(rowMachineData && idx < participants) ? rowMachineData[idx] : null}
              handleMachineFilters={handleMachineFilters}
              checkValid={checkValid}
              isFieldsValid={isFieldsValid}
            />
          ))
        }
      </Row>
    );
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
          <Row style={{marginTop: 50}}>
            {hostDetail}
          </Row>
          {
            hostChoice === 2? renderServer() : null
          }
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

export default ThirdTab;
