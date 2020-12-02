import {Button, Col, Row, Table} from "antd";
import React, {useEffect, useState} from "react";
import moment from "moment";
import * as momenttz from 'moment-timezone';
import { getJobInfo } from '../backend/api';
import '../styles/JobDetailPage.scss';
const columns = [
  {
    title: 'prop',
    dataIndex: 'prop',
    width: '30%',
    render: text => <b>{text}</b>,
  },
  {
    title: 'value',
    dataIndex: 'value',
    width: '70%'
  }
];
const columnReflect = [
  ['Name', 'title'],
  ['Time', 'time'],
  ['Type', 'appType'],
  ['User', 'user'],
  ['Retires', 'expirationTime'],
  ['Status', 'status'],
  ['Job Config', 'jobConfig'],
  ['SSH/RDP info', 'ssh'],
  ['Stdout/Stderr', 'std'],
  ['Exit code/Type', 'exit']
];
const columnConvert = new Map(columnReflect);
const statusNumToString = [
  [0, 'Init'],
  [1, 'Created'],
  [2, 'Running'],
  [3, 'Succeeded'],
  [4, 'Failed'],
];
const statusConvert = new Map(statusNumToString);
const typeNumToString = [
  [0, 'AlphaRTC'],
  [1, 'Probing'],
  [2, 'Advanced'],
];
const typeConvert = new Map(typeNumToString);
const JobDetail = (props) => {
  const [data, setData] = useState([]);
  const [jobDescription, setJobDesc] = useState('');
  const [loading, setLoading] = useState(true);
  const funcZone = (
    <div className="func-zone" >
      <Button type="default" id="0" className="logs-btn btn" disabled>
        <span className="btn-text">JOB LOGS</span>
      </Button>
      <Button type="default" id="1" className="clone-btn btn" disabled>
        <span className="btn-text">CLONE</span>
      </Button>
      <Button type="default" id="2" className="stop-btn btn" disabled>
        <span className="btn-text">STOP</span>
      </Button>
      <Button type="default" id="3" className="download-btn btn" disabled>
        <span className="btn-text">DOWNLOAD DATASET</span>
      </Button>
    </div>);
  const  initData = (id) => {

    getJobInfo(id)
      .then((info) => handleJobInfo(info));
  };
  const handleJobInfo = (initJobInfo)  =>{
    const tempData = [];
    setJobDesc(initJobInfo.description);
    for (const entry of columnConvert.entries()) {
      const curKey = {};
      const [tar, src] = entry;
      curKey['key'] = tempData.length;
      curKey['prop'] = tar;
      let value;
      // set default display value
      if (initJobInfo[src] === null || initJobInfo[src] === undefined) {
        value = 'null';
      } else {
        value = initJobInfo[src];
      }

      if (tar === 'Status') {
        curKey['value'] = statusConvert.get(value);

      } else if (tar === 'Type') {
        curKey['value'] = typeConvert.get(value);
      } else if (tar === 'User') {
        curKey['value'] = 'Alex';
      } else if (tar === 'Time') {
        const utc = initJobInfo['createTime'].slice(0, 19) + 'Z';
        const timezone = moment.tz.guess();
        curKey['value'] = momenttz(utc).tz(timezone).format('YYYY-MM-DD HH:mm:ss');
      } else {
        curKey['value'] = value;
      }
      tempData.push(curKey);
    }
    setData(tempData);
    setLoading(false);
  };

  useEffect(() => {
    const id = props.match.params.id;
    initData(id);
  }, []);
  return (
    <div className="job-detail-container">
      <Row justify="space-between">
        <p className="title">Job Detail</p>
        <div className="func-wrapper">
          {funcZone}
        </div>
      </Row>
      <Row className="subtitle">{jobDescription}</Row>
      <Row className="table-wrapper" style={{marginTop:'64px'}}>
        <Col span={12}>
          <Table columns={columns}
            dataSource={data}
            loading={loading}
            size={"middle"}
            showHeader={false}
            pagination={false}
          />
        </Col>
      </Row>
    </div>
  );
};

export default JobDetail;