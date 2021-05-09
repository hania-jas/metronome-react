import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ButtonProps {
  value: any;
  changeValue: () => void;
}

const Button = ({value, changeValue}: ButtonProps): JSX.Element => {
  return(
    <button className="button" onClick={changeValue}><FontAwesomeIcon icon={value}/></button>
  )
}

export default Button;