import React from 'react';
import './Button.scss';

type ButtonProps = {
  dataId?: string;
  children?: any;
  isOn?: boolean;
  onClick?: any;
  label?: string;
}

function Button ({label, children, ...props} : ButtonProps) : JSX.Element {
  return (
    <button className="Button" {...props}>
       {label}
       {children}
    </button>
  );
}

export default Button;
