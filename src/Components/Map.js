import React, { Component } from "react";
import ReactDOM from "react-dom";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import './Maps.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/india/india-districts.json";
var temp1, temp2;
var states = [];
var currentst;

class Maps extends Component {

  constructor() {
    super();
    this.state = {
      position: [80, 22],
      zoom: 9,
      highest: 0,
      currentst: 'Kerala',
      distlist: [],
      displaydata: { confirmed: 'null', lastupdate: 'null' },
      data: undefined
    };

  }

  //   const[position, setPosition] = useState({ coordinates: [80, 22], zoom: 9
  // });
  // const [selectedState, setSelectedState] = useState();
  // const [selectedDistrict, setSelectedDistrict] = useState();

  componentDidMount() {
    //fetch('https://raw.githubusercontent.com/sab99r/Indian-States-And-Districts/master/states-and-districts.json')
    fetch('https://raw.githubusercontent.com/geohacker/india/master/district/india_district.geojson')
      .then(res => {
        return res.json();
      })
      .then(resdata => {
        this.setState({
          data: resdata
        });
        console.log(resdata);
      });

  }

  handleZoomIn() {
    if (this.state.zoom >= 16) return;
    //setPosition(pos => ({ ...pos, zoom: pos.zoom * 2 }));
    this.setState({ zoom: this.state.zoom * 2 });
  }

  handleZoomOut() {
    if (this.state.zoom <= 1) return;
    //setPosition(pos => ({ ...pos, zoom: pos.zoom / 2 }));
    this.setState({ zoom: this.state.zoom / 2 });
  }

  handleMoveEnd(position) {
    //setPosition(position);
  }

  gethighest() {
    var highest = 0;
    for (var t1 in this.props.data) {
      states.push(t1);
      var districtData = this.props.data[t1].districtData;

      for (var t2 in districtData) {
        if (districtData[t2].confirmed > this.state.highest) {
          highest = districtData[t2].confirmed;
        }
      }
    }
    if (this.state.highest < highest) {
      this.setState({ highest: highest });
    }

    //console.log(this.state.highest);
    //console.log(districts);
  }

  heatMapColorforValue(value) {
    value = value / this.state.highest;
    var h = (1.0 - value) * 240
    return "hsl(" + h + ", 100%, 50%)";
  }
  // selection of districts //

  handelchange = (event) => {
    var districts = [];
    currentst = event.target.value;
    var districtData = this.props.data[currentst].districtData;
    console.log(districtData);
    for (var t1 in districtData) {
      districts.push(t1);
      this.setState({ distlist: districts });
    }
  };

  handelchangedist = (event) => {
    var currentdt = event.target.value;
    var disp = this.props.data[currentst].districtData[currentdt];
    if (!disp.lastupdate) {
      disp.lastupdate = 'null'
    }
    this.setState({ displaydata: disp });
  }

  // selection of districts //
  render() {


    const stlist = states.map(st => {
      return (<option value={st}>
        {st}
      </option>)
    });

    const dlist = this.state.distlist.map(d => {
      return (<option value={d}>
        {d}
      </option>)
    });

    return (
      <div className="main">
        <Container>
          <Row>
            <Col sm={8}>
              <div className="map">
                {this.gethighest()}
                <ComposableMap
                  width={1000}
                  fill="#D6D6DA"
                  stroke="#FFFFFF"
                  strokeWidth={0.1}
                >
                  <ZoomableGroup
                    zoom={this.state.zoom}
                    center={this.state.position}
                    onMoveEnd={this.handleMoveEnd.bind(this)}>
                    <Geographies geography={geoUrl}>
                      {({ geographies }) =>
                        geographies.map(geo => {
                          var state = geo.properties.NAME_1;
                          var dist = geo.properties.NAME_2;

                          if (this.props.data) {
                            temp1 = this.props.data[state];
                          }
                          if (temp1) {
                            temp2 = temp1.districtData[dist];
                          }
                          //console.log(temp2);
                          if (temp1 && temp2) {
                            // console.log(temp2);
                            return < Geography
                              key={geo.rsmKey}
                              geography={geo}
                              fill={this.heatMapColorforValue(temp2.confirmed)}
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
            <Col sm={4}>
              <div className="controls">
                <div className="box">
                  <button onClick={this.handleZoomIn.bind(this)}>
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
                  <button onClick={this.handleZoomOut.bind(this)}>
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
                  <select className="select" onClick={this.handelchange.bind(this)}>
                    {stlist}
                  </select>

                  <p className="title"> Select the District</p>
                  <select className="select" onClick={this.handelchangedist.bind(this)}>
                    {dlist}
                  </select>
                  <div>
                    <p>confirmed: {this.state.displaydata.confirmed}</p>
                    <p>lastupdate: {this.state.displaydata.lastupdate}</p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );

  }

}



export default Maps;