import React, {useState} from "react";
import '../styles/CreateJobPage.scss';
import FirstTab from './tabs/FirstTab';
import SecondTab from "./tabs/SecondTab";
import ThirdTab from "./tabs/ThirdTab";
import LastTab from "./tabs/LastTab";
import VerifyTab from "./tabs/VerifyTab";
import {sendCreateJobReq, runApp} from "../backend/api";
import * as Setting from "../utils/Setting";
import {SubmitStatus as ST, StepToTab as STAB} from '../utils/BaseVar';

const CreateJob = () => {
  const [curStep, setStep] = useState(STAB.STEP_FIRST);
  const [title, setTitle] = useState('');
  const [appType, setType] = useState('');
  const [params, setParams] = useState({});
  const [sendStatus, setSendStatus] = useState(ST.SUBMIT_SUCCEEDED);
  const [submitTime, setSubmitTime] = useState(Date.now());
  const statusFlow = [ST.SUBMIT_PROCESSING, ST.SUBMIT_SUCCEEDED, ST.CREATE_PROCESSING];
  const runCreatedJob = (jobId) => {
    let runParams = null;
    if (appType === 'AlphaRTC') {
      const runAlphaParams = {
        AppParams: {
          NetParams: {
            ListenTCPPort: 8888
          },
          RunTime: "20",
          bwe_feedback_duration: 200,
          TestTimes: "1",
          Interval: "50",
          video_source: {
            video_disabled: {
              enabled: false
            },
            webcam: {
              enabled: false
            },
            video_file: {
              enabled: true,
              height: 240,
              width: 320,
              fps: 10,
              file_path: "C:\\AlphaRTC\\corpus\\testmedia\\test.yuv"
            }
          },
          audio_source: {
            microphone: {
              enabled: false
            },
            audio_file: {
              enabled: true,
              file_path: "C:\\AlphaRTC\\corpus\\testmedia\\test.wav"
            }
          }
        },
        UserName: "test",
        TimeoutSec: "500"
      };
      runAlphaParams.AppParams.RunTime = params && params.experimentTime;
      runAlphaParams.TimeoutSec = params && params.expirationTime;
      runAlphaParams.AppParams.bwe_feedback_duration = params && params.bweDuration;
      runParams = runAlphaParams;
    }
    if (appType === 'Probing') {
      const runIperfParams = {
        AppParams: {
          NetParams: {
            ListenTCPPort: 8888
          },
          mode: params && params.mode,
          interval:  params && params.interval,
          timeout:  params && params.timeout,
          bufferLen:  params && params.bufferLen,
        },
        UserName: "test"
      };
      if (params.mode === 'tcp') {
        runIperfParams.AppParams.tcpWindowSize =  params && params.tcpWindowSize;
        runIperfParams.AppParams.mss =  params && params.mss;
        runIperfParams.AppParams.tcpControl =  params && params.tcpControl;
        runIperfParams.AppParams.NetParams.ListenTCPPort = 8888;
      }
      else {
        runIperfParams.AppParams.NetParams.ListenUDPPort = 8888;
        runIperfParams.AppParams.bandwidth =  params && params.bandwidth;
      }
      runParams = runIperfParams;
    }
    statusFlow.push(ST.RUN_PROCESSING);
    return runApp(jobId, params.appType, runParams);
  };
  const handleNext = (param) => {
    console.log(param);
    setParams(Object.assign(params, param)) ;
    if (curStep === STAB.STEP_FIRST) {
      // iperf -> probing , webrtc -> alphartc
      setType(Setting.appTypeMapR[param.appType]);
      setTitle(param.title);
    }
    if (curStep === STAB.STEP_VERIFY) {
      lastTabFunc();
    }
    setStep(curStep + 1);
  };
  const handlePrev = () => {
    setStep(curStep - 1);
  };
  const lastTabFunc = () => {
    setSubmitTime(Date.now());
    const statusTimer = setInterval(() => {
      if (statusFlow.length > 0) {
        const curStatus = statusFlow.shift();
        setSendStatus(curStatus);
        if (curStatus === ST.RUN_SUCCEEDED || curStatus === ST.RUN_FAILED || curStatus === ST.CREATE_FAILED) {
          clearInterval(statusTimer);
        }
      }
    }, 1500);
    sendCreateJobReq(params)
      .then(r => {
        statusFlow.push(ST.CREATE_SUCCEEDED);
        return runCreatedJob(r.id);
      }, e => {
        statusFlow.push(ST.CREATE_FAILED);
        return new Promise(()=>{});
      })
      .then(r => {
        statusFlow.push(ST.RUN_SUCCEEDED);
      }, e => {
        statusFlow.push(ST.RUN_FAILED);
      })
      .catch(e => console.log(e));
  };
  const setFirst = () => {
    console.log('xxxx');
    setStep(STAB.STEP_FIRST);
  };
  return (
    <div className="create-job-container">
      {curStep === STAB.STEP_FIRST && <FirstTab handleNext={ handleNext } params={params}/>}
      {curStep === STAB.STEP_SECOND && <SecondTab handleNext={ handleNext } handlePrev={ handlePrev } params={params} type={ appType }/>}
      {curStep === STAB.STEP_THIRD && <ThirdTab handleNext={ handleNext } handlePrev={ handlePrev }  params={params} type={ appType }/>}
      {curStep === STAB.STEP_VERIFY && <VerifyTab handleNext={ handleNext } handlePrev={ handlePrev } params={params} type={ appType } />}
      {curStep === STAB.STEP_LAST && <LastTab  title={ title } sendStatus={sendStatus} setFirst={setFirst} startTime={submitTime}/>}
    </div>
  );
};
export default CrateJob;
