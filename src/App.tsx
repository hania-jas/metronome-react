// @ts-nocheck
import React, {useState, useEffect} from 'react';
import CircularSlider from '@fseehawer/react-circular-slider';  
import ReactDOM from 'react-dom';
import './App.css';
import tick1 from './sounds/tick1.wav';
import Button from './components/Button';
import Output from './components/Output';
import PlayPauseButton from './components/PlayPauseButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faPlay, faPause, faPlus, faMinus, faRecordVinyl } from '@fortawesome/free-solid-svg-icons'

const TIMER_CONST = 60000;
let audio = new Audio(tick1);

const App = () => {
const [tempo, setTempo] = useState(60);
const [intervalId, setIntervalId] = useState();
const [toggleClass, setToggleClass] = useState(false);
const [buttonName, setButtonName] = useState(<FontAwesomeIcon icon={faPlay}/>);

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
  audio.play();
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
   setButtonName( <FontAwesomeIcon icon={faPause}/>);
  } else {
   pause();
   setButtonName(<FontAwesomeIcon icon={faPlay}/>);
  }
}
  

  return (
    <div className="App">
      <div className={`animation ${toggleClass ? 'show' : 'mask'}`}>
        <FontAwesomeIcon icon={faRecordVinyl} className="firstCircle"/>
        <FontAwesomeIcon icon={faRecordVinyl} className="secondCircle"/>
        <FontAwesomeIcon icon={faRecordVinyl} className="thirdCircle"/>
      </div>
      <div className="containerApp">
        <CircularSlider
        label={'bpm'}
        labelBottom={true}
        knobColor="#434c56"
        progressColorFrom="#45def0"
        progressColorTo="#0c6789"
        trackSize={20}
        progressSize={20}
        trackColor="#434c56"
        width={200}
        dataIndex={tempo}
        labelColor="#45def0"
        min={0}
        max={400}
        onChange={(tempo) => { setTempo(tempo)
        console.log(tempo);}
        }
        />
      </div>
      <div className="buttons">
        <Button value={<FontAwesomeIcon icon={faMinus}/>} changeValue={() => setTempo(tempo - 1)} />
        <PlayPauseButton playTheSound={togglePlay} buttonName={buttonName}/>
        <Button value={<FontAwesomeIcon icon={faPlus}/>} changeValue={() => setTempo(tempo + 1)}/>
      </div>
    </div>
  );
}

export default App;
