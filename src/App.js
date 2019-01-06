import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';


// Particles.js library
const particlesOptions = { 
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">   
{/* Particles.js library */
/* fix over written on top of everything,and everything else is below it. */
/* This needs a bit of configuration, add somthing like className='particles' and create this articles class and my css in App.css  */}
          <Particles className='particles' 
            params={particlesOptions}
            />
       <Navigation/>
       <Logo/>
       <ImageLinkForm/>
       <Rank/>
       {/* <FaceRecognition/> */}
      </div>
    );
  }
}

export default App;
