import React, { FC } from 'react';
import './Card.scss';
import Symbol from './Symbol/Symbol';

type CardProps = {
    color: string;
    fill: string;
    number: number;
    shape: string;
}

function Card ({color, fill, number, shape} : CardProps) : JSX.Element {
  return (
    <div className="Card">
           {Array(number).fill(0).map((el, i) => 
            <Symbol color={color} fill={fill} shape={shape}/>)}
    </div>
  );
}

export default Card;
