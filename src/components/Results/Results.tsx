import React, { FC } from 'react';
import { isPropertySignature } from 'typescript';
import './Results.scss';

function Results({handleTab, label} : any): JSX.Element {
    return (
        <div className="Results" data-id={label} onClick={handleTab}>
            Results
        </div>
    );
}

export default Results;
