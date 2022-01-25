import React, { useState, useEffect } from 'react';

import './Game.scss';
import Card from '../Card/Card';
import { generateDeck, check } from './utils';
import { ICard, Status } from '../../ts/types';

interface ITabProps {
    label: string;
}

function Game({ label }: ITabProps): JSX.Element {

    const [deck, setDeck] = React.useState<Array<ICard>>([]);
    const [activeCards, setActiveCards] = React.useState<Array<string>>([]);
    const [visibleCards, setVisibleCards] = React.useState<Array<ICard>>([]);

    useEffect(() => {
        let newDeck = generateDeck();
        setDeck(newDeck.slice(12));
        setVisibleCards(newDeck.slice(0, 12));
    }, []);

    useEffect(() => {
        if (activeCards.length === 3) { 
            if (check(activeCards)) {
                activeCards.map((cardId, i) => {
                    updateCardStatus(cardId, 'Card-accepted');
                    setTimeout(() => {
                        replaceCard(cardId, i);
                    }, 300);
                })
                setDeck(deck.slice(3));
            } else {
                activeCards.map(card => {
                    updateCardStatus(card, 'Card-rejected');
                    setTimeout(() => {
                        updateCardStatus(card, 'Card-inactive');
                    }, 300)
                })
            }
            setActiveCards([]);
        }
    }, [activeCards])

   

    const replaceCard = (cardId: string, i:number) => {
        const visibleCardsCopy = [...visibleCards];
        const cardIndex = visibleCardsCopy.findIndex((card) => card.id === cardId);
        let oldCard = visibleCardsCopy[cardIndex];
        let newCard = deck[i];
        Object.assign(oldCard, newCard);
        setVisibleCards(visibleCardsCopy);
    }

    const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const clickedCardId = e.currentTarget.dataset.id;
        console.log(clickedCardId);
        if (clickedCardId) { 
            if (Array.from(e.currentTarget.classList).includes('Card-active')) {
                updateCardStatus(clickedCardId, 'Card-inactive');
                setActiveCards([...activeCards.filter(card => card !== clickedCardId)]);
            } else {
                updateCardStatus(clickedCardId, 'Card-active');
                setActiveCards([...activeCards, clickedCardId])
            }
        }
    }

    const updateCardStatus = (cardId: string, status: Status): void => {
        const visibleCardsCopy = [...visibleCards];
        const clickedCardIndex = visibleCardsCopy.findIndex((card) => card.id === cardId);
        visibleCardsCopy[clickedCardIndex].cardStatus = status;
        setVisibleCards(visibleCardsCopy);
    }

    const renderVisibleCards = () => {
        return visibleCards.map((card, i) => {
            return <Card
                key={`card-${i}`}
                handleCardClick={handleCardClick}
                cardStatus={card.cardStatus}
                color={card.color}
                shape={card.shape}
                fill={card.fill}
                number={card.number}
                id={card.id} 
            >
            </Card>
        })
    }

    return (
        <div className="Game" data-id={label} >
            {visibleCards && renderVisibleCards()}
        </div>
    );
}

export default Game;
