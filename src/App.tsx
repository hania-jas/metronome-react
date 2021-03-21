// @ts-nocheck
import React, {useState, useEffect} from 'react';
import './App.css';
import Button from './components/Button';
import Output from './components/Output';
import PlayPauseButton from './components/PlayPauseButton';

const App = () => {
const [val, setVal] = useState(60);
const [isId, setIsId] = useState();
const [timer, setTimer] = useState(1000);

useEffect(() => {
  setTimer(60000/val);
  console.log('val', val); 
}, [val])

const faster = () => {

  setVal(val + 1);
  console.log( val);

  if (isId) {
  pause();
  play();
  }
}

const slower = () => {

  setVal(val - 1);
  if (isId) {
    pause();
    play();
  }
}



 const timeout = () => { 
  let context = new AudioContext()
  let o = context.createOscillator()
  let  g = context.createGain()
  o.connect(g)
  g.connect(context.destination)
  o.start(0)
  o.stop(0.01);
 }

 const play = () => {
  
  const id = setInterval(timeout, timer);
  setIsId(id);
    
 }

 const pause = () => {
    clearInterval(isId);
    setIsId(null);
 }

const playPause = () => {

  if (!isId) {
   play();
  } else {
   pause();
  }
}
  

  return (
    <div className="App">
      <h1>METRONOM</h1>
      <PlayPauseButton playTheSound={playPause}/>
      <div className="containerApp">
      <Button value="+" changeValue={faster} />
      <Output val={val} />
      <Button value="-" changeValue={slower}/>
      </div>
    </div>
  );
}

export default App;
