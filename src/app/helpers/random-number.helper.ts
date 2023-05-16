export const randomInteger = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min + 1)) + min;

export const randomNumber = (min: number, max: number): number =>
    Math.random() * (max - min) + min;
