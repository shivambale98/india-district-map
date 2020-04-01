import React, { useState } from "react";
import ReactDOM from "react-dom";
import { ComposableMap, Geographies, Geography,  ZoomableGroup } from "react-simple-maps";
import './Maps.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


const geoUrl ="https://raw.githubusercontent.com/deldersveld/topojson/master/countries/india/india-districts.json";

const Maps  = () => {
    const [position, setPosition] = useState({ coordinates: [80, 22], zoom: 9 });
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
    // selection of districts //
     
    // selection of districts //

    return (
     <div className="main">
       <Container>
         <Row>
           <Col sm={8}>
      <div className="map">
      <ComposableMap 
          width={1200}
          height={1000}
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
          geographies.map(geo => <Geography key={geo.rsmKey} geography={geo} />)
        }
      </Geographies>
      </ZoomableGroup>
    </ComposableMap>
    </div>
    </Col>
    <Col sm={4}>
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
      </div>
      </Col>
      </Row>
      </Container>
      </div>
        );
};
   


export default  Maps;