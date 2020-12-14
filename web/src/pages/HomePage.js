import React, {useEffect, useState} from "react";
import {Row, Col} from "antd";
import '../styles/HomePage.scss';
import InfoCard from "../components/InfoCard";
import {ReactBingmaps} from "react-bingmaps-vnext";
import pushpin from '../assets/map-pushpin.svg';
import {getGlobalJobStates, getGlobalMachineStates, getJobInfo, getMyJobStates} from "../backend/api";

const points = [
  {
    "name": "Microsoft Research Asia",
    "lng": 116.317095,
    "lat": 39.986626,
    "pmCount": 3,
    "vmCount": 6,
    "title": "Microsoft Research Asia",
    "description": "Microsoft Research Asia, Microsoft's fundamental research arm in the Asia Pacific region and the company's largest research institute outside the United States, was founded in Beijing China on November 5, 1998."
    // nodes info V2
  },
  {
    "name": "Lanzhou University",
    "lng": 103.866202,
    "lat": 36.052393,
    "pmCount": 1,
    "vmCount": 2,
    "title": "Lanzhou University",
    "description": "Lanzhou University is a major research university in Lanzhou, Gansu, China. Founded in 1909, it is one of the key universities under China's Ministry of Education (Project 985 and Project 211). It is a Chinese Ministry of Education Class A Double First Class University."
    // nodes info V2
  },
  {
    "name": "Nanjing University",
    "lng": 118.786007,
    "lat": 32.06143,
    "pmCount": 1,
    "vmCount": 2,
    "title": "Nanjing University",
    "description": "Nanjing University is a major public university, the oldest institution of higher learning in Nanjing, Jiangsu, and a member of the elite C9 League of Chinese universities."
  },
  {
    "name": "Peking University",
    "lng": 116.316833,
    "lat": 39.998877,
    "pmCount": 2,
    "vmCount": 4,
    "title": "Peking University",
    "description": "Peking University is a major research university in Beijing, China, and a member of the elite C9 League of Chinese universities. It is perennially ranked as one of the top academic institutions in China, Asia, and worldwide."
  },
  {
    "name": "Seoul National University",
    "lng": 127.075986,
    "lat": 37.630555,
    "pmCount": 3,
    "vmCount": 6,
    "title": "Seoul National University",
    "description": "Seoul National University is a national research university located in Seoul, South Korea. Founded in 1946, Seoul National University is considered to be the most prestigious university in the country."
  },
  {
    "name": "KAIST",
    "lng": 127.366714,
    "lat": 36.37443,
    "pmCount": 3,
    "vmCount": 6,
    "title": "KAIST",
    "description": "KAIST is a national research university located in Daedeok Innopolis, Daejeon, South Korea. KAIST was established by the Korean government in 1971 as the nation's first public, research-oriented science and engineering institution."
  },
  {
    "name": "National University of Singapore",
    "lng": 103.776578,
    "lat": 1.296466,
    "pmCount": 1,
    "vmCount": 2,
    "title": "National University of Singapore",
    "description": "The National University of Singapore (NUS) is the national research university of Singapore. Founded in 1905 as the Straits Settlements and Federated Malay States Government Medical School, NUS is the oldest higher education institution in Singapore. It is consistently ranked within the top 20 universities in the world and is considered to be the best university in the Asia-Pacific by the QS ranking."
  },
  {
    "name": "SUSTech",
    "lng": 114.001669,
    "lat": 22.600895,
    "pmCount": 2,
    "vmCount": 4,
    "title": "SUSTech",
    "description": "Southern University of Science and Technology (SUSTech) is a public research university in Nanshan District, Shenzhen, Guangdong, China."
  }
];

const renderPoint = (point) => {
  return {
    "location": [point.lat, point.lng],
    "addHandler": "mouseover", //on mouseover the pushpin, infobox shown
    "infoboxOption": {
      // title: point.title,
      // description: point.description,
      // showPointer: false,
      // showCloseButton: false,
      htmlContent: (
        <div className="customInfobox">
          <div className="title">
            {
              point.title
            }
          </div>
          {
            point.description
          }
          <br/>
          <br/>
          {
            `Physical Machine Count: ${point.pmCount}`
          }
          <br/>
          {
            `Virtual Machine Count: ${point.vmCount}`
          }
        </div>
      ),
    },
    // "pushPinOption": {title: point.name, color: "rgb(0,120,212)"},
    "pushPinOption": {
      title: point.name,
      icon: pushpin
    },
  };
};

const HomePage = () => {
  const [myJobStates, setMyJobStates] = useState({failed: 0, succeeded: 0, running: 0});
  const [globalJobStates, setGlobalJobStates] = useState({failed: 0, succeeded: 0, running: 0});
  const [globalMachineStates, setGlobalMachineStates] = useState({available: 0, busy: 0, error: 0});

  const jobAry = ['Succeeded', 'Failed', 'Running'];
  const serverAry = ['Available', 'Error', 'Busy'];

  useEffect(() => {
    getMyJobStates()
      .then((info) => {
        setMyJobStates(info);
      });

    getGlobalJobStates()
      .then((info) => {
        setGlobalJobStates(info);
      });

    getGlobalMachineStates()
      .then((info) => {
        setGlobalMachineStates(info);
      });
  }, []);

  const renderMap = () => {
    const infoboxesWithPushPins = points.map((point) => renderPoint(point));

    const customMapStyle = {
      "version": "1.0",
      "settings": {
        "landColor": "#e7e6e5",
        "shadedReliefVisible": false
      },
      "elements": {
        "vegetation": {
          "fillColor": "#c5dea2"
        },
        "naturalPoint": {
          "visible": false,
          "labelVisible": false
        },
        "transportation": {
          "labelOutlineColor": "#ffffff",
          "fillColor": "#ffffff",
          "strokeColor": "#d7d6d5"
        },
        "water": {
          "fillColor": "#b1bdd6",
          "labelColor": "#ffffff",
          "labelOutlineColor": "#9aa9ca"
        },
        "structure": {
          "fillColor": "#d7d6d5"
        },
        "indigenousPeoplesReserve": {
          "visible": false
        },
        "military": {
          "visible": false
        }
      }
    };

    return (
      <div key="bingMap" className="map__card" style={{height: "500px", overflow: "hidden"}}>
        <ReactBingmaps
          bingmapKey="Av03W3HiiT7J8Py8b1742QwqC7NuBpKD3Tl9NLOI4C-4_U8AjTEMTSbx6sYVUzGJ"
          center={[35.0614, 115.78600]}
          zoom={3}
          infoboxesWithPushPins={infoboxesWithPushPins}
          mapOptions={{
            navigationBarMode: 3,
            customMapStyle: customMapStyle,
          }}
          supportedMapTypes={
            [
              "aerial",
              "canvasDark",
              "canvasLight",
              "birdseye",
              "grayscale",
              "road",
              "streetside"
            ]
          }
        >
        </ReactBingmaps>
      </div>
    );
  };

  return (
    <div style={{margin: 24 - 60}}>
      <Row style={{margin: "20px"}} justify="space-around">
        <Col flex="400px">
          <InfoCard keyAry={jobAry} valueAry={[myJobStates.succeeded, myJobStates.failed, myJobStates.running]} title={<div style={{fontWeight: "bold"}}>My Jobs</div>} showIcon={true} width={400} height={760} showChart={true}/>
        </Col>
        <Col flex="auto" style={{marginLeft: "48px"}}>
          <Row> {renderMap()}
          </Row>
          <Row style={{marginTop: "32px"}}>
            <InfoCard keyAry={jobAry} valueAry={[globalJobStates.succeeded, globalJobStates.failed, globalJobStates.running]} title={<div style={{fontWeight: "bold"}}>Global Jobs</div>} showIcon={true}/>
            <div style={{marginLeft: "32px"}}>
              <InfoCard keyAry={serverAry} valueAry={[globalMachineStates.available, globalMachineStates.error, globalMachineStates.busy]} title={<div style={{fontWeight: "bold"}}>Servers</div>} showIcon={true}/>
            </div>
          </Row>
        </Col>
      </Row>

    </div>
  );
};

export default HomePage;
