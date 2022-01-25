import React from 'react';

import './Rules.scss';
import { ITabProps } from '../../ts/types';

function Rules({label} : ITabProps): JSX.Element {
    return (
        <div className="Rules" data-id={label}>
            Rules
        </div>
    );
}

export default Rules;
