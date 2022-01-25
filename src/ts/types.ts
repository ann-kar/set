
type Color = 'green' | 'red' | 'violet';
type Shape = 'diamond' | 'squiggle' | 'stadium';
type Fill = 'blank' | 'filled' | 'shaded';
type Number = 1 | 2 | 3;
type Status = 'Card-active' | 'Card-inactive' | 'Card-accepted' | 'Card-rejected';

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

export type {Color, Shape, Fill, Number, Status, ICard};
