import React from 'react';
import './MenuItem.scss';

interface MenuItemProps {
    onClick: React.MouseEventHandler<HTMLLIElement>;
    label: string;
    activeTab: boolean;
    children: any
}

function MenuItem(props: MenuItemProps): JSX.Element {

  let otherClasses = "";
  if (props.activeTab) {
    otherClasses = "active"
  } 

  return (
    <li className={`MenuItem ${otherClasses}`} onClick={props.onClick} >
      {props.label}
    </li>
  );
}

export default MenuItem;
