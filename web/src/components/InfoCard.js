import React from 'react';
import {Col, Row, Button} from 'antd';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import '../styles/InfoCard.scss';
import green from '../assets/green-square.png';
import red from '../assets/red-square.png';
import blue from '../assets/blued-square.png';
import chartGreen from '../assets/chart-green.png';
import chartBlue from '../assets/chart-blue.png';
import chartRed from '../assets/chart-red.png';
import {
  Chart,
  Interval,
  Tooltip,
  Axis,
  Coordinate,
  Interaction,
  getTheme
} from 'bizcharts';

const InfoCard = (props) => {
  const {title, showIcon, valueAry, keyAry, showChart = false, height, width} = props;
  const data = [
    {item: 'succeeded', count: 45, percent: 0.45},
    {item: 'failed', count: 33, percent: 0.3},
    {item: 'running', count: 22, percent: 0.22}
  ];
  const redIcon = showChart ? chartRed : red;
  const blueIcon = showChart ? chartBlue : blue;
  const greenIcon = showChart ? chartGreen : green;
  const cols = {
    percent: {
      formatter: val => {
        val = val * 100 + '%';
        return val;
      },
    },
  };
  let history = useHistory();
  const toCreatePage = () => {
    history.push('/jobs/create');
  };

  return (
    <div className="info-card-container">
      <div className="wrapper" style={{height:height, width:width}} >
        <Row className="title" justify="space-between">
          {title}
          {showChart && (<Link to="/jobs"><span className="link" style={{fontSize:14}}>{`Explore >>`} </span></Link>)}
        </Row>
        {showChart && <Row style={{marginTop: 128, paddingBottom:64}}>
          <Chart height={200} data={data} scale={cols} autoFit >
            <Coordinate type="theta" radius={0.75} />
            <Tooltip showTitle={false} />
            <Axis visible={false} />
            <Interval
              position="percent"
              adjust="stack"
              color="item"
              style={{
                lineWidth: 1,
                stroke: '#fff',
              }}
              label={['count', {
                content: (data) => {
                  return `${data.item}: ${data.percent * 100}%`;
                },
              }]}
              state={{
                selected: {
                  style: (t) => {
                    const res = getTheme().geometries.interval.rect.selected.style(t);
                    return { ...res, fill: 'red' };
                  }
                }
              }}
            />
            <Interaction type='element-single-selected'/>
          </Chart>
        </Row>  }
        <div className="row-container">
          <Row className="row r1">
            <Col className="left"> {
              showIcon && <img src={greenIcon} width={16} height={16}
              />
            }
            <span className="key">{keyAry[0]}</span>
            </Col>
            <span className="value">{valueAry[0]}</span>
          </Row>
          <Row className="row r2">
            <Col className="left">
              {
                showIcon && <img src={redIcon} width={16} height={16}
                />
              }
              <span className="key">{keyAry[1]}</span>
            </Col>
            <Col className="value">{valueAry[1]}</Col>
          </Row>
          <Row className="row r3">
            <Col className="left">
              {
                showIcon && <img src={blueIcon} width={16} height={16}
                />
              }
              <span className="key">{keyAry[2]}</span>
            </Col>

            <Col className="value">{valueAry[2]}</Col>
          </Row>
        </div>
        {showChart &&
            <Row justify="center" style={{marginTop:"128px"}}>
              <Button type="primary" size={"large"} onClick={toCreatePage}>CREATE JOB</Button>
            </Row>
        }
      </div>
    </div>
  );
};

export default InfoCard;
