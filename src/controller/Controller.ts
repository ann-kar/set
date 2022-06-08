import { ICard, colors, shapes, fills, numbers } from "../ts/types";
import { Utils } from "../utils/utils";

export class Controller {

    static createDeck() {
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

        Utils.shuffleArray(deck);
        return deck;
    }

    static check(cards: [string, string, string]): boolean {
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

    static checkAll(cards: Array<string>) {
        for (let i = 0; i < cards.length; i++) {
            for (let j = i + 1; j < cards.length; j++)
                for (let k = j + 1; k < cards.length; k++) {
                    if (Controller.check([cards[i], cards[j], cards[k]])) {
                        return [cards[i], cards[j], cards[k]];
                    }
                }
        }
        return null;
    }
}
