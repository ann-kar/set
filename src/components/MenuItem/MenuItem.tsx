import React from 'react';
import './MenuItem.scss';

interface MenuItemProps {
    onClick: React.MouseEventHandler<HTMLLIElement>;
    label: string;
    activeTab?: boolean;
    children?: any;
    hidden: boolean;
}

function MenuItem(props: MenuItemProps): JSX.Element {
  let otherClasses = "";

  if (props.activeTab) {
    otherClasses += "active"
  }

  if (props.hidden) {
    otherClasses += " hidden"
  }

  return (
    <li className={`MenuItem ${otherClasses}`} onClick={props.onClick} >
      {props.label}
    </li>
  );
}

export default MenuItem;
