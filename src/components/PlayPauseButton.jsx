import React from 'react';

const PlayPauseButton = ({playTheSound, buttonName}) => {
  return (
  <button className="playPause" onClick={playTheSound}>{buttonName}</button>
  )
}

export default PlayPauseButton;