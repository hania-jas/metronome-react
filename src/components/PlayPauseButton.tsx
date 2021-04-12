
import React from 'react';

interface PlayPauseProps {
  playTheSound: () => void;
  buttonName: any;
}

const PlayPauseButton = ({playTheSound, buttonName}: PlayPauseProps) => {
  return (
  <button className="playPause" onClick={playTheSound}>{buttonName}</button>
  )
}

export default PlayPauseButton;