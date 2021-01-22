import React, {useEffect, useState, useRef} from "react";
import { useHistory } from "react-router-dom";
import { Button, Row, Table, Switch, Space } from "antd";
import {allJobInfo, downloadDataset, stopJob, restartJob, deleteJob, downloadMultipleFiles} from '../../backend/api';
import '../../styles/JobListPage.scss';
import * as momenttz from 'moment-timezone';
import * as moment from 'moment';
import Modal from '../../components/Modal';
import * as Setting from "../../utils/Setting";

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
    sorter:(a, b) => a.type.localeCompare(b.type),
    render: (text, record, index) => {
      return Setting.appTypeMapR[text];
    }
  },
  {
    title: 'Running Time (min)',
    dataIndex: 'duration',
    sorter: (a, b) =>  a.duration.toString().localeCompare(b.duration.toString())
  },
  {
    title: 'Expiration Time (s)',
    dataIndex: 'expirationTime',
    sorter: (a, b) => a.expirationTime - b.expirationTime
  },
  {
    title: 'Status',
    dataIndex: 'status',
    sorter: (a, b) => a.status.localeCompare(b.status),
  },
  {
    title: 'Created At',
    dataIndex: 'date',
    sorter: (a, b) => a.date.localeCompare(b.date),
    defaultSortOrder: 'descend'
  },
  {
    title: 'User',
    dataIndex: 'user',
    sorter: (a, b) => a.user.localeCompare(b.user),
  },
];
const btnToModalBtn = ['Stop', 'Start', 'Delete', 'Download'];
const btnToModalTitle = ['Stop Job', 'Start Job', 'Delete Job', 'Download Dataset'];
const statusNumToString = [
  [0, 'Init'],
  [1, 'Created'],
  [2, 'Running'],
  [3, 'Succeeded'],
  [4, 'Failed'],
];
const statusConvert = new Map(statusNumToString);

const columnReflect = [
  ['jobId', 'id'],
  ['name', 'title'],
  ['type', 'appType'],
  ['duration', 'duration'],
  ['expirationTime', 'expirationTime'],
  ['status', 'status'],
  ['user', 'userName'],
  ['date', 'createTime'],
  ['files', 'dataFiles']];
const columnConvert = new Map(columnReflect);
const keyToJobId = new Map();

let downloadData = null;
const JobList = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [btnId, setBtnId] = useState(0);
  const [downloadDisabled, setDownloadDisabled] = useState(true);
  const [stopDisabled, setStopDisabled] = useState(true);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
    if (!selectedRowKeys || !selectedRowKeys.length) {
      setBtnDisabled(true);
    }
    else {
      setBtnDisabled(false);
    }
    setDownloadDisabled(false);
    for (const jobKey of selectedRowKeys) {
      if (data[jobKey].status !== 'Succeeded') {
        setDownloadDisabled(true);
        break;
      }
    }
    setStopDisabled(false);
    for (const jobKey of selectedRowKeys) {
      if (data[jobKey].status === 'Succeeded') {
        setStopDisabled(true);
        break;
      }
    }
    const tempData = [];
    for (const jobKey of selectedRowKeys) {
      const curJob = data[jobKey];
      if (curJob.status === 'Succeeded') {
        const fileObj = {'title':curJob.name, 'files': curJob.files, 'jobId': curJob.jobId};
        tempData.push(fileObj);
      }
    }
    downloadData = tempData;
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT
    ]
  };
  const handleJobInfo = (jobs) => {
    const tempJobData = [];
    for (const job of jobs) {
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

        if (tar === 'duration') {
          const startTime = job['startTime'];
          const stopTime = job['stopTime'];

          if (startTime === null) {
            curJobInfo[tar] = "N/A";
          } else if (stopTime === null) {
            const timezone = moment.tz.guess();
            const startDate = momenttz(startTime).tz(timezone);
            const endDate = moment();
            curJobInfo[tar] = endDate.diff(startDate, 'minutes');
          } else {
            const timezone = moment.tz.guess();
            const startDate = momenttz(startTime).tz(timezone);
            const endDate = momenttz(stopTime).tz(timezone);
            curJobInfo[tar] = endDate.diff(startDate, 'minutes');
          }
        } else if (tar === 'date') {
          const createTime = job['createTime'];
          const timezone = moment.tz.guess();
          curJobInfo[tar] = momenttz(createTime).tz(timezone).format('YYYY-MM-DD HH:mm:ss');
        } else {
          curJobInfo[tar] = value;
        }
      }

      tempJobData.push(curJobInfo);
    }
    setData(tempJobData);
    setLoading(false);


  };
  const loadJobList = () => {
    allJobInfo()
      .then((res) => {
        handleJobInfo(res.data);
      })
      .then(() => {
        setSelectedRowKeys([]);
      });
  };
  let history = useHistory();
  const handleJobNameClick = (id) => {
    history.push({pathname:'/jobs/detail/'+id});
  };

  useEffect(() => {
    loadJobList();
  }, []);
  const download = (data) => {
    if (!data || data.length === 0) {
      return;
    }
    downloadMultipleFiles(data);
  };
  const deleteSelectedJob = () => {

  };
  const restartSelectedJob = () => {

  };
  const stopSelectedJob = () => {

  };

  const handleModalConfirm = (data) => {
    switch (btnId) {
    case '0':
      stopSelectedJob();
      break;
    case '1':
      restartSelectedJob();
      break;
    case '2':
      deleteSelectedJob();
      break;
    case '3':
      download(data);
    }
  };
  const handleModalCancel = () => {
    setShowModal(false);
  };

  const showModalView = (e) => {
    const curBtn = e.target;
    const id = curBtn.id;
    setBtnId(id);
    setShowModal(true);
  };

  const funcZone = (
    <div className="func-zone" onClick={showModalView}>
      <Button type="default" id="0" className="stop-btn btn" disabled={true || btnDisabled || stopDisabled}>
        <span className="btn-text" id="0">STOP</span>
      </Button>
      <Button type="default" id="1" className="restart-btn btn" disabled={true || btnDisabled}>
        <span className="btn-text">RESTART</span>
      </Button>
      <Button type="default" id="2" className="delete-btn btn" disabled={true || btnDisabled}>
        <span className="btn-text" id="2">DELETE</span>
      </Button>
      <Button type="default" id="3" className="download-btn btn" disabled={(btnDisabled || downloadDisabled)}>
        <span className="btn-text" id="3">DOWNLOAD DATASET</span>
      </Button>
    </div>);

  const slots = [
    'These jobs will stop. Are you sure?',
    'These jobs will start. Are you sure?',
    'These jobs will be deleted. Are you sure?',
    'Please choose files to download:'];

  return (
    <div className="jobList-container">
      <Modal
        visible={showModal}
        handleConfirm={handleModalConfirm}
        handleCancel={handleModalCancel}
        confirmText={btnToModalBtn[btnId]}
        cancelText={"Cancel"}
        description={slots[btnId]}
        title={btnToModalTitle[btnId]}
        height={btnId === 3 ? "600px" : "250px"}
        existTable={+btnId === 3 }
        jobs={downloadData}
      />
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
              onClick: (e) => {
                if (e && e.target && e.target.tagName === 'A'){
                  handleJobNameClick(record.jobId);
                }
              }
            };
          }}
        />
      </div>
    </div>
  );
};

export default JobList;
