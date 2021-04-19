
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface PlayPauseProps {
  playTheSound: () => void;
  iconName: any;
}

const PlayPauseButton = ({playTheSound, iconName}: PlayPauseProps) => {
  return (
  <button className="playPause" onClick={playTheSound}><FontAwesomeIcon icon={iconName}/></button>
  )
}

export default PlayPauseButton;