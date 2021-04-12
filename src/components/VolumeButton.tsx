import React from 'react';

interface ButtonProps {
  value: any;
  controlVolume: () => void;
}

const VolumeButton = ({value, controlVolume}: ButtonProps) => {
  return(
    <button className="volumeButton" onClick={controlVolume}>{value}</button>
  )
}

export default VolumeButton;