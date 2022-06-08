import { ICard, shapes, colors, fills, numbers } from "../ts/types";
import { Card } from "../components";

export class Utils {
  static getCardFeaturesFromId = (id: string) => {
    const features = id.split("-");
    return {
      color: features[0],
      shape: features[1],
      fill: features[2],
      number: features[3],
    };
  };
}

export function generateDeck() {
  const deck: Array<ICard> = [];

  for (const color of colors) {
    for (const shape of shapes) {
      for (const fill of fills) {
        for (const number of numbers) {
          deck.push({
            id: `${color}-${shape}-${fill}-${number}`,
            cardStatus: "Card-inactive",
          });
        }
      }
    }
  }

  shuffleArray(deck);
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
  const sorted = `${cards[0]}-${cards[1]}-${cards[2]}`.split("-").sort();
  for (let i = 0; i < sorted.length; i++) {
    if (
      sorted[i] === sorted[i + 1] &&
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
  cards = cards.map((card) => card.id);

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
  return cards.map((card: ICard) => {
    return <Card key={card.id} id={card.id} cardStatus={card.cardStatus} />;
  });
}
