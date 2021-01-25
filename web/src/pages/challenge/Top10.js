import React, { useState, useEffect } from 'react';
import {Row, Table} from "antd";
import {getTop10} from '../../backend/api';
import '../../styles/Top10.scss';

const Top10 = (props) => {
  const [data, setData] = useState([]);
  const columns = {};
  useEffect(() => {
    getTop10()
      .then(res => {
        console.log('top10 data', res.data);
      });
  }, [data]);
  return(
    <div className="top10-container">
      <Row justify="space-between">
        <p className="title">Top 10</p>
      </Row>
      <div className="table-wrapper">
        <Table
        />
      </div>
    </div>
  );
};


export default Top10;