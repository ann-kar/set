import { mockDeck } from "../mocks/deck";
import { visibleCardsReducer } from "../reducers/visibleCardsReducer";
import { ICard } from "../ts/types";

describe(visibleCardsReducer.name, () => {

    it("shows the user the first 12 cards on startup", () => {
        const initialState: ICard[] = [];
        const result = visibleCardsReducer(initialState, {type:'initialized', cards:mockDeck.slice(0,12)});
        expect(result.length).toBe(12);
    });
    it("changes the status of 3 active cards to accepted when they make a set", () => {
        const initialState: ICard[] = mockDeck.slice(0,12);
        const result = visibleCardsReducer(initialState, {type:'accepted', indices:[1,2,6]});
        expect(result[1].cardStatus).toBe('Card-accepted');
        expect(result[6].cardStatus).toBe('Card-accepted');
        expect(result[0].cardStatus).toBe('Card-inactive');
        expect(result[4].cardStatus).toBe('Card-inactive');
    });

    it("changes the status of 3 active cards to rejected when they don't make a set", () => {
        const initialState: ICard[] = mockDeck.slice(0,12);
        const result = visibleCardsReducer(initialState, {type:'rejected', indices:[1,2,6]});
        expect(result[1].cardStatus).toBe('Card-rejected');
        expect(result[6].cardStatus).toBe('Card-rejected');
        expect(result[0].cardStatus).toBe('Card-inactive');
        expect(result[4].cardStatus).toBe('Card-inactive');
    });

    it("changes the status of 3 rejected cards to inactive when needed", () => {
        const initialState: ICard[] = mockDeck.slice(0,12);
        const result = visibleCardsReducer(initialState, {type:'inactivated', indices:[1,2,6]});
        expect(result[1].cardStatus).toBe('Card-inactive');
        expect(result[6].cardStatus).toBe('Card-inactive');
        expect(result[0].cardStatus).toBe('Card-inactive');
        expect(result[4].cardStatus).toBe('Card-inactive');
    });


});