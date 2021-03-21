import React from 'react';

const PlayPauseButton = ({playTheSound}) => {
  return (
  <button className="playPause" onClick={playTheSound}>PLAY</button>
  )
}

export default PlayPauseButton;