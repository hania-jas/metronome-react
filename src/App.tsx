
import React, {useState, useEffect, useRef, useMemo} from 'react';
import ReactDOM from 'react-dom';
import CircularSlider from '@fseehawer/react-circular-slider';
import Select from 'react-select'  
import Slider from '@material-ui/core/Slider';
import { StylesProvider } from "@material-ui/core/styles";
import tick1 from './sounds/tick1.wav';
import tick2 from './sounds/tick2.wav';
import './App.css';
import Button from './components/Button';
import VolumeButton from './components/VolumeButton';
import PlayPauseButton from './components/PlayPauseButton';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import { faPlayCircle, faPause, faPlus, faMinus, faRecordVinyl, faMusic, faVolumeUp } from '@fortawesome/free-solid-svg-icons'

const TIMER_CONST = 60000;


const App = () => {
const [tempo, setTempo] = useState<number>(60);
const [isAnimationVisible, setIsAnimationVisible] = useState<boolean>(false);
const [isVolumeVisible, setIsVolumeVisible] = useState<boolean>(false);
const [buttonName, setButtonName] = useState<any>(<FontAwesomeIcon icon={faPlayCircle}/>);
const [sound, setSound] = useState(tick1)
const [volume, setVolume] = useState<number>(1);
const intervalRef = useRef<NodeJS.Timeout | null>(null);

let audio = new Audio(sound);
audio.volume = volume;

const selectStyles = {
  
  control: (provided: object) => ({
    ...provided,
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: '#1e262f',
    border: 'none',
    marginBottom: 10,

  }),
  indicatorsContainer: () => ({
    display: 'none',  
  }),
  container: () =>({
    marginRight: 20,
    width: 55,
  }),
  menu: () => ({
    background: 'transparent',
    borderRadius: 100,
   
    }),
  option: () => ({
    height:20,
    paddingTop: 5,
    paddingBottom: 5,
    color: '#586069',
    cursor: 'pointer',
  }),
  singleValue: () => ({
    color: '#586069',
  }),
 
}

const options =  [
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
  setIsAnimationVisible(oldClass => !oldClass);
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

const handleChange = (option: {value: any; label: number} | null): void => {
  if(option) {
    setSound(option.value)
  }
}
// @ts-ignore
const handleSound = (event, newValue): void => {
  setVolume(newValue);
};

const handleVolumeVisibility = () => {
  setIsVolumeVisible(oldClass => !oldClass)
}
  

  return (
    <div className="App">
      <div className={`animation ${isAnimationVisible ? 'show' : 'mask'}`}>
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
        <VolumeButton value={<FontAwesomeIcon icon={faVolumeUp}/>}  controlVolume={handleVolumeVisibility}/>
        <div>
          <StylesProvider  injectFirst>
            <Slider className={` ${isVolumeVisible? 'showVolume' : 'hideVolume'}`} value={volume}   step={0.1}  defaultValue={0.01} onChange={handleSound} aria-labelledby="continuous-slider" min={0} max={1}/>
          </StylesProvider>
        </div>
        <Select onChange={handleChange} options={options} placeholder={<FontAwesomeIcon icon={faMusic}/>} styles={selectStyles}/>
      </div>
    </div>
  );
}

export default App;
