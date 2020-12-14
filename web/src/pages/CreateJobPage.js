import React, {useMemo, useState} from "react";
import '../styles/CreateJobPage.scss';
import FirstTab from './tabs/FirstTab';
import SecondTab from "./tabs/SecondTab";
import ThirdTab from "./tabs/ThirdTab";
import LastTab from "./tabs/LastTab";
import {sendCreateJobReq, runApp} from "../backend/api";
import * as Setting from "../utils/Setting";

const CrateJob = () => {
  const [curStep, setStep] = useState(0);
  const [title, setTitle] = useState('');
  const [appType, setType] = useState('');
  const [params, setParams] = useState({});
  const [isError, setError] = useState(false);
  const [curStatusStep, setCurStatusStep] = useState(1);

  const runCreatedJob = (jobId) => {
    let runParams = null;
    if (appType === 'AlphaRTC') {
      runParams = {
        AppParams: {
          NetParams: {
            ListenTCPPort: 8888
          },
          RunTime: "100",
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
              height: 1080,
              width: 1920,
              fps: 24,
              file_path: "C:\\Users\\Administrator\\Downloads\\webrtc\\data\\webrtc_test_video.yuv"
            }
          },
          audio_source: {
            microphone: {
              enabled: false
            },
            audio_file: {
              enabled: true,
              file_path: "C:\\Users\\Administrator\\Downloads\\webrtc\\data\\webrtc_test_audio.wav"
            }
          }
        },
        UserName: "test",
        TimeoutSec: "500"
      };
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
    return runApp(jobId, Setting.appTypeMap[appType], runParams);
  };
  const handleNext = (param) => {
    setParams(Object.assign(params, param)) ;
    if (curStep === 0) {
      setType(param.appType);
      setTitle(param.title);
    }
    if (curStep === 2) {
      params.appType = Setting.appTypeMap[params.appType];
      sendCreateJobReq(params)
        .then(r => {
          setCurStatusStep(1);
          return runCreatedJob(r.id);
        })
        .then(r => {
          setCurStatusStep(2);
        })
        .catch( (e) => {setError(true);}
        );
    }
    setStep(curStep + 1);
  };
  const handlePrev = () => {
    setStep(curStep - 1);
  };

  return (
    <div className="create-job-container">
      {curStep === 0 && <FirstTab handleNext={ handleNext }/>}
      {curStep === 1 && <SecondTab handleNext={ handleNext } handlePrev={ handlePrev } title={ title } type = { appType }/>}
      {curStep === 2 && <ThirdTab handleNext={ handleNext } handlePrev={ handlePrev } title={ title } type = { appType }/>}
      {curStep === 3 && <LastTab  title={ title } error={isError} curStatusStep={curStatusStep}/>}
    </div>
  );
};
export default CrateJob;
