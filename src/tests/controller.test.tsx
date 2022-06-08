import { Controller } from "../controller/Controller";
import { ICard } from "../ts/types";

describe(Controller.name, () => {

  describe(Controller.createDeck.name, () => {
    let deck: ICard[];

    beforeEach(() => {
      deck = Controller.createDeck();
    });
    it("returns an array of 81 cards", () => {
      expect(deck.length).toBe(81);
    });

    it("returns an array of 81 unique cards", () => {
      const idsArray = deck.map((card: ICard) => card.id);
      expect(new Set([...idsArray]).size).toBe(81);
    });
  });


  describe(Controller.check.name, () => {
    it("recognizes that 3 cards with the same color, shape & fill, but different numbers, make a set", () => {
      const result = Controller.check([
        "red-squiggle-filled-0",
        "red-squiggle-filled-1",
        "red-squiggle-filled-2",
      ]);
      expect(result).toBe(true);
    });

    it("recognizes that 2 squiggles and 1 diamond don't make a set", () => {
      const result = Controller.check([
        "red-squiggle-filled-0",
        "red-squiggle-filled-1",
        "red-diamond-filled-2",
      ]);
      expect(result).toBe(false);
    });

    it("recognizes that 2 reds and 1 green don't make a set", () => {
      const result = Controller.check([
        "red-squiggle-filled-0",
        "green-squiggle-filled-1",
        "red-squiggle-filled-2",
      ]);
      expect(result).toBe(false);
    });
  });

  describe(Controller.checkAll.name, () => {
    it("selects the three cards that make a set", () => {
      const result = Controller.checkAll([
        "green-diamond-filled-1",
        "green-diamond-filled-1",
        "violet-diamond-shaded-1",
        "violet-diamond-filled-1",
        "red-squiggle-filled-0",
        "red-squiggle-filled-1",
        "red-squiggle-filled-2",
        "violet-diamond-filled-2",
        "red-squiggle-shaded-0",
        "red-stadium-shaded-2",
        "red-squiggle-shaded-0",
        "red-stadium-shaded-0",
      ]);
      expect(result).toEqual(expect.arrayContaining([
        "red-squiggle-filled-0",
        "red-squiggle-filled-1",
        "red-squiggle-filled-2",
      ]));
    });

    it("returns null when there is no set", () => {
      const result = Controller.checkAll([
        "green-diamond-filled-1",
        "green-diamond-filled-1",
        "violet-diamond-shaded-1",
        "violet-diamond-filled-1",
        "red-squiggle-filled-0",
        "red-squiggle-blank-2",
        "red-squiggle-filled-2",
        "violet-diamond-filled-2",
        "red-squiggle-shaded-0",
        "red-stadium-shaded-2",
        "red-squiggle-shaded-0",
        "red-stadium-shaded-0",
      ]);
      expect(result).toBe(null);
    });
  });
});
