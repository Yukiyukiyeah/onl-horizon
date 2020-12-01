import React from "react";
import {Button} from "antd";
import '../styles/JobListPage.scss'
const JobList = () => {
  const showModalView = () => {

  }
  const funcZone = (
    <div className="func-zone" onClick={showModalView}>
      <Button type="default" id="0" class="stop-btn btn" disabled>
        <span className="btn-text">STOP</span>
      </Button>
      <Button type="default" id="1" class="restart-btn btn" disabled>
        <span className="btn-text">RESTART</span>
      </Button>
      <Button type="default" id="2" class="delete-btn btn" disabled>
        <span className="btn-text">DELETE</span>
      </Button>
      <Button type="default" id="3" class="download-btn btn" disabled>
        <span className="btn-text">DOWNLOAD DATASET</span>
      </Button>
    </div>)
  return (
    <div className="jobList-container">
      <p className="title">Job List</p>
      {funcZone}
    </div>
  )
}

export default JobList;
