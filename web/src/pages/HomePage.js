import React from "react";
import {Row} from "antd";
import InfoCard from "../components/InfoCard";
import {
  AzureMap,
  AzureMapDataSourceProvider,
  AzureMapFeature,
  AzureMapLayerProvider,
  AzureMapsProvider
} from "react-azure-maps";
import {AuthenticationType, data} from "azure-maps-control";

const option = {
  center: [118.78600, 32.06143],
  zoom: 4,
  language: 'en-US',
  authOptions: {
    authType: AuthenticationType.subscriptionKey,
    subscriptionKey: "56h1VZlW1nIIXQNiNaLKyHpeO5sEwsFDq4b-JSTWXS0",
  },
};

const points = [
  {lng: 116.404, lat: 39.915, label: "PKU & MSRA"},
  {lng: 103.866202, lat: 36.052393, label: "LZU"},
  {lng: 118.786007, lat: 32.06143, label: "NJU"},
  {lng: 126.967214, lat: 37.599704, label: "SNU"},
  {lng: 127.396046, lat: 36.362503, label: "KAIST"},
  {lng: 114.005913, lat: 22.603944, label: "SUSTech"},
];

const renderPoint = (point) => {
  const rendId = Math.random();

  return (
    <AzureMapFeature
      key={rendId}
      id={rendId.toString()}
      type="Point"
      coordinate={new data.Position(point.lng, point.lat)}
      properties={{
        title: point.label,
        // icon: 'pin-round-blue',
      }}
    />
  );
};

const HomePage = () => {
  const jobAry = ['Success', 'Fail', 'Running'];
  const jobValAry = ['3', '1', '20/30'];
  const serverAry = ['Available', 'Busy', 'Error'];
  const serverValAry = ['20', '4', '0'];

  return (
    <div style={{margin: 24 - 60}}>
      <Row style={{margin: "20px"}} justify="space-around" gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
        <InfoCard keyAry={jobAry} valueAry={jobValAry} title={'My Jobs'} showIcon={true}/>
        <InfoCard keyAry={jobAry} valueAry={jobValAry} title={'Global Jobs'} showIcon={true}/>
        <InfoCard keyAry={serverAry} valueAry={serverValAry} title={'Servers'}/>
      </Row>
      <AzureMapsProvider>
        <div style={{height: "500px"}}>
          <AzureMap options={option}>
            <AzureMapDataSourceProvider id="markersExample AzureMapDataSourceProvider">
              {
                points.map((point) => renderPoint(point))}
              }
              <AzureMapLayerProvider
                id={'markersExample AzureMapLayerProvider'}
                options={{
                  textOptions: {
                    textField: ['get', 'title'], //Specify the property name that contains the text you want to appear with the symbol.
                    offset: [0, 1.2],
                  },
                }}
                // events={{
                //   click: clusterClicked,
                //   dbclick: clusterClicked,
                // }}
                lifecycleEvents={{
                  layeradded: () => {
                    console.log('LAYER ADDED TO MAP');
                  },
                }}
                type={"SymbolLayer"}
              />
              {/*<AzureMapFeature*/}
              {/*  key={1}*/}
              {/*  id={"1"}*/}
              {/*  type="Point"*/}
              {/*  coordinate={[118.78600, 32.06143]}*/}
              {/*  properties={{*/}
              {/*    title: 'Pin',*/}
              {/*    icon: 'pin-round-blue',*/}
              {/*  }}*/}
              {/*/>*/}
            </AzureMapDataSourceProvider>
          </AzureMap>
        </div>
      </AzureMapsProvider>
    </div>
  );
};

export default HomePage;
