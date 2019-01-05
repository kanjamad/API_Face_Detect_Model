import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
// import Rank from './components/Rank/Rank';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
            <Particles 
              params={{
            		particles: {
            			line_linked: {
            				shadow: {
            					enable: true,
            					color: "#3CA9D1",
            					blur: 5
            				}
            			}
            		}
            	}}
            />
       <Navigation/>
       <Logo/>
       <ImageLinkForm/>
       {/* <FaceRecognition/>
       <Rank/> */}
      </div>
    );
  }
}

export default App;
