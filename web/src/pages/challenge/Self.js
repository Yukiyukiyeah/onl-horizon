import React, { useState, useEffect } from 'react';
import {Row, Table} from "antd";
import '../../styles/Self.scss';
import {getLatest3} from "../../backend/api";

const Self = (props) => {
  const [data, setData] = useState([]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key:'name',
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
    {
      title: 'Rank',
      dataIndex: 'rank',
      key:'rank',
    },
  ];

  useEffect(() => {
    getLatest3()
      .then(res => {
        console.log('latest3 data', res.data);
        setData(res);
      });
  }, [data]);

  return (
    <div className="self-container">
      <Row justify="space-between">
        <p className="title">Self</p>
      </Row>
      <div className="table-wrapper">
        <Table
          dataSource={data}
          columns={columns}
        />
      </div>
    </div>
  );
};

export default Self;