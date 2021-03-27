// @ts-nocheck
import React, {useState, useEffect} from 'react';
import './App.css';
import Button from './components/Button';
import Output from './components/Output';
import PlayPauseButton from './components/PlayPauseButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

const TIMER_CONST = 60000;

const App = () => {
const [tempo, setTempo] = useState(60);
const [intervalId, setIntervalId] = useState();
const [toggleClass, setToggleClass] = useState(false);
const [buttonName, setButtonName] = useState('play');

useEffect(() => {
  restartMetronome();
}, [tempo])

const restartMetronome = () => {
  if (intervalId) {
    pause();
    play();
  }
}

 const tick = () => { 
  let context = new AudioContext()
  let o = context.createOscillator()
  let  g = context.createGain()
  o.connect(g)
  g.connect(context.destination)
  o.start(0)
  o.stop(0.01);

  setToggleClass(oldClass => !oldClass);
  console.log(toggleClass);
 }

 const play = () => {
  const timer = TIMER_CONST / tempo;
  const id = setInterval(tick, timer);
  setIntervalId(id);
    
 }

 const pause = () => {
  clearInterval(intervalId);
  setIntervalId(null);
 }

const togglePlay = () => {
  if (!intervalId) {
   play();
   setButtonName('pause');
  } else {
   pause();
   setButtonName('play');
  }
}
  

  return (
    <div className="App">
      <h1>METRONOM</h1>
      <div className={`${toggleClass ? 'show' : 'hide'}`}>
      <FontAwesomeIcon icon={faCircle} className="firstCircle"/>
      <FontAwesomeIcon icon={faCircle} className="secondCircle"/>
      <FontAwesomeIcon icon={faCircle} className="thirdCircle"/>
      </div>
      <div className="containerApp">
      <Output val={tempo} />
      </div>
      <div className="buttons">
      <Button value="-" changeValue={() => setTempo(tempo - 1)} />
      <PlayPauseButton playTheSound={togglePlay} buttonName={buttonName}/>
      <Button value="+" changeValue={() => setTempo(tempo + 1)}/>
      </div>
    </div>
  );
}

export default App;
