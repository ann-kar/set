export const colors = ['green', 'red', 'violet'] as const;
export const shapes = ['diamond', 'squiggle', 'stadium'] as const;
export const fills = ['blank', 'filled', 'shaded'] as const;
export const numbers = [1, 2, 3] as const;

export type Color = typeof colors[number];
export type Shape = typeof shapes[number];
export type Fill = typeof fills[number];
export type Number = typeof numbers[number];
export type Status = 'Card-active' | 'Card-inactive' | 'Card-accepted' | 'Card-rejected';

export type FeatureNames = 'color' | 'shape' | 'fill' | 'number';

export type Features = {
    color: Array<Color>,
    shape: Array<Shape>,
    fill: Array<Fill>,
    number: Array<Number>
}

export interface ICard {
    color: Color;
    shape: Shape;
    fill: Fill;
    number: Number;
    id: string;
    cardStatus: Status;
    children: any;
    handleCardClick?: any;
}

export interface ITabProps {
    label: string;
}
