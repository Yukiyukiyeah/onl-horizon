import React, {useEffect, useState} from "react";
import AdvInput from "./AdvInput";
import {Col, Row} from "antd";
import '../styles/MachineSelector.scss';

// todo：solve the display problems
const InternalSelector = (props, ref) => {
  const {
    data = {},
    defaultData = {},
    order = 0,
    handleMachineFilters
  } = props;
  const [location, setLocation] = useState(null);
  const [locationOptions, setLocationOptions] = useState([]);
  const [networkType, setNetworkType] = useState(null);
  const [networkTypeOptions, setNetworkTypeOptions] = useState([]);
  const [networkTypeDisabled, setNetworkTypeDisabled] = useState(true);
  const [machineType, setMachineType] = useState(null);
  const [machineTypeOptions, setMachineTypeOptions] = useState([]);
  const [machineTypeDisabled, setMachineTypeDisabled] = useState(true);

  const DEPTH_LOCATION = -1;
  const DEPTH_NETWORKTYPE = 0;
  const DEPTH_MACHINETYPE = 1;

  const getChildrenNodeOptionsByDepth = (node) => {
    if (!node) {
      return ;
    }
    const childrenNodes = [];
    const childrenOptions = [];
    for (const child of node.children) {
      childrenNodes.push(child);
      childrenOptions.push(child.value);
    }
    if (node.depth === DEPTH_LOCATION) {
      setLocationOptions(childrenNodes);
    }
    if (node.depth === DEPTH_NETWORKTYPE) {
      setNetworkTypeOptions(childrenNodes);
    }
    if (node.depth === DEPTH_MACHINETYPE) {
      setMachineTypeOptions(childrenNodes);
    }
  };

  const getNodesValue = (nodes) => {
    return nodes.map((item) => {return item.value;});
  };

  useEffect(() => {
    if (data) {
      getChildrenNodeOptionsByDepth(data);
    }
  }, [data, defaultData]);

  useEffect(() => {
    // set machineType and networkType as null when changing the location
    setMachineType(null);
    setNetworkType(null);
    if (location) {
      setNetworkTypeDisabled(false);
    }
    for (const lc of locationOptions) {
      if (lc.value === location) {
        getChildrenNodeOptionsByDepth(lc);
        break;
      }
    }
  }, [location]);

  // set null when changing the network type
  useEffect(() => {
    setMachineType(null);
  }, [networkType]);

  useEffect(() => {
    if (location && networkType) {
      setMachineTypeDisabled(false);
    }
    for (const nw of networkTypeOptions) {
      if (nw.value === networkType) {
        getChildrenNodeOptionsByDepth(nw);
        break;
      }
    }
  }, [location, networkType]);

  useEffect(() => {
    if (location && networkType && machineType) {
      handleMachineFilters(location, networkType, machineType, order);
    }
  }, [location, networkType, machineType]);

  const selectGroup = (
    <div className="selector-wrapper">
      <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
        <Col>
          <AdvInput
            type="select"
            width={"261px"}
            title="Location"
            value={location}
            handleChange={setLocation}
            errorText="Choose control method"
            options={getNodesValue(locationOptions)}
            optionsValue={getNodesValue(locationOptions)}
          />
        </Col>
        <Col>
          <AdvInput
            type="select"
            width={"122px"}
            title="Network Type"
            value={networkType}
            handleChange={setNetworkType}
            disabled={networkTypeDisabled}
            showError={networkTypeDisabled}
            errorText="Choose location first"
            options={getNodesValue(networkTypeOptions)}
            optionsValue={getNodesValue(networkTypeOptions)}
          />
        </Col>
        <Col>
          <AdvInput
            type="select"
            title="Machine Type"
            width={"122px"}
            value={machineType}
            handleChange={setMachineType}
            showError={machineTypeDisabled}
            disabled={machineTypeDisabled}
            errorText="Choose location and network type first"
            options={getNodesValue(machineTypeOptions)}
            optionsValue={getNodesValue(machineTypeOptions)}
          />
        </Col>
      </Row>
    </div>
  );
  return (<div className="selector-container">
    <div className="selector-wrapper">
      <div className="server-order-container">
        <p>{`Server #${order}`}</p>
      </div>
      <div className="select-group-container">
        {selectGroup}
      </div>
    </div>
  </div>
  );
};

// todo: why?
const MachineSelector = React.forwardRef(InternalSelector);
export default MachineSelector;