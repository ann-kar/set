import React from "react";

import "./Card.scss";
import Symbol from "./Symbol/Symbol";
import { ICard } from "../../ts/types";
import { Utils } from "../../utils/utils";

function Card({ handleCardClick, id, cardStatus }: ICard): JSX.Element {
  const features = Utils.getCardFeaturesFromId(id);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    handleCardClick(e);
  };

  return (
    <div
      className={`Card ${cardStatus}`}
      data-id={id}
      onClick={(e) => handleClick(e)}>
      {features &&
        Array(features.number)
          .fill("0")
          .map(() => (
            <Symbol
              color={features.color}
              fill={features.fill}
              shape={features.shape}
            />
          ))}
    </div>
  );
}

export default Card;
