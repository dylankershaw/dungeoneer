/*
AKA dice roller
randomNonZeroInteger(20) => rolls a D20
*/
export function randomNonZeroInteger(max: number): number {
    return Math.floor(Math.random() * max) + 1;
}
