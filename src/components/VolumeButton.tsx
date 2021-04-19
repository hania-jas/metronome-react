import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ButtonProps {
  value: any;
  controlVolume: () => void;
}

const VolumeButton = ({value, controlVolume}: ButtonProps) => {
  return(
    <button className="volumeButton" onClick={controlVolume}>{<FontAwesomeIcon icon={value}/>}</button>
  )
}

export default VolumeButton;