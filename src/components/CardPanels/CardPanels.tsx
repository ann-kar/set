import React from 'react';

import './CardPanels.scss';
import { CardPanel } from "../../components";

function CardPanels({ cards, renderCards }: any): JSX.Element {

    return (
        <div className="CardPanels">
      {renderCards(cards.slice(0, 12))}
            <CardPanel>{renderCards(cards.slice(12, 15))}</CardPanel>
            <CardPanel>{renderCards(cards.slice(15, 18))}</CardPanel>
            <CardPanel>{renderCards(cards.slice(18, 21))}</CardPanel>
        </div>
    );
}

export default CardPanels;
