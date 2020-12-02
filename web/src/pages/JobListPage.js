import React, {useEffect, useState} from "react";
import { Button, Row, Table} from "antd";
import { allJobInfo } from '../backend/api';
import '../styles/JobListPage.scss';
import * as momenttz from 'moment-timezone';
import * as moment from 'moment';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
    render: text => <a>{text}</a>,
  },
  {
    title: 'Type',
    dataIndex: 'type',
    sorter:(a, b) => a.type.localeCompare(b.type)
  },
  {
    title: 'Running time',
    dataIndex: 'duration',
    sorter: (a, b) => a.duration.localeCompare(b.duration),
  },
  {
    title: 'Retires',
    dataIndex: 'retires',
    sorter: (a, b) => a - b,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    sorter: (a, b) => a.status.localeCompare(b.status),
  },
  {
    title: 'User',
    dataIndex: 'user',
    sorter: (a, b) => a.user.localeCompare(b.user),
  },
  {
    title: 'Create Time',
    dataIndex: 'date',
    sorter: (a, b) => a.date.localeCompare(b.date)
  }
];
// const btnToModal = ['Stop', 'Start', 'Delete', 'Download Dataset'];
// const modalDescription = [
//   'These jobs will stop. Are you sure?',
//   'These jobs will start. Are you sure?',
//   'These jobs will be deleted. Are you sure?',
//   'The dataset will download to your device'];

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
const columnReflect = [
  ['jobId', 'id'],
  ['name', 'title'],
  ['type', 'appType'],
  ['duration', 'duration'],
  ['retires', 'expirationTime'],
  ['status', 'status'],
  ['user', 'userId'],
  ['date', 'createTime']];
const columnConvert = new Map(columnReflect);
const keyToJobId = new Map();

const JobList = (props) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT
    ]
  };
  const handleJobInfo = (initJobInfo) => {
    const tempJobData = [];
    for (const job of initJobInfo) {
      const curJobInfo = {};
      curJobInfo['key'] = tempJobData.length;
      keyToJobId.set(curJobInfo['key'], job.id);

      for (const entry of columnConvert.entries()) {
        const [tar, src] = entry;
        let value = 'error';
        // set default display value
        if (job[src] === null || job[src] === undefined) {
          value = 'null';
        } else {
          value = job[src];
        }

        if (tar === 'status') {
          curJobInfo[tar] = statusConvert.get(value);
        } else if (tar === 'type') {
          curJobInfo[tar] = typeConvert.get(job[src]);
        } else if (tar === 'user') {
          curJobInfo[tar] = 'Alex';
        } else if (tar === 'duration') {
          const utc = job['createTime'].slice(0, 19) + 'Z';
          const timezone = moment.tz.guess();
          const startDate = momenttz(utc).tz(timezone);
          const endDate = moment();
          curJobInfo[tar] = endDate.diff(startDate, 'minutes') + ' minutes';
        } else if (tar === 'date') {
          const utc = job['createTime'].slice(0, 19) + 'Z';
          const timezone = moment.tz.guess();
          curJobInfo[tar] = momenttz(utc).tz(timezone).format('YYYY-MM-DD HH:mm:ss');
        } else {
          curJobInfo[tar] = value;
        }
      }

      tempJobData.push(curJobInfo);
    }
    setData(tempJobData) ;
    setLoading(false);


  };
  const loadJobList = () => {
    allJobInfo()
      .then((res) => {
        handleJobInfo(res);
      })
      .then(() => {
        setSelectedRowKeys([]);
      });
  };

  const showModalView = () => {

  };
  const handleJobNameClick = (id) => {
    props.history.push({pathname:'/jobs/detail/'+id});
  };
  useEffect(() => {
    loadJobList();
  }, []);
  const funcZone = (
    <div className="func-zone" onClick={showModalView}>
      <Button type="default" id="0" className="stop-btn btn" disabled>
        <span className="btn-text">STOP</span>
      </Button>
      <Button type="default" id="1" className="restart-btn btn" disabled>
        <span className="btn-text">RESTART</span>
      </Button>
      <Button type="default" id="2" className="delete-btn btn" disabled>
        <span className="btn-text">DELETE</span>
      </Button>
      <Button type="default" id="3" className="download-btn btn" disabled>
        <span className="btn-text">DOWNLOAD DATASET</span>
      </Button>
    </div>);


  return (
    <div className="jobList-container">
      <Row justify="space-between">
        <p className="title">Job List</p>
        <div className="func-wrapper">
          {funcZone}
        </div>
      </Row>

      <div className="table-wrapper">
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          loading={loading}
          onRow={record => {
            return {
              onClick: () => {handleJobNameClick(record.jobId);} // 点击行
            };
          }}
        />
      </div>
    </div>
  );
};

export default JobList;
