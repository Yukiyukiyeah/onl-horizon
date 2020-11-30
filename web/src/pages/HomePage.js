import React from "react";
import {Row, Col} from "antd";
import InfoCard from "../components/InfoCard";

const HomePage = (props) => {
    const jobAry = ['Success', 'Fail', 'Running'];
    const jobValAry = ['3', '1', '20/30'];
    const serverAry = ['Available', 'Busy', 'Error'];
    const serverValAry = ['20', '4', '0'];
    return (
        <Row className="info-row" gutter={[16,{ xs: 8, sm: 16, md: 24, lg: 32 }]} justify="space-around">
            <Col>
                <InfoCard
                    keyAry={jobAry}
                    valueAry={jobValAry}
                    title={'My Jobs'}
                    showIcon={true}
                    >

                </InfoCard>
            </Col>
            <Col>
                <InfoCard
                    keyAry={jobAry}
                    valueAry={jobValAry}
                    title={'Global Jobs'}
                    showIcon={true}>

                </InfoCard>
            </Col>
            <Col>
                <InfoCard
                    keyAry={serverAry}
                    valueAry={serverValAry}
                    title={'Servers'}>
                </InfoCard>
            </Col>
        </Row>
    )
}

export default HomePage;
