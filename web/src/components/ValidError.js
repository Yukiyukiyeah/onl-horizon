import React from 'react';

const ValidError = (props) => {
  const { errorText } = props;

  return (
    <div className="valid-error-container" style={{display:"flex", alignItems:"center"}}>
      <div className="failed-svg-container" style={{display:"block", height:"16px"}}>
        <svg t="1607425046809" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
          p-id="728" width="16" height="16">
          <path
            d="M513 112.6c-221.2 0-400.6 179.3-400.6 400.6 0 221.2 179.3 400.6 400.6 400.6s400.6-179.3 400.6-400.6c0-221.2-179.4-400.6-400.6-400.6z m0 615c-17.7 0-32.1-14.4-32.1-32.1 0-17.7 14.4-32.1 32.1-32.1 17.7 0 32.1 14.4 32.1 32.1 0 17.7-14.4 32.1-32.1 32.1z m32.1-142.7c0 17.7-14.4 32.1-32.1 32.1-17.7 0-32.1-14.4-32.1-32.1V314.7c0-17.7 14.4-32.1 32.1-32.1 17.7 0 32.1 14.4 32.1 32.1v270.2z"
            fill="#d81e06" p-id="729">
          </path>
        </svg>
      </div>
      <div className="failed-text-container" style={{display:"block"}}>
        <span style={{color:"#d93025", fontSize: "12px", lineHeight:"12px"}}>{ errorText }</span>
      </div>
    </div>
  );
};
export default  ValidError;