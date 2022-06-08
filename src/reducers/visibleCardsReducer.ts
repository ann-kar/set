import produce from "immer";
import { ICard } from "../ts/types";

export function visibleCardsReducer(cards: ICard[], action: any) {
    switch (action.type) {
        case "initialized": {
            return action.cards;
        }
        case "accepted": {
            return produce(cards, (draft) => {
                for (const i of action.indices) draft[i].cardStatus = "Card-accepted";
            });
        }
        case "rejected": {
            return produce(cards, (draft) => {
                for (const i of action.indices) draft[i].cardStatus = "Card-rejected";
            });
        }
        case "inactivated": {
            return produce(cards, (draft) => {
                for (const i of action.indices) draft[i].cardStatus = "Card-inactive";
            });
        }
        case "added": {
            return produce(cards, (draft) => [
                ...draft,
                action.new[0],
                action.new[1],
                action.new[2],
            ]);
        }
        case "replaced": {
            return produce(cards, (draft) => {
                draft[action.indices[0]] = action.new[0];
                draft[action.indices[1]] = action.new[1];
                draft[action.indices[2]] = action.new[2];
            });
        }
        case "removed": {
            return produce(cards, (draft) =>
                draft.filter((card: ICard, i: number) => !action.indices.includes(i))
            );
        }
        case "clicked": {
            return produce(cards, (draft) => {
                const i = draft.findIndex((card: ICard) => card.id === action.cardId);
                if (draft[i].cardStatus === "Card-inactive") {
                    draft[i].cardStatus = "Card-active";
                } else {
                    draft[i].cardStatus = "Card-inactive";
                }
            });
        }

        default: {
            throw Error("Unknown action: " + action.type);
        }
    }
}
