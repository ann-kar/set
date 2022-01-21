import React from 'react';
import './Game.scss';
import Card from '../Card/Card';

function Game({handleTab, label} : any): JSX.Element {
    return (
        <div className="Game" data-id={label} onClick={handleTab}>
            {Array(12).fill(0).map((el, i) => {
                    return <Card key={i} color="green" shape="diamond" fill="filled" number={1}></Card>
            })}
        </div>
    );
}

export default Game;
