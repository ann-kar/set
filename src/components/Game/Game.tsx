import { useState, useEffect, useReducer } from "react";
import produce from "immer";

import { Button, Card, CardPanels, Timer } from "../../components";
import { ICard, ITabProps } from "../../ts/types";
import ButtonsWrapper from "../ButtonsWrapper/ButtonsWrapper";
import { Controller } from "../../controller/Controller";
import "./Game.scss";
import { visibleCardsReducer } from "../../reducers/visibleCardsReducer";

export const Game = ({ label }: ITabProps) => {
  const [deck, setDeck] = useState<Array<ICard>>([]);
  const [activeIds, setActiveIds] = useState<Array<string>>([]);
  const [visibleCards, dispatch] = useReducer(visibleCardsReducer, []);

  useEffect(() => {
    const newDeck = Controller.createDeck();
    setDeck(newDeck.slice(12));
    dispatch({ type: "initialized", cards: newDeck.slice(0, 12) });
  }, []);

  useEffect(() => {
    if (activeIds.length === 3) {
      const indices = activeIds.map((id) =>
        visibleCards.findIndex((card: ICard) => card.id === id)
      );
      Controller.check(activeIds as [string, string, string])
        ? acceptCards(indices)
        : rejectCards(indices);
      setActiveIds([]);
    }
  }, [activeIds]);

  const acceptCards = (indices: number[]) => {
    dispatch({ type: "accepted", indices: indices });
    setTimeout(() => {
      visibleCards.length <= 12 && deck.length >= 3
        ? replaceCards(indices)
        : removeCards(indices);
    }, 300);
  };

  const rejectCards = (indices: number[]) => {
    dispatch({ type: "rejected", indices: indices });
    setTimeout(() => {
      dispatch({ type: "inactivated", indices: indices });
    }, 300);
  };

  const handleCheckButton = () => {
    const set = Controller.checkAll(visibleCards.map((card: ICard) => card.id));
    set ? setActiveIds(set) : deck.length > 0 ? addCards() : end();
  };

  const end = () => {
    alert("you've reached the end!"); // TODO
  };

  const addCards = () => {
    dispatch({ type: "added", new: [deck[0], deck[1], deck[2]] });
    setDeck(deck.slice(3));
  };

  const replaceCards = (indices: Array<number>) => {
    dispatch({
      type: "replaced",
      indices: indices,
      new: [deck[0], deck[1], deck[2]],
    });
    setDeck(deck.slice(3));
  };

  const removeCards = (indices: Array<number>) => {
    dispatch({ type: "removed", indices: indices });
  };

  const handleCardClick = (cardId: string) => {
    if (activeIds.includes(cardId)) {
      setActiveIds(
        produce((draft) => draft.filter((id: string) => id !== cardId))
      );
    } else {
      setActiveIds(produce((draft) => [...draft, cardId]));
    }
    dispatch({ type: "clicked", cardId: cardId });
  };

  const renderVisibleCards = (cards: ICard[]) => {
    return cards.map((card: ICard) => {
      return (
        <Card
          key={card.id}
          id={card.id}
          handleCardClick={handleCardClick}
          cardStatus={card.cardStatus}
        />
      );
    });
  };

  return (
    <div className="Game" data-id={label}>
      <CardPanels cards={visibleCards} renderCards={renderVisibleCards} />
      <ButtonsWrapper>
        <Button onClick={handleCheckButton}>find set</Button>
        <Timer />
      </ButtonsWrapper>
    </div>
  );
};
