import React, {useMemo, useState} from "react";
import '../styles/CreateJobPage.scss';
import FirstTab from './tabs/FirstTab';
import SecondTab from "./tabs/SecondTab";
import ThirdTab from "./tabs/ThirdTab";
import LastTab from "./tabs/LastTab";
import {sendCreateJobReq, runApp} from "../backend/api";

const CrateJob = () => {
  const [curStep, setStep] = useState(0);
  const [title, setTitle] = useState('');
  const [appType, setType] = useState('');
  const [params, setParams] = useState({});

  const runCreatedJob = (jobId) => {
    let runParams = null;
    if (appType === 'WebRTC') {
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
    if (appType === 'Iperf') {
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
      }
      else {
        runIperfParams.AppParams.bandwidth =  params && params.bandwidth;
      }
      runParams = runIperfParams;
    }
    runApp(jobId, appType, runParams)
      .then(r => console.log(r))
      .catch(e => console.log(e));
  };
  const handleNext = (param) => {
    setParams(Object.assign(params, param)) ;
    if (curStep === 0) {
      setType(param.appType);
      setTitle(param.title);
    }
    if (curStep === 2) {
      sendCreateJobReq(params)
        .then(r => {
          runCreatedJob(r.id);
        })
        .catch(e => console.log(e));
    }
    setStep(curStep + 1);
  };
  const handlePrev = () => {
    setStep(curStep - 1);
  };
  const curTab = useMemo(() => {
    const stepAry = [
      <FirstTab handleNext={ handleNext }/>,
      <SecondTab handleNext={ handleNext } handlePrev={ handlePrev } title={ title } type = { appType }/>,
      <ThirdTab handleNext={ handleNext } handlePrev={ handlePrev } title={ title } type = { appType }/>,
      <LastTab  title={ title } />,
    ];
    return stepAry[curStep];
  }, [curStep]);

  return (
    <div className="create-job-container">
      {curTab}
    </div>
  );
};
export default CrateJob;
