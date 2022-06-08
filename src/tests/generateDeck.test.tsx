import { ICard } from "../ts/types";
import { generateDeck } from "../utils/utils";

describe(generateDeck.name, () => {
  let deck: ICard[];

  beforeEach(() => {
    deck = generateDeck();
  });
  it("returns an array of 81 cards", () => {
    expect(deck.length).toBe(81);
  });

  it("returns an array of 81 unique cards", () => {
    const idsArray = deck.map((card: ICard) => card.id);
    expect(new Set([...idsArray]).size).toBe(81);
  });
});
