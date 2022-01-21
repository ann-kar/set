import React, { FC } from 'react';
import { isPropertySignature } from 'typescript';
import './Options.scss';

function Options({handleTab, label} : any): JSX.Element {
    return (
        <div className="Options" data-id={label} onClick={handleTab}>
            Options
        </div>
    );
}

export default Options;
