import React from 'react';

interface ButtonProps {
  value: any;
  changeValue: () => void;
}

const Button = ({value, changeValue}: ButtonProps) => {
  return(
    <button className="button" onClick={changeValue}>{value}</button>
  )
}

export default Button;