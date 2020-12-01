import React from "react";
import {Row, Col} from "antd";
import InfoCard from "../components/InfoCard";

const HomePage = () => {
  const jobAry = ['Success', 'Fail', 'Running'];
  const jobValAry = ['3', '1', '20/30'];
  const serverAry = ['Available', 'Busy', 'Error'];
  const serverValAry = ['20', '4', '0'];

  return (
    <div>
      <Row justify="space-around">
        <Col span={8}>
          <InfoCard keyAry={jobAry} valueAry={jobValAry} title={'My Jobs'} showIcon={true}/>
        </Col>
        <Col span={8}>
          <InfoCard keyAry={jobAry} valueAry={jobValAry} title={'Global Jobs'} showIcon={true}/>
        </Col>
        <Col span={8}>
          <InfoCard keyAry={serverAry} valueAry={serverValAry} title={'Servers'}/>
        </Col>
      </Row>
    </div>
  )
}

export default HomePage;
