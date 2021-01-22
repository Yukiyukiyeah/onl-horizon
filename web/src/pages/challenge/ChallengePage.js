import React, {useState} from "react";
import btnBg from '../../assets/btn-bg.png';
import '../../styles/ChallengePage.scss';
import Top10 from './Top10';
import Self from './Self.js';

// todo： change
const ChallengePage = () => {
  return (
    <div className="challenge-container" style={{margin: -64}}>
      <div className="challenge-wrapper">
        <div className="intro-text">
          <div className="intro-header">
            <h1>
              <span className="header-sub">Grand Challenge on</span><br/>
              <span className="header-main">Bandwidth Estimation for Real-Time Communications</span><br/>
            </h1>
          </div>
          <div className="intro-details">
          </div>
          <div className="row-wrapper">
            <div className="btn-container website">
              <div className="btn-wrapper">
                <a href="https://2021.acmmmsys.org/rtc_challenge.php" target="_blank">Official Website</a>
              </div>
            </div>
            <div className="btn-container submit">
              <p>Submit</p>
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
    </div>);
};
export default ChallengePage;