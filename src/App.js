import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
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
    }
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = (event) => {
    this.setState({ imageUrl: this.state.input });
    app.models.predict('53e1df302c079b3db8a0a36033ed2d15',
      this.state.input)
      .then(response => {
        console.log('hi', response.outputs[0].data.regions[0].region_info.bounding_box);
      });
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
        <FaceRecognition imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}
export default App;
