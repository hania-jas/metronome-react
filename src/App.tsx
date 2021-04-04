// @ts-nocheck

import React, {useState, useEffect, useRef} from 'react';
import ReactDOM from 'react-dom';
// @ts-ignore
import CircularSlider from '@fseehawer/react-circular-slider';
import Select from 'react-select'  
import './App.css';
// @ts-ignore
import tick1 from './sounds/tick1.wav';
import tick2 from './sounds/tick2.wav';
import Button from './components/Button';
import PlayPauseButton from './components/PlayPauseButton';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import { faPlayCircle, faPause, faPlus, faMinus, faRecordVinyl, faMusic } from '@fortawesome/free-solid-svg-icons'

const TIMER_CONST = 60000;


const App = () => {
const [tempo, setTempo] = useState<number>(60);
const [toggleClass, setToggleClass] = useState<boolean>(false);
const [buttonName, setButtonName] = useState<any>(<FontAwesomeIcon icon={faPlayCircle}/>);
const [sound, setSound] = useState(tick1)
const intervalRef = useRef(null);

let audio = new Audio(sound);

const options = [
  {value: tick1, label: 1 },
  {value: tick2, label: 2 }
]


useEffect(() => {
  restartMetronome();
}, [tempo, options])

const restartMetronome = (): void => {
  if (intervalRef.current !== null) {
    pause();
    play();
  }
}

 const tick = (): void => { 
  audio.play();
  setToggleClass(oldClass => !oldClass);
  console.log(toggleClass);
 }

 const play = (): void => {
  const timer = TIMER_CONST / tempo;
  const id = setInterval(tick, timer);
  intervalRef.current = id;
  console.log(options[0].label)
    
 }

 const pause = (): void => {
   // @ts-ignore
  clearInterval(intervalRef.current);
  intervalRef.current = null;
 }

const togglePlay = (): void => {
  if (intervalRef.current === null) {
   play();
   setButtonName(<FontAwesomeIcon icon={faPause}/>);
  } else {
   pause();
   setButtonName(<FontAwesomeIcon icon={faPlayCircle}/>);
  }
}

const handleChange = (option) => setSound(option.value)
  

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
        onChange={(tempo: number) => { setTempo(tempo)
        console.log(tempo);}
        }
        />
      </div>
      <div className="buttons">
        <Button value={<FontAwesomeIcon icon={faMinus}/>} changeValue={() => setTempo(tempo - 1)} />
        <PlayPauseButton playTheSound={togglePlay} buttonName={buttonName}/>
        <Button value={<FontAwesomeIcon icon={faPlus}/>} changeValue={() => setTempo(tempo + 1)}/>
      </div>
      <div className="controlButtons">
      <Select onChange={handleChange} options={options} placeholder={<FontAwesomeIcon icon={faMusic}/>}/>
      </div>
    </div>
  );
}

export default App;
