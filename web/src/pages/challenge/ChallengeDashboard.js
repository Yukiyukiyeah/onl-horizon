import React, { useState, useEffect } from 'react';
import '../../styles/ChallengeDashboard.scss';
import Top10 from "./Top10";
import Self from "./Self";

const ChallengeDashboard = (props) => {

  return (
    <div className="challenge-container" style={{margin: -64}}>
      <div className="challenge-wrapper">
        <div className="intro-container">
          <div className="intro-contents">
            <div className="intro-header">
              Challenge Name
            </div>
            <div className="intro-details">
              challenge description challenge description challenge description challenge description challenge description challenge description challenge description challenge description challenge description challenge description challenge description challenge description challenge description
            </div>
            <div className="row-wrapper">
              <div className="btn-container website">
                <div className="btn-wrapper">
                  <a href="https://2021.acmmmsys.org/rtc_challenge.php" target="_blank">Official Website</a>
                </div>
              </div>
              <div className="btn-container submit" onClick={()=>props.history.push('/challenge/create')}>
                <p>Submit</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="top10-wrapper">
        <Top10 />
      </div>
      <div className="self-wrapper">
        <Self />
      </div>
    </div>
  );
};

export default ChallengeDashboard;