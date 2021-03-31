import React from 'react';

interface ButtonProps {
  value: any;
  changeValue: () => void;
}

const Button: React.FC<ButtonProps> = ({value, changeValue}) => {
  return(
    <button className="button" onClick={changeValue}>{value}</button>
  )
}

export default Button;