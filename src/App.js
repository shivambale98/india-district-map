import React, { Component } from 'react';
import './App.css';
import Maps from './Components/Map';



class App extends Component {

  state = {
    data: undefined
  };

  componentDidMount() {
    fetch('https://api.covid19india.org/state_district_wise.json')
      .then(res => {
        return res.json();
      })
      .then(resdata => {
        this.setState({
          data: resdata
        });
      });

  }

  render() {

    return (
      <div className="App">
        <Maps data={this.state.data} />
      </div>
    );

  }

}

export default App;
