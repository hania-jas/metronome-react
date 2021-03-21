import React from 'react';

const Button = ({value, changeValue}) => {
  return(
    <button className="button" onClick={changeValue}>{value}</button>
  )
}

export default Button;