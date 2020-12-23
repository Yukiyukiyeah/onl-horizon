import React, {useState} from "react";
import '../styles/CreateJobPage.scss';
import FirstTab from './tabs/FirstTab';
import SecondTab from "./tabs/SecondTab";
import ThirdTab from "./tabs/ThirdTab";
import LastTab from "./tabs/LastTab";
import VerifyTab from "./tabs/VerifyTab";
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
    return runApp(jobId, params.appType, runParams);
  };

  const handleNext = (param) => {
    setParams(Object.assign(params, param)) ;
    if (curStep === 0) {
      // iperf -> probing , webrtc -> alphartc
      setType(Setting.appTypeMapR[param.appType]);
      setTitle(param.title);
    }
    if (curStep === 3) {
      sendCreateJobReq(params)
        .then(r => {
          setCurStatusStep(1);
          return runCreatedJob(r.id);
        }, e => {
          setCurStatusStep(1);
          setError(true);
          return new Promise(()=>{});
        })
        .then(r => {
          setCurStatusStep(2);
        }, e => {
          setCurStatusStep(2);
          setError(true);
        });

    }
    setStep(curStep + 1);
  };
  const handlePrev = () => {
    setStep(curStep - 1);
  };

  return (
    <div className="create-job-container">
      {curStep === 0 && <FirstTab handleNext={ handleNext } params={params}/>}
      {curStep === 1 && <SecondTab handleNext={ handleNext } handlePrev={ handlePrev } params={params} type={ appType }/>}
      {curStep === 2 && <ThirdTab handleNext={ handleNext } handlePrev={ handlePrev }  params={params} type={ appType }/>}
      {curStep === 3 && <VerifyTab handleNext={ handleNext } handlePrev={ handlePrev } params={params} type={ appType } />}
      {curStep === 4 && <LastTab  title={ title } error={isError} curStatusStep={curStatusStep}/>}
    </div>
  );
};
export default CrateJob;
