import { ICard } from "../ts/types";
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

  static shuffleArray(array: Array<any>) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  static renderCards(cards: ICard[]) {
    return cards.map((card: ICard) => {
      return <Card key={card.id} id={card.id} cardStatus={card.cardStatus} />;
    });
  }
}
