
import React, {useState, useEffect} from 'react';
// @ts-ignore
import CircularSlider from '@fseehawer/react-circular-slider';  
import './App.css';
// @ts-ignore
import tick1 from './sounds/tick1.wav';
import Button from './components/Button';
import PlayPauseButton from './components/PlayPauseButton';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import { faPlayCircle, faPause, faPlus, faMinus, faRecordVinyl } from '@fortawesome/free-solid-svg-icons'

const TIMER_CONST = 60000;
let audio = new Audio(tick1);

const App: React.FC = () => {
const [tempo, setTempo] = useState<number>(60);
const [intervalId, setIntervalId] = useState< null | NodeJS.Timeout>();
const [toggleClass, setToggleClass] = useState<boolean>(false);
const [buttonName, setButtonName] = useState<any>(<FontAwesomeIcon icon={faPlayCircle}/>);

useEffect(() => {
  restartMetronome();
}, [tempo])

const restartMetronome = (): void => {
  if (intervalId) {
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
  setIntervalId(id);
    
 }

 const pause = (): void => {
   // @ts-ignore
  clearInterval(intervalId);
  setIntervalId(null);
 }

const togglePlay = (): void => {
  if (!intervalId) {
   play();
   setButtonName(<FontAwesomeIcon icon={faPause}/>);
  } else {
   pause();
   setButtonName(<FontAwesomeIcon icon={faPlayCircle}/>);
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
    </div>
  );
}

export default App;
