
type Color = 'green' | 'red' | 'violet';
type Shape = 'diamond' | 'squiggle' | 'stadium';
type Fill = 'blank' | 'filled' | 'shaded';
type Number = 1 | 2 | 3;
type Status = 'Card-active' | 'Card-inactive' | 'Card-accepted' | 'Card-rejected';

type FeatureNames = 'color' | 'shape' | 'fill' | 'number';

type Features = {
    color: Array<Color>,
    shape: Array<Shape>,
    fill: Array<Fill>,
    number: Array<Number>
}

interface ICard {
    color: Color;
    shape: Shape;
    fill: Fill;
    number: Number;
    id: string;
    cardStatus: Status;
    children: any;
    handleCardClick?: any;
}

interface ITabProps {
    label: string;
}

export type {Color, Shape, Features, FeatureNames, Fill, Number, Status, ICard, ITabProps};
