import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';

import Particles from 'react-particles-js';

import './App.css';

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

function App() {
  return (
    <div className="App">
       <Particles className='particles'
                params={particlesOptions} />
      <Navigation/>
      <Logo/>
      <Rank/>
      <ImageLinkForm/>
      {/* <FaceRecognition/>  */}
    </div>
  );
}

export default App;
