import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
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
      box: {}, // face box,then build funtion call calculateFaceLocation 
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  // loadUser look to Register.js file
  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

    calculateFaceLocation  = (data) =>{ //this function will based on the inputs that get from Clarifai.
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');// inputimage will grabbed it, bounding_box is a percentage of the image 
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }
   // this funtion will receive return value on the top ^
   displaySizeFaceBox = (box) => {
    this.setState({box: box});
  }

  //Anytime there's some sort of an event listener on a web page, I receive an event  
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }    

  
  onButtonSubmit = () => {  // perhaps a better name for this function onPictureSubmit()
    this.setState({imageUrl: this.state.input});  //I can pass the imageUrl down to the FaceRecognition
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL, 
        this.state.input) //I can give my url as the input over here, just put this.state.input, //this.state.imageUrl error ;the way setState work
        .then(response => {
          if (response) {
            fetch('http://localhost:3000/image', {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: this.state.user.id
              })
            })
              .then(response => response.json())
              .then(count => {
                this.setState(prevState => {
                  return Object.assign ({}, prevState.user, { entries: count})
              })
            })
          }
          this.displayFaceBox(this.calculateFaceLocation(response))
        })
        .catch(err => console.log(err));
    }


// Create a route state, will keeps track of where I am on the page
  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }




  render() {
   const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">   
{/* Particles.js library */
/* fix over written on top of everything,and everything else is below it. */
/* This needs a bit of configuration, add somthing like className='particles' and create this articles class and my css in App.css  */}
          <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home'
          ? <div>
              <Logo />
              <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition box={box} imageUrl={imageUrl} />
            </div>
          : (
             route === 'signin'
             ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
             : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        )
       }
      </div>
    );
  }
}

export default App;
