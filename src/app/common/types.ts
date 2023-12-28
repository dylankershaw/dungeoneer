export interface Character {
    id: number;
    name: string;
    initiativeRoll: number;
    type: CharacterType;
}

export enum CharacterType {
    Player,
    NPC,
}

export interface Npc extends Character {
    race: string;
    raceNumber: number;
    statModifiers: StatModifiers;
    hp: number;
    armorClass: number;
}

export interface StatModifiers {
    [key: string]: number;
    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    cha: number;
}

export interface Player extends Character {
    isDowned: boolean
}
