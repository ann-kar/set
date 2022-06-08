import { useState } from "react";

import "./Main.scss";
import { MenuItem, TabWrapper } from "../../components";

function Main({ children }: any): JSX.Element {
  const tabs = ["New Game", "Rules", "Options"];

  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [menuHidden, setMenuHidden] = useState(true);

  const toggleMenu = () => {
    console.log("toggled");
    if (menuHidden) {
      setMenuHidden(false);
    } else {
      setMenuHidden(true);
    }
  };

  return (
    <div className="Main">
      <ol className="menu">
        <MenuItem hidden={false} label="Menu" onClick={toggleMenu} />
        {tabs.map((tab) => (
          <MenuItem
            label={tab}
            key={tab}
            hidden={menuHidden}
            activeTab={activeTab === tab}
            onClick={() => setActiveTab(tab)}>
            {tab}
          </MenuItem>
        ))}
      </ol>
      <div className="active-tab">
        {children.map((child: JSX.Element) => {
          if (child.props.label !== activeTab) return undefined;
          return <TabWrapper key={child.props.label}>{child}</TabWrapper>;
        })}
      </div>
    </div>
  );
}

export default Main;
