import React, { useState } from "react";
import ReactDOM from "react-dom";
import { ComposableMap, Geographies, Geography,  ZoomableGroup } from "react-simple-maps";
import classes from './Maps.module.css';



const geoUrl ="https://raw.githubusercontent.com/deldersveld/topojson/master/countries/india/india-districts.json";

const Maps  = () => {
    const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });

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
    

    return (
        <div>
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
          geographies.map(geo => <Geography key={geo.rsmKey} geography={geo} />)
        }
      </Geographies>
      </ZoomableGroup>
    </ComposableMap>
    <div className={classes.controls}>
        <button
        className={classes.buttons1} 
        onClick={handleZoomIn}>
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
        <button 
        className={classes.buttons2} 
        onClick={handleZoomOut}>
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
   


export default  Maps;