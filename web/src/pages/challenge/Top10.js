import React, { useState, useEffect } from 'react';
import {Row, Table} from "antd";
import {getTop10} from '../../backend/api';
import '../../styles/Top10.scss';

const Top10 = (props) => {
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
      dataIndex: 'rank',
      key:'rank',
    },
    {
      title: 'Metrics(audio score)',
      dataIndex: 'rank',
      key:'rank',
    },
    {
      title: 'Metrics(all)',
      dataIndex: 'rank',
      key:'rank',
    },
  ];
  useEffect(() => {
    getTop10()
      .then(res => {
        console.log('top10 data', res.data);
        setData(res);
      });
  }, [data]);
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