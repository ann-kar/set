import React from 'react';

import './Results.scss';
import { ITabProps } from '../../ts/types';

function Results({ label }: ITabProps): JSX.Element {
    return (
        <div className="Results" data-id={label}>
            Results
        </div>
    );
}

export default Results;
