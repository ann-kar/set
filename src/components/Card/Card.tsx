import "./Card.scss";
import Symbol from "./Symbol/Symbol";
import { ICard } from "../../ts/types";
import { Utils } from "../../utils/utils";

function Card({ handleCardClick, id, cardStatus }: ICard): JSX.Element {
  const features = Utils.getCardFeaturesFromId(id);

  return (
    <div className={`Card ${cardStatus}`} onClick={() => handleCardClick(id)}>
      {Array.from(Array(parseInt(features.number))).map((number, i) => (
        <Symbol
          key={i}
          color={features.color}
          fill={features.fill}
          shape={features.shape}
        />
      ))}
    </div>
  );
}

export default Card;
