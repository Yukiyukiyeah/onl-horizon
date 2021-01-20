import React, { useState, useEffect } from 'react';
import {SubmitStatus as ST} from "../../utils/BaseVar";
import SubmitChallenge from "./SubmitChallenge";
import SubmitResult from "./SubmitResult";
import { createChallenge, runApp } from '../../backend/api';

const CreateChallenge = () => {
  const [title, setTitle] = useState('Model Name');
  const [model, setModel] = useState('Model file path');
  const [curStep, setCurStep] = useState(0);
  const [params, setParams] = useState({});
  const [sendStatus, setSendStatus] = useState(ST.SUBMIT_SUCCEEDED);
  const [submitTime, setSubmitTime] = useState(Date.now());
  // status queue
  const statusFlow = [ST.SUBMIT_PROCESSING, ST.SUBMIT_SUCCEEDED, ST.CREATE_PROCESSING];

  const handleNext = (params) => {
    // set submit time
    setSubmitTime(Date.now());
    // wait for current status
    const statusTimer = setInterval(() => {
      if (statusFlow.length > 0) {
        const curStatus = statusFlow.shift();
        setSendStatus(curStatus);
        if (curStatus === ST.RUN_SUCCEEDED || curStatus === ST.RUN_FAILED || curStatus === ST.CREATE_FAILED) {
          clearInterval(statusTimer);
        }
      }
    }, 1500);
    // set title
    setTitle(params.title);


    createChallenge(params)
      .then(res => {
        // console.log(res);
        statusFlow.push(ST.CREATE_SUCCEEDED);
        return runChallenge(res.id); // todo
      }, err => {
        statusFlow.push(ST.CREATE_FAILED);
        return new Promise(()=>{});
      })
      .then(res => {
        // console.log(res);
        statusFlow.push(ST.RUN_SUCCEEDED);
      }, err => {
        statusFlow.push(ST.RUN_FAILED);
      })
      .catch(err => console.log(err));

    setCurStep(curStep + 1);
  };

  // todo: run the challenge
  const runChallenge = (challengeId) => {
    console.log('run challenge', challengeId);
  };

  const setFirst = () => {
    setCurStep(0);
  };

  return (
    <div className="create-job-container">
      {curStep === 0 && <SubmitChallenge title = { title } model = { model } handleNext={ handleNext } params={params}/>}
      {curStep === 1 && <SubmitResult title={ title } sendStatus={sendStatus} submitTime={submitTime} setFirst={setFirst}/>}
    </div>
  );
};


export default CreateChallenge;