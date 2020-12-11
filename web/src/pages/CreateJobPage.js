import React, {useMemo, useState} from "react";
import { Col, Row } from "antd";
import '../styles/CreateJobPage.scss';
import FirstTab from './tabs/FirstTab';
import SecondTab from "./tabs/SecondTab";
import ThirdTab from "./tabs/ThirdTab";
import LastTab from "./tabs/LastTab";
import {sendCreateJobReq} from "../backend/api";

const CrateJob = () => {
  const [curStep, setStep] = useState(0);
  const [title, setTitle] = useState('');
  const [appType, setType] = useState('');
  const [params, setParams] = useState({});
  const handleNext = (param) => {
    setParams(Object.assign(params, param)) ;
    if (curStep === 0) {
      setType(param.appType);
      setTitle(param.title);
    }
    if (curStep === 2) {
      sendCreateJobReq(params).then(r => console.log(r));
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
