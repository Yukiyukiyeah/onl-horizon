import React, { useState, useEffect } from 'react';
import {Row, Table} from "antd";
import {getTop10} from '../../backend/api';
import '../../styles/Top10.scss';

const Top10 = () => {
  const [data, setData] = useState([]);
  const columns = [
    {
      title: 'Rank',
      dataIndex: 'rank',
      key:'rank',
    },
    {
      title: 'User Name',
      dataIndex: 'username',
      key:'username',
    },
    {
      title: 'University',
      dataIndex: 'university',
      key:'university',
    },
    {
      title: 'Metrics(video score)',
      dataIndex: 'metricsVideo',
      key:'metricsVideo',
    },
    {
      title: 'Metrics(audio score)',
      dataIndex: 'metricsAudio',
      key:'metricsAudio',
    },
    {
      title: 'Metrics(all)',
      dataIndex: 'metricsAll',
      key:'metricsAll',
    },
  ];
  useEffect(() => {
    getTop10()
      .then(res => {
        setData(res);
      });
  }, []);
  return(
    <div className="top10-container">
      <Row justify="space-between">
        <p className="title">Top 10</p>
      </Row>
      <div className="table-wrapper">
        <Table
          columns={columns}
          dataSource={data}
        />
      </div>
    </div>
  );
};


export default Top10;