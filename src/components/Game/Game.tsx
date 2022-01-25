import React, { useState, useEffect } from 'react';

import './Game.scss';
import {Button, Card } from '../../components';
import { generateDeck, check, checkAll } from './utils';
import { ICard, Status, ITabProps } from '../../ts/types';

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
                activeCards.forEach((cardId) => {
                    updateCardStatus(cardId, 'Card-accepted');
                });
                setTimeout(() => {
                    if (visibleCards.length <= 12) {
                        replaceCards(activeCards);
                        setDeck(deck.slice(3));
                    } else {
                        removeCards(activeCards);
                    }
                }, 300);
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

    const handleButton = () => {
        let set = checkAll(visibleCards);
        if (set && deck.length > 0) {
            setActiveCards(set);
        } else if (deck.length > 0) {
            addCards();
        } else {
            end();
        }
    }

    const end = () => {
        alert("you have won")
    }

    const addCards = () => {

        const visibleCardsCopy = [...visibleCards];

        for (let el of deck.slice(0, 3)) {
            if (el) {
                visibleCardsCopy.push(el)
            };
        }

        setVisibleCards(visibleCardsCopy);
        setDeck(deck.slice(3));
    }

    const replaceCards = (cards: Array<any>) => {

        const visibleCardsCopy = [...visibleCards];
        const deckFragment = deck.slice(0, 3);
        let cardIndex, oldCard, newCard;

        cards.forEach((cardId, i) => {
            cardIndex = visibleCardsCopy.findIndex((card) => card.id === cardId);
            oldCard = visibleCardsCopy[cardIndex];
            if (deckFragment[i]) {
                newCard = deckFragment[i];
                Object.assign(oldCard, newCard);
            } else {
                removeCards(cards);
                return;
            }
        })

        setVisibleCards(visibleCardsCopy);
    }


    const removeCards = (cards: Array<any>) => {

        const visibleCardsCopy = [...visibleCards];
        let cardIndex;

        cards.forEach(cardId => {
            cardIndex = visibleCardsCopy.findIndex((card) => card.id === cardId);
            visibleCardsCopy.splice(cardIndex, 1);
        })

        setVisibleCards(visibleCardsCopy);

    }

    const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const clickedCardId = e.currentTarget.dataset.id;
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
            <Button onClick={handleButton}>find set</Button>
        </div>
    );
}

export default Game;
