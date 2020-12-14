import React, {useState, useEffect} from 'react';
import ReactCSSTransitionGroup from 'react-transition-group';
import '../styles/Modal.scss';
import {Button, Space, Switch, Table} from "antd";

const Modal = (props) => {
  const [checkStrictly, setCheckStrictly] = React.useState(false);
  const {handleConfirm, confirmText, handleCancel, cancelText, data, description, title, visible, height="250px", existTable} = props;
  const tableStyle = {
    display: 'block',
    height: 400,
    overflow: 'auto'
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [willDownloadFiles, setWillDownloadFiles] = useState([]);
  const keyToFile = new Map();
  const keyToId = new Map();

  useEffect(() => {
    const allRowKeys = [];
    for (let i in data) {
      for (let file of data[i].files) {
        allRowKeys.push(allRowKeys.length);
      }
    }

    updateWillDownloadFiles(allRowKeys);
    setSelectedRowKeys(allRowKeys);
  }, [data]);

  const handleRowData = () => {
    const retData = [];
    for (let i in data) {
      const curJob = {};
      curJob.key = parseInt(i);
      curJob.name = data[i].title;
      curJob.id = data[i].jobId;
      const filesPath = [];
      for (let file of data[i].files) {
        const fileObj = {};
        fileObj.key = parseInt(curJob.key + '' + filesPath.length);
        fileObj.name = file;
        fileObj.isFile = true;
        fileObj.id = curJob.id;
        filesPath.push(fileObj);
        keyToFile.set(fileObj.key, file);
        keyToId.set(fileObj.key,  fileObj.id);
      }
      curJob.children = filesPath;
      retData.push(curJob);
    }
    return retData;
  };

  const convertedData = handleRowData(data);

  const updateWillDownloadFiles = (selectedRowKeys) => {
    setWillDownloadFiles([]);
    const temp = [];
    for (const key of selectedRowKeys) {
      if (keyToFile.has(+key)) {
        temp.push({
          id: keyToId.get(+key),
          file: keyToFile.get(+key)
        });
      }
    }
    setWillDownloadFiles(temp);
  };

  const onSelectChange = (selectedRowKeys) => {
    updateWillDownloadFiles(selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (filename, record) => {
        return record.isFile ? (<a>{filename}</a>) : filename;
      }
    }
  ];
  const onHandleConfirmClick = () => {
    handleConfirm(willDownloadFiles);
  };
  const handleFileClick = (fileObj) => {
    const url = 'https://api.opennetlab.org/api' + '/results/download/' + fileObj.id + '?filename=' + fileObj.name;
    var temporaryDownloadLink = document.createElement("a");
    temporaryDownloadLink.style.display = 'none';
    document.body.appendChild(temporaryDownloadLink);
    temporaryDownloadLink.setAttribute('href', url);
    temporaryDownloadLink.setAttribute('download', fileObj.file);
    temporaryDownloadLink.click();
    document.body.removeChild(temporaryDownloadLink);

  };

  return visible && (
    <div className="modal-wrapper">
      <div className="modal" style={{maxHeight:height}}>
        <div className="modal-title"><span>{title}</span></div>
        <div className="modal-content"><span>{description}</span></div>
        {existTable &&
        <div className="modal-content" style={ tableStyle}>
          <Table
            columns={columns}
            rowSelection={{ ...rowSelection, checkStrictly}}
            dataSource={convertedData}
            showHeader={false}
            expandable={{defaultExpandAllRows: true}}
            onRow={record => {
              if (record.isFile) {
                return {
                  onClick: () => {
                    handleFileClick(record);
                  }
                };
              }
            }
            }
          />
        </div>}
        <div className="modal-operator">
          <Button type="primary"  className="modal-operator-confirm" onClick={onHandleConfirmClick}>{confirmText}</Button>
          <Button  className="modal-operator-close" onClick={handleCancel}>{cancelText}</Button>
        </div>
      </div>
      <div className="mask"></div>
    </div>
  );
};

export default Modal;
