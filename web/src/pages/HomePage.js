import React from "react";
import {Row} from "antd";
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
    "location":[point.lat, point.lng],
    "addHandler":"mouseover", //on mouseover the pushpin, infobox shown
    "infoboxOption": { title: point.label, description: 'description' },
    "pushPinOption":{ title: point.label },
  };
};

const HomePage = () => {
  const jobAry = ['Success', 'Fail', 'Running'];
  const jobValAry = ['3', '1', '20/30'];
  const serverAry = ['Available', 'Busy', 'Error'];
  const serverValAry = ['20', '4', '0'];

  const renderMap = () => {
    const infoboxesWithPushPins = points.map((point) => renderPoint(point));
    // const pushPinsWithInfoboxes = points.map((point) => renderPoint(point));

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
      <div key="bingMap" className="map__card" style={{height: "500px"}}>
        <ReactBingmaps
          bingmapKey="Av03W3HiiT7J8Py8b1742QwqC7NuBpKD3Tl9NLOI4C-4_U8AjTEMTSbx6sYVUzGJ"
          center={[32.0614, 110.78600]}
          zoom={5}
          navigationBarMode={"square"}
          infoboxesWithPushPins = {infoboxesWithPushPins}
        >
        </ReactBingmaps>
        {/*<BingMapsReact*/}
        {/*  bingMapsKey="Av03W3HiiT7J8Py8b1742QwqC7NuBpKD3Tl9NLOI4C-4_U8AjTEMTSbx6sYVUzGJ"*/}
        {/*  height="500px"*/}
        {/*  mapOptions={{*/}
        {/*    navigationBarMode: "square",*/}
        {/*    supportedMapTypes: [*/}
        {/*      "aerial",*/}
        {/*      "canvasDark",*/}
        {/*      "canvasLight",*/}
        {/*      "birdseye",*/}
        {/*      "grayscale",*/}
        {/*      "road",*/}
        {/*      "streetside"*/}
        {/*    ],*/}
        {/*    customMapStyle: customMapStyle,*/}
        {/*  }}*/}
        {/*  viewOptions={{*/}
        {/*    center: { latitude: 32.0614, longitude: 110.78600 },*/}
        {/*    zoom: 5,*/}
        {/*    mapTypeId: "canvasLight",*/}
        {/*    // mapTypeId: "road",*/}
        {/*    heading: 0,*/}
        {/*  }}*/}
        {/*  pushPinsWithInfoboxes={pushPinsWithInfoboxes}*/}
        {/*/>*/}
      </div>
    );
  };

  return (
    <div style={{margin: 24 - 60}}>
      <Row style={{margin: "20px"}} justify="space-around" gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
        <InfoCard keyAry={jobAry} valueAry={jobValAry} title={'My Jobs'} showIcon={true}/>
        <InfoCard keyAry={jobAry} valueAry={jobValAry} title={'Global Jobs'} showIcon={true}/>
        <InfoCard keyAry={serverAry} valueAry={serverValAry} title={'Servers'}/>
      </Row>
      {
        renderMap()
      }
    </div>
  );
};

export default HomePage;
