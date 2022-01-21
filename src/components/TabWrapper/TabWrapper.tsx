import React from 'react';
import './TabWrapper.scss';

interface TabWrapperProps {
    children: React.ReactNode
}

function TabWrapper({children} : TabWrapperProps): JSX.Element {
    return (
        <div className="TabWrapper">
            {children}
        </div>
    );
}

export default TabWrapper;
