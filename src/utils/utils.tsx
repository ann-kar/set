
import { ICard, Features } from '../ts/types';
import { Card } from '../components';

export function generateDeck() {
    
    let deck: Array<ICard> = [];
    let features: Features = {
        color: ['green', 'red', 'violet'],
        shape: ['diamond', 'squiggle', 'stadium'],
        fill: ['blank', 'filled', 'shaded'],
        number: [1, 2, 3]
    }

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            for (let k = 0; k < 3; k++) {
                for (let l = 0; l < 3; l++) {
                    deck.push({
                        color: features.color[i],
                        shape: features.shape[j],
                        fill: features.fill[k],
                        number: features.number[l],
                        id: `${features.color[i]}-${features.shape[j]}-${features.fill[k]}-${features.number[l]}`,
                        cardStatus: 'Card-inactive',
                        children: undefined
                    })
                }
            }
        }
    }

    shuffleArray(deck)
    return deck;
}

function shuffleArray(array: Array<any>) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

export function check(cards: Array<string>): boolean {
    const sorted = (`${cards[0]}-${cards[1]}-${cards[2]}`).split("-").sort();
    for (let i = 0; i < sorted.length; i++) {
        if (sorted[i] === sorted[i + 1] &&
            sorted[i] !== sorted[i + 2] &&
            i === sorted.indexOf(sorted[i])
        ) {
            // FUTURE ALERT: console.log(`You cannot have exactly two cards with ${sorted[i]} elements`);
            return false;
        }
    }
    return true;
}

export function checkAll(cards: Array<any>) {

    cards = cards.map(card => card.id);

    for (let i = 0; i < cards.length; i++) {
        for (let j = i + 1; j < cards.length; j++)
            for (let k = j + 1; k < cards.length; k++) {
                if (check([cards[i], cards[j], cards[k]])) {
                    return [cards[i], cards[j], cards[k]];
                }
            }
    }
    return null;
}

export function renderCards(cards: ICard[]) {
    return cards.map((card: ICard, i: number) => {
        return <Card
            key={`card-${i}`}
            cardStatus={card.cardStatus}
            color={card.color}
            shape={card.shape}
            fill={card.fill}
            number={card.number}
            id={card.id}
        >
        </Card>
    })
};
