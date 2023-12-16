export interface Character {
    id: number;
    name: string;
    initiativeRoll: number;
    type: CharacterType;
    armorClass: number;
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

export interface PlayerCharacter extends Character {
    playerName: string;
}
