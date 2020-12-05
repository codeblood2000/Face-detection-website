import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

import Clarifai from 'clarifai';
import Particles from 'react-particles-js';

import './App.css';
import { Component } from 'react';

const app = new Clarifai.App({
  apiKey: '4893ef0b6ef64a17b8f7d1cf7e69d5c6'
});

const particlesOptions = {
  "particles": {
    "number": {
      "value": 80
    },
    "size": {
      "value": 4
    }
  },
  "interactivity": {
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: '',
      }
    }
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      }
    });
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    //console.log(clarifaiFace);
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    // console.log(width,height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({ box: box });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = (event) => {
    this.setState({ imageUrl: this.state.input });
    app.models.predict('53e1df302c079b3db8a0a36033ed2d15',
      this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response))
        // console.log('hi', response.outputs[0].data.regions[0].region_info.bounding_box);
      ).catch(err => console.log(err));
  }

  OnRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({ isSignedIn: false });
    } else if (route === 'home') {
      this.setState({ isSignedIn: true });
    }
    this.setState({
      route: route,
    })
  }
  render() {
    const { isSignedIn, imageUrl, box, route } = this.state;
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions} />
        <Navigation isSignedIn={isSignedIn} OnRouteChange={this.OnRouteChange} />
        {route === 'home'
          ? <div>
            <Logo />
            <Rank />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
          : (route === 'signin'
            ? <SignIn OnRouteChange={this.OnRouteChange} />
            : <Register loadUser={this.loadUser} OnRouteChange={this.OnRouteChange} />)
        }
      </div>
    );
  }
}
export default App;
