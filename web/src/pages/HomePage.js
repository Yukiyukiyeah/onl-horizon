import React from "react";
import {Row} from "antd";
import InfoCard from "../components/InfoCard";

const HomePage = () => {
  const jobAry = ['Success', 'Fail', 'Running'];
  const jobValAry = ['3', '1', '20/30'];
  const serverAry = ['Available', 'Busy', 'Error'];
  const serverValAry = ['20', '4', '0'];

  return (
    <div>
      <Row style={{margin: 20}} justify="space-around" gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
        <InfoCard keyAry={jobAry} valueAry={jobValAry} title={'My Jobs'} showIcon={true}/>
        <InfoCard keyAry={jobAry} valueAry={jobValAry} title={'Global Jobs'} showIcon={true}/>
        <InfoCard keyAry={serverAry} valueAry={serverValAry} title={'Servers'}/>
      </Row>
    </div>
  )
}

export default HomePage;
