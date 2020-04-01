import React, { useState } from "react";
import ReactDOM from "react-dom";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import './Maps.css';

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/india/india-districts.json";
var temp1, temp2;
var highest = 0;
var states = [], districts = [];

const Maps = (props) => {

  const [position, setPosition] = useState({ coordinates: [80, 19], zoom: 5 });

  function handleZoomIn() {
    if (position.zoom >= 4) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom * 2 }));
  }

  function handleZoomOut() {
    if (position.zoom <= 1) return;
    setPosition(pos => ({ ...pos, zoom: pos.zoom / 2 }));
  }

  function handleMoveEnd(position) {
    setPosition(position);
  }

  const gethighest = () => {
    for (var t1 in props.data) {
      states.push(t1);
      var districtData = props.data[t1].districtData;

      for (var t2 in districtData) {
        districts.push(t2);
        if (districtData[t2].confirmed > highest) {
          highest = districtData[t2].confirmed;
        }
      }
    }
    console.log(states);
    console.log(districts);
  }

  const heatMapColorforValue = (value) => {
    value = value / highest;
    var h = (1.0 - value) * 240
    return "hsl(" + h + ", 100%, 50%)";
  }

  return (
    <div>
      {gethighest()}
      <ComposableMap
        width={1000}
        fill="#D6D6DA"
        stroke="#FFFFFF"
        strokeWidth={0.1}
      >
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={handleMoveEnd}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => {
                var state = geo.properties.NAME_1;
                var dist = geo.properties.NAME_2;

                if (props.data) {
                  temp1 = props.data[state];
                }
                if (temp1) {
                  temp2 = temp1.districtData[dist];
                }
                if (temp1 && temp2) {
                  // console.log(temp2);
                  return < Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={heatMapColorforValue(temp2.confirmed)}
                  />
                } else {
                  return < Geography
                    key={geo.rsmKey}
                    geography={geo}
                  />
                }
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      <div className="controls">
        <button onClick={handleZoomIn}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
        <button onClick={handleZoomOut}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>
    </div>
  );
};



export default Maps;