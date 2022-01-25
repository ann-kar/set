import React, { useState } from 'react';

import './CardPanel.scss';

function CardPanel({ children }: any): JSX.Element {

    return (
        <div className="CardPanel">
            {children}
        </div>
    );
}

export default CardPanel;
