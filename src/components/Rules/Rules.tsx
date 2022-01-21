import React, { FC } from 'react';
import { isPropertySignature } from 'typescript';
import './Rules.scss';

function Rules({handleTab, label} : any): JSX.Element {
    return (
        <div className="Rules" data-id={label} onClick={handleTab}>
            Rules
        </div>
    );
}

export default Rules;
