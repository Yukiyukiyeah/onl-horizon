import React, {useEffect, useState} from 'react';
import {ReactBingmaps} from "react-bingmaps-vnext";
import pushpin from "../assets/map-pushpin.svg";
import {getMachineLocations} from "../backend/api";

const Map = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    getMachineLocations()
      .then((info) => {
        setLocations(info);
      });
  }, []);
  const renderLocation = (location) => {
    return {
      "location": [+location.lat || 0, +location.lng || 0],
      "addHandler": "mouseover", //on mouseover the pushpin, infobox shown
      "infoboxOption": {
        // title: location.title,
        // description: location.description,
        // showPointer: false,
        // showCloseButton: false,
        htmlContent: (
          <div className="customInfobox">
            <div className="title">
              {
                location.title
              }
            </div>
            {
              location.description
            }
            <br/>
            <br/>
            {
              `Physical Machine Count: ${location.pmCount || 0}`
            }
            <br/>
            {
              `Virtual Machine Count: ${location.vmCount || 0}`
            }
          </div>
        ),
      },
      // "pushPinOption": {title: location.name, color: "rgb(0,120,212)"},
      "pushPinOption": {
        title: location.name,
        icon: pushpin
      },
    };
  };

  const infoboxesWithPushPins = locations.map((location) => renderLocation(location));

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
    <div key="bingMap" className="map__card" style={{height: "500px", width:"100%", overflow: "hidden", minWidth:"200px", maxWidth:"800px"}}>
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

export default Map;
