import React, { useState } from "react";
import ReactDOM from "react-dom";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import './Maps.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/india/india-districts.json";
var temp1, temp2;
var highest = 0;
var states = [], districts = [];


const Maps = (props) => {
   const [position, setPosition] = useState({ coordinates: [80, 20], zoom: 8 });
    const [selectedState, setSelectedState] = useState();
    const [selectedDistrict, setSelectedDistrict] = useState();
  function handleZoomIn() {
    if (position.zoom >= 16) return;
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
      // selection of districts //
     
    // selection of districts //
  return (
       <Container className="cont">
         <Row>
           <Col lg={6}>
      <div className="map">
      {gethighest()}
      <ComposableMap
        width={1000}
        height={850}
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
        </div>
    </Col>        
 <Col lg={4}>
    <div className="controls">
      <div className="box">
        <button onClick={handleZoomIn}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 27"
            stroke="currentColor"
            strokeWidth="3"
          >
            <line x1="12" y1="4" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
        <button onClick={handleZoomOut}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 27"
            stroke="currentColor"
            strokeWidth="3"
          >
         <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
        </div>
        <div className="districtselector">
           <p className="title"> Select the state</p>
           <select className="select">
        
            <option>
            
            </option>
           </select>
           <p className="title"> Select the District</p>
           <select className="select">
        
            <option>
            
            </option>
           </select>
       </div>
        <div className="block">
          <div className="statBlock">
            <p className="head">confirmed:</p>
            <span className="number">30</span>
          </div>
          <div className="statBlock1">
            <p className="head1">last updated:</p>
            <div className="number1">30</div>
          </div>
      </div>
      </div>
      </Col>
      </Row>
      </Container>
        );
};



export default Maps;
