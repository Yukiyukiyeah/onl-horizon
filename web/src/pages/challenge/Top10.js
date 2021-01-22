import React, { useState, useEffect } from 'react';
import {Row, Table} from "antd";
import '../../styles/Top10.scss';

const Top10 = () => {
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