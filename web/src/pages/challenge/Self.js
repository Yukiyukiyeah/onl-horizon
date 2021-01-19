import React, { useState, useEffect } from 'react';
import {Row, Table} from "antd";
import '../../styles/Self.scss';

const Self = () => {
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