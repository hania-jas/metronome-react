import React from 'react';

interface ButtonProps {
  value: any;
  controlVolume: () => void;
}

const VolumeButton: React.FC<ButtonProps> = ({value, controlVolume}) => {
  return(
    <button className="volumeButton" onClick={controlVolume}>{value}</button>
  )
}

export default VolumeButton;