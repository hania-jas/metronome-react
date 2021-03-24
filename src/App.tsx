// @ts-nocheck
import React, {useState, useEffect} from 'react';
import './App.css';
import Button from './components/Button';
import Output from './components/Output';
import PlayPauseButton from './components/PlayPauseButton';

const TIMER_CONST = 60000;

const App = () => {
const [tempo, setTempo] = useState(60);
const [intervalId, setIntervalId] = useState();

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
  } else {
   pause();
  }
}
  

  return (
    <div className="App">
      <h1>METRONOM</h1>
      <PlayPauseButton playTheSound={togglePlay}/>
      <div className="containerApp">
      <Button value="+" changeValue={() => setTempo(tempo + 1)} />
      <Output val={tempo} />
      <Button value="-" changeValue={() => setTempo(tempo - 1)}/>
      </div>
    </div>
  );
}

export default App;
