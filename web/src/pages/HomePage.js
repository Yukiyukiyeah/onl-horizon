import React from "react";
import {Row, Col} from "antd";
import InfoCard from "../components/InfoCard";
import {ReactBingmaps} from "react-bingmaps-vnext";

const points = [
  {lng: 116.404, lat: 39.915, label: "PKU & MSRA"},
  {lng: 103.866202, lat: 36.052393, label: "LZU"},
  {lng: 118.786007, lat: 32.06143, label: "NJU"},
  {lng: 126.967214, lat: 37.599704, label: "SNU"},
  {lng: 127.396046, lat: 36.362503, label: "KAIST"},
  {lng: 114.005913, lat: 22.603944, label: "SUSTech"},
];

const renderPoint = (point) => {
  return {
    "location": [point.lat, point.lng],
    "addHandler": "mouseover", //on mouseover the pushpin, infobox shown
    "infoboxOption": {title: point.label, description: 'description'},
    "pushPinOption": {title: point.label},
  };
};

const HomePage = () => {
  const jobAry = ['Succeeded', 'Failed', 'Running'];
  const jobValAry = ['3', '1', '20/30'];
  const serverAry = ['Available', 'Busy', 'Error'];
  const serverValAry = ['20', '4', '0'];

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
          center={[32.0614, 115.78600]}
          zoom={5}
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
          <InfoCard keyAry={jobAry} valueAry={jobValAry} title={'My Jobs'} showIcon={true} width={400} height={760} showChart={true}/>
        </Col>
        <Col flex="auto" style={{marginLeft: "5vw"}}>
          <Row> {renderMap()}
          </Row>
          <Row  style={{marginTop: "32px"}} >
            <InfoCard keyAry={jobAry} valueAry={jobValAry} title={'Global Jobs'} showIcon={true}/>
            <div style={{marginLeft: "32px"}}>
              <InfoCard keyAry={serverAry}   valueAry={serverValAry} title={'Servers'}/>
            </div>
          </Row>
        </Col>
      </Row>

    </div>
  );
};

export default HomePage;
