import { useState, useEffect } from "react";
import produce from "immer";

import { Button, Card, CardPanels, Timer } from "../../components";
import { ICard, ITabProps } from "../../ts/types";
import ButtonsWrapper from "../ButtonsWrapper/ButtonsWrapper";
import { Controller } from "../../controller/Controller";
import "./Game.scss";

export const Game = ({ label }: ITabProps) => {
  const [deck, setDeck] = useState<Array<ICard>>([]);
  const [activeIds, setActiveIds] = useState<Array<string>>([]);
  const [visibleCards, setVisibleCards] = useState<Array<ICard>>([]);

  useEffect(() => {
    const newDeck = Controller.createDeck();
    setDeck(newDeck.slice(12));
    setVisibleCards(newDeck.slice(0, 12));
  }, []);

  useEffect(() => {
    if (activeIds.length === 3) {
      const indices = activeIds.map((id) =>
        visibleCards.findIndex((card) => card.id === id)
      );
      Controller.check(activeIds as [string, string, string])
        ? acceptCards(indices)
        : rejectCards(indices);
      setActiveIds([]);
    }
  }, [activeIds]);

  const acceptCards = (indices: number[]) => {
    setVisibleCards(
      produce((draft) => {
        for (const i of indices) draft[i].cardStatus = "Card-accepted";
      })
    );
    setTimeout(() => {
      visibleCards.length <= 12 && deck.length >= 3
        ? replaceCards(indices)
        : removeCards(indices);
    }, 300);
  };

  const rejectCards = (indices: number[]) => {
    setVisibleCards(
      produce((draft) => {
        for (const i of indices) draft[i].cardStatus = "Card-rejected";
      })
    );
    setTimeout(() => {
      setVisibleCards(
        produce((draft) => {
          for (const i of indices) draft[i].cardStatus = "Card-inactive";
        })
      );
    }, 300);
  };

  const handleCheckButton = () => {
    const set = Controller.checkAll(visibleCards.map((card) => card.id));
    set ? setActiveIds(set) : deck.length > 0 ? addCards() : end();
  };

  const end = () => {
    alert("you've reached the end!"); // TODO
  };

  const addCards = () => {
    setVisibleCards(produce((draft) => [...draft, deck[0], deck[1], deck[2]]));
    setDeck(deck.slice(3));
  };

  const replaceCards = (indices: Array<number>) => {
    setVisibleCards(
      produce((draft) => {
        draft[indices[0]] = deck[0];
        draft[indices[1]] = deck[1];
        draft[indices[2]] = deck[2];
      })
    );
    setDeck(deck.slice(3));
  };

  const removeCards = (indices: Array<number>) => {
    setVisibleCards(
      produce((draft) => draft.filter((card, i) => !indices.includes(i)))
    );
  };

  const handleCardClick = (cardId: string) => {
    if (activeIds.includes(cardId)) {
      setActiveIds(
        produce((draft) => draft.filter((id: string) => id !== cardId))
      );
    } else {
      setActiveIds(produce((draft) => [...draft, cardId]));
    }

    setVisibleCards(
      produce((draft) => {
        const i = draft.findIndex((card) => card.id === cardId);
        if (draft[i].cardStatus === "Card-inactive") {
          draft[i].cardStatus = "Card-active";
        } else {
          draft[i].cardStatus = "Card-inactive";
        }
      })
    );
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
}
