import React, { useState, useEffect } from 'react';
import {Row, Table} from "antd";
import '../../styles/Self.scss';
import {getLatest3} from "../../backend/api";

const Self = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getLatest3()
      .then(res => {
        console.log('latest3 data', res.data);
      });
  }, [data]);

  return (
    <div className="self-container">
      <Row justify="space-between">
        <p className="title">Self</p>
      </Row>
      <div className="table-wrapper">
        <Table
        />
      </div>
    </div>
  );
};

export default Self;