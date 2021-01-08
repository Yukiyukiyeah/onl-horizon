import React, {useState} from "react";
import AdvInput from "./AdvInput";
import {Col, Row} from "antd";
import '../styles/MachineSelector.scss';
const InternalSelector = (props, ref) => {
  const {
    data = {},
    order = 0
  }= props;
  const [location, setLocation] = useState();
  const [networkType, setNetworkType] = useState();
  const [machineType, setMachineType] = useState();

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
            options={["CTCP"]}
            optionsValue={["CTCP"]}
          />
        </Col>
        <Col>
          <AdvInput
            type="select"
            width={"122px"}
            title="Network Type"
            value={networkType}
            handleChange={setNetworkType}
            disabled={true}
            // showError={checkValid && !tcpControl}
            errorText="Choose location first"
            options={["CTCP"]}
            optionsValue={["CTCP"]}
          />
        </Col>
        <Col>
          <AdvInput
            type="select"
            title="Machine Type"
            width={"122px"}
            value={machineType}
            handleChange={setMachineType}
            // showError={checkValid && !tcpControl}
            errorText="Choose location and network type first"
            options={["CTCP"]}
            optionsValue={["CTCP"]}
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
const MachineSelector = React.forwardRef(InternalSelector);
export default MachineSelector;