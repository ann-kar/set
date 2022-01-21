import React, { FC } from 'react';
import { isPropertySignature } from 'typescript';
import './Card.scss';
import Symbol from './Symbol/Symbol';

type CardProps = {
    color?: string;
    fill?: string;
    number?: number;
    shape?: string;
    children?: any;
}

function Card ({color, fill, number, shape, children} : CardProps) : JSX.Element {
  return (
   
      <div className="Card">
      {children}
           {(color && fill && number && shape) ? 
           Array(number).fill(0).map((el, i) => 
            <Symbol color={color} fill={fill} shape={shape}/>) : null}
      </div>

  );
}

export default Card;
