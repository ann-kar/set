import React from 'react';

import './Card.scss';
import Symbol from './Symbol/Symbol';
import {ICard} from '../../ts/types';

function Card({ color, fill, number, shape, handleCardClick, id, cardStatus }: ICard): JSX.Element {

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
  
    handleCardClick(e);
   
  }

    return (
      <div className={`Card ${cardStatus}`} data-id={id} onClick={(e) => handleClick(e)}>
        {color && fill && number && shape &&
          Array(number).fill(0).map((el) =>
            <Symbol color={color} fill={fill} shape={shape} />)}
      </div>

    );
  }

  export default Card;
