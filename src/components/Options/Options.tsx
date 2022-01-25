import React from 'react';

import './Options.scss';
import {ITabProps} from '../../ts/types';

function Options({ label }: ITabProps): JSX.Element {
    return (
        <div className="Options" data-id={label}>
            Options
        </div>
    );
}

export default Options;
