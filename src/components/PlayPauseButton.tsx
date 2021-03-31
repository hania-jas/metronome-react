
import React from 'react';

interface PlayPauseProps {
  playTheSound: () => void;
  buttonName: any;
}

const PlayPauseButton: React.FC<PlayPauseProps> = ({playTheSound, buttonName}) => {
  return (
  <button className="playPause" onClick={playTheSound}>{buttonName}</button>
  )
}

export default PlayPauseButton;