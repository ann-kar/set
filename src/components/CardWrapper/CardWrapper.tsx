import React from 'react';
import './CardWrapper.scss';

interface CardWrapperProps {
  children: React.ReactNode
}

function CardWrapper ({children} : CardWrapperProps) : JSX.Element {
  return (
    <div className="CardWrapper">
      {children}
    </div>
  );
}

export default CardWrapper;
