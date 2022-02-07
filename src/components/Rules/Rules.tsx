import React, { useState, useEffect } from 'react';

import './Rules.scss';
import { ICard, ITabProps, Status, Features, FeatureNames } from '../../ts/types';
import { generateDeck, renderCards } from '../../utils/utils';
import { Button, Card, TabWrapper } from '..';

function Rules({ label }: ITabProps): JSX.Element {
    const [cards, setCards] = useState<ICard[]>([]);
    const [sampleCard, setSampleCard] = useState<ICard>({
        color: "green",
        shape: "diamond",
        fill: "blank",
        number: 1,
        id: "green-squiggle-filled-1",
        cardStatus: "Card-inactive",
        children: { undefined }
    });
    const [clickCount, setClickCount] = useState<any>({ color: 0, shape: 0, fill: 0, number: 0 });

    type Clicks = {
        color: number,
        shape: number,
        fill: number,
        number: number
    };

    const toggleFeature = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

        let features: Features = {
            color: ['green', 'red', 'violet'],
            shape: ['diamond', 'squiggle', 'stadium'],
            fill: ['blank', 'filled', 'shaded'],
            number: [1, 2, 3]
        }

        const target = e.target as HTMLElement;
        const featureType = target.dataset.feature as FeatureNames;

        const clickCountCopy = { ...clickCount };
        const sampleCardCopy: ICard = { ...sampleCard };
        let newCount: number = clickCountCopy[featureType] + 1;
        let newVal = features[featureType][(newCount % 3)];
        clickCountCopy[featureType] = newCount;

        //@ts-ignore
        sampleCardCopy[featureType] = newVal;

        setClickCount(clickCountCopy);
        setSampleCard(sampleCardCopy);
    }

    useEffect(() => {
        let newDeck = generateDeck();
        setCards(newDeck.slice(0, 12));

    }, []);

    useEffect(() => {
        function animationHelper(indexes: Array<number>, status: Status) {
            const timer = setTimeout(() => {
                let cardsCopy = [...cards];
                for (let index of indexes) {
                    cardsCopy[index].cardStatus = status;
                }
                setCards(cardsCopy);
            }, 500);
            return () => clearTimeout(timer);
        };

        if (cards && cards[0]) {
            if (cards[0].cardStatus === 'Card-inactive') {
                animationHelper([0], 'Card-active')
            }

            if (cards[0].cardStatus === 'Card-active' && cards[4].cardStatus !== 'Card-active') {
                animationHelper([4], 'Card-active');
            }
            if (cards[4].cardStatus === 'Card-active') {
                animationHelper([0, 4, 9], 'Card-accepted');
            }
        };
    });

    return (
        <div className="Rules" data-id={label}>
            <h1 className="Rules__header">How to play?</h1>
            <p className="Rules__text">
                SET is an exercise in perceptiveness. <br /><br />
                What you need to do is find a SET of three cards out of the twelve cards you see:
            </p>
            <TabWrapper>
                {renderCards(cards)}
            </TabWrapper>
            <section className="Rules__section">
                <h2 className="Rules__subheader">Why are those cards a set?</h2>
                <p className="Rules__text">Well, each card has four features.<br />
                    And each feature comes in three variants.<br />
                    Click on the buttons below to explore all the 81 (3 x 3 x 3 x 3) possible cards.</p>
                <Card
                    color={sampleCard.color}
                    shape={sampleCard.shape}
                    fill={sampleCard.fill}
                    number={sampleCard.number}
                    id="green-squiggle-filled-1"
                    cardStatus="Card-inactive"
                    children={undefined} />
                <div className="Rules__cardSection">
                    <div>
                        <Button onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => toggleFeature(e)} data-count={1} data-feature="color">color</Button>
                        <Button onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => toggleFeature(e)} data-count={1} data-feature="shape">shape</Button>
                        <Button onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => toggleFeature(e)} data-count={1} data-feature="fill">fill</Button>
                        <Button onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => toggleFeature(e)} data-count={1} data-feature="number">number</Button>
                    </div>
                </div>
                <p className="Rules__text">
                    A SET consists of three cards in which every feature is either the same (e.g. all cards are green) or different (e.g.: a green card + a red card + a violet card).
                </p>
            </section>

            <div className="sampleCards">
                <h2 className="Rules__subheader">Example:</h2>
                <Card
                    color="green"
                    shape="squiggle"
                    fill="filled"
                    number={1}
                    id="green-squiggle-filled-1"
                    cardStatus="Card-inactive"
                    children={undefined} />
                <Card
                    color="red"
                    shape="squiggle"
                    fill="filled"
                    number={2}
                    id="red-squiggle-filled-1"
                    cardStatus="Card-inactive"
                    children={undefined} />
                <Card
                    color="violet"
                    shape="squiggle"
                    fill="filled"
                    number={3}
                    id="violet-squiggle-filled-1"
                    cardStatus="Card-inactive"
                    children={undefined} />
                <ol className="Rules__list">
                    <li>colors: all different</li>
                    <li>shapes: all the same</li>
                    <li>fills: all the same</li>
                    <li>numbers: all different</li>
                </ol>
            </div>
            <p className="Rules__text">Hint: If two cards share a feature and the third one doesn’t, it’s not a set.</p>
            <h2 className="Rules__subheader">Ok, but what's the point of the game?</h2>
            <p className="Rules__text"> Depends. If you play against the computer, the player with more SETs wins.</p>
            <p className="Rules__text"> If you play in the solo mode (the only mode currently available here... but <em>just you wait!</em>),
                try to finish the game as fast as you can.</p>
        </div >
    );
}

export default Rules;
