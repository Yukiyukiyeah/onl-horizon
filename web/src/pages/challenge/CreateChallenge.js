import React, { useState, useEffect } from 'react';
import {SubmitStatus as ST} from "../../utils/BaseVar";
import SubmitChallenge from "./SubmitChallenge";
import SubmitResult from "./SubmitResult";

const CreateChallenge = () => {
  const[title, setTitle] = useState(0);
  const [curStep, setCurStep] = useState(0);
  const [params, setParams] = useState({});
  const [sendStatus, setSendStatus] = useState(ST.SUBMIT_SUCCEEDED);
  const [submitTime, setSubmitTime] = useState(Date.now());

  const statusFlow = [ST.SUBMIT_PROCESSING, ST.SUBMIT_SUCCEEDED, ST.CREATE_PROCESSING];

  const handleNext = () => {
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

    // todo：send to backend

    setCurStep(curStep + 1);
  };

  return (
    <div className="create-job-container">
      {curStep === 0 && <SubmitChallenge handleNext={ handleNext } params={params}/>}
      {curStep === 1 && <SubmitResult title={ title } sendStatus={sendStatus} submitTime={submitTime}/>}
    </div>
  );
};


export default CreateChallenge;