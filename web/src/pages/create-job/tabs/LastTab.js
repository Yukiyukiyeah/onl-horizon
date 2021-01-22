import { Steps } from "antd";
import React, {useEffect, useState} from "react";
const { Step } = Steps;
import '../../../styles/LastTab.scss';
import succeed from '../../../assets/submit-img.png';
import {SubmitStatus as ST} from '../../../utils/BaseVar';
import { CSSTransition } from 'react-transition-group';
import StepsIcon from '../../../components/StepsIcon';
const LastTab = (props) => {
  const { title, setFirst, sendStatus, startTime} = props;
  const [showSubmit, setShowSubmit] = useState(true);
  const [showSteps, setShowSteps] = useState(false);
  const [countTime, setCountTime] = useState(0);
  const [curStatusStep, setCurStatusStep] = useState(0);

  const showTryAgain = (sendStatus === ST.CREATE_FAILED) || (sendStatus === ST.RUN_FAILED);
  // submit
  let submitIcon = <StepsIcon type='checked' showLarge={sendStatus === ST.SUBMIT_SUCCEEDED || sendStatus === ST.CREATE_PROCESSING || sendStatus === ST.CREATE_WAITING}/>;
  const submitText = (() => {
    return "Job configure has been completed!";
  })();
  // create
  const createText = (() => {
    if (sendStatus === ST.CREATE_FAILED) {
      return "Failed to create!";
    }
    if (sendStatus === ST.CREATE_PROCESSING) {
      return "Job is creating!";
    }
    if (curStatusStep > ST.SEND_STEP_CREATE) {
      return "Job is created successfully!";
    }
    return "Job is waiting to create";
  })();

  const createIcon = (() => {
    if (sendStatus === ST.CREATE_FAILED) {
      return (<StepsIcon type='fail' showLarge={true}/>);
    }
    if (sendStatus === ST.CREATE_PROCESSING) {
      return (<StepsIcon type='wait' showLarge={false}/>);
    }
    return (<StepsIcon type='checked' showLarge={sendStatus === ST.CREATE_SUCCEEDED  || sendStatus === ST.RUN_PROCESSING}/>);

  })();

  const runText = (() => {
    if (sendStatus === ST.RUN_FAILED) {
      return "Failed to run!";
    }
    if (sendStatus === ST.RUN_SUCCEEDED) {
      return "Job is running!";
    }
    if (curStatusStep < ST.SEND_STEP_RUN || sendStatus === ST.RUN_PROCESSING) {
      return "Job is waiting to run!";
    }
    return "Job is waiting to run!";
  })();

  const runIcon = (() => {
    if (sendStatus === ST.RUN_FAILED) {
      return (<StepsIcon type='fail' showLarge={true}/>);
    }
    if (sendStatus === ST.RUN_SUCCEEDED) {
      return (<StepsIcon type='checked' showLarge={true}/>);
    }
    if (curStatusStep < ST.SEND_STEP_RUN || sendStatus === ST.RUN_PROCESSING) {
      return (<StepsIcon type='wait'/>);
    }
    return (<StepsIcon type='wait'/>);
  })();

  useEffect(()=> {
    setTimeout(
      () => {
        setShowSubmit(false);},
      1000);
    setTimeout(() => {
      setShowSteps(true);
    }, 1500);
  }, []);

  useEffect(() => {
    if (sendStatus === ST.RUN_SUCCEEDED || sendStatus === ST.RUN_FAILED || sendStatus === ST.CREATE_FAILED) {
      return;
    }
    const timerId = setInterval(() => {
      setCountTime(Math.round((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(timerId);
  }, [countTime]);

  useEffect(() => {
    if (sendStatus < ST.CREATE_SUCCEEDED) {
      setCurStatusStep(ST.SEND_STEP_SUBMIT);
    }
    else if (sendStatus < ST.RUN_SUCCEEDED){
      setCurStatusStep(ST.SEND_STEP_CREATE);
    }
    else {
      setCurStatusStep(ST.SEND_STEP_RUN);
    }
  }, [sendStatus]);

  return (
    <div className="last-tab-container">
      <div className="task-name-container">
        <p className="task-name">{title}</p>
      </div>
      <div className="content-wrapper">
        <CSSTransition
          in={showSubmit}
          timeout ={1000}
          classNames = 'move'
          unmountOnExit
          apper={true}
        >
          <div className="submit-wrapper">
            <div className="img-container">
              <img width="140" height="140" src={succeed}/>
            </div>
            <div className="submit-text-wrapper">
              <div className="first-title-container">
                <p>Submitted</p>
              </div>
              <div className="second-title-container">
                <p>Job configure has been submitted</p>
              </div>
            </div>
          </div>
        </CSSTransition>
        <CSSTransition
          in={showSteps}
          timeout ={1000}
          classNames = 'steps'
          unmountOnExit
          apper={true}
        >
          <div className="steps-container">
            <Steps direction="vertical" current={curStatusStep}>
              <Step title="Submitted" description={submitText} icon={submitIcon}/>
              <Step title="Created" description={createText} icon={createIcon}/>
              <Step title="Running" description={runText} icon={runIcon} />
            </Steps>
          </div>
        </CSSTransition>
      </div>
      <div className="footer">
        {showTryAgain ? (<div>Please  <span onClick={()=>setFirst()} className="link-text">Create</span> again later</div>) : (<p>{countTime}s</p>)}
      </div>
    </div>
  );
};

export default LastTab;