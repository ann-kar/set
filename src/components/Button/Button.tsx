import React from 'react';
import './Button.scss';

type ButtonProps = {
  dataId?: string;
  children?: any;
  isOn?: boolean;
  onClick?: any;
  label?: string;
}

function Button ({dataId, label, onClick, children} : ButtonProps) : JSX.Element {
  return (
    <button className="Button" onClick={onClick} data-id={dataId}>
       Hint
    </button>
  );
}

export default Button;
