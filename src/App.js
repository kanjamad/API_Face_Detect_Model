import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
  apiKey: 'API key'
 });

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
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '', //should get displayed when I click on submit
    }  
  }

  //Anytime there's some sort of an event listener on a web page, I receive an event  
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }    

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});  //I can pass the imageUrl down to the FaceRecognition
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL, 
//this.state.imageUrl) the way setState work
      this.state.input) //I can give my url as the input over here, just put this.state.input
      .then(
      function(response) {
      // I need to get response dot output and then the zero(0) the first array, then it was 'data', 'regions', 'Zero(0)', 'region info', then 'bounding box'.
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      },
      function(err) {
        // there was an error
      }
    );
  }



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
       <Rank/>
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
       <FaceRecognition imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
