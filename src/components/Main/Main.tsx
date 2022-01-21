import React, { useState } from 'react';

import './Main.scss';
import { MenuItem, TabWrapper } from '../../components';

function Main({ children }: any): JSX.Element {

  const tabs = ['New Game', 'Results', 'Rules', 'Options'];

  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="Main">
      <ol className="menu">
        {tabs.map(tab => (
          <MenuItem
            label={tab}
            key={tab}
            activeTab={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </MenuItem>))}
      </ol>
      <div className="active-tab">
        {children.map((child: any) => {
          if (child.props.label !== activeTab) return undefined;
          return <TabWrapper>{child}</TabWrapper>;
        })}
      </div>
    </div>
  );
}

export default Main;
