import {CheckCircleFilled, CloseCircleFilled} from "@ant-design/icons";
import React from "react";


const StepsIcon = (props) => {
  const {type, showLarge = false, fontSize = '32px'} = props;
  const large = {
    transition: 'transform 1s',
    transform: 'scale(1.5)',
    fontSize: fontSize
  };
  const def = {
    fontSize: fontSize,
  };
  const defWait = {
    fontSize: fontSize,
    color: '#d5d5d5'
  };
  const defFail = {
    fontSize: fontSize,
    color: '#de2a2a'
  };
  const failLarge = {
    fontSize: fontSize,
    color: '#de2a2a',
    transition: 'transform 1s',
    transform: 'scale(1.5)',
  };
  const waitLarge = {
    fontSize: fontSize,
    color: '#d5d5d5',
    transition: 'transform 1s',
    transform: 'scale(1.5)',
  };
  if (type ==='checked') {
    return (<CheckCircleFilled className="checked" style={showLarge ? large : def}/>);
  }
  if (type === 'wait') {
    return (<CheckCircleFilled className="wait" style={showLarge ? waitLarge : defWait}/>);
  }
  if (type === 'fail') {
    return (<CloseCircleFilled className="failed" style={showLarge ? failLarge : defFail}/>);
  }
};
export default StepsIcon;