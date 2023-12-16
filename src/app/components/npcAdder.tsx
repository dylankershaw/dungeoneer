import { useState, useEffect, FormEvent } from "react";

import npcNames from "../data/npcNames.json";
import { AdderInput } from "./adderInput";
import { randomNonZeroInteger } from "../common/utils";
import { Character, CharacterType, Npc, StatModifiers } from "../common/types";

interface NpcAdderProps {
    characters: Character[];
    setCharacters(characters: Character[]): void;
}

export function NpcAdder(props: NpcAdderProps) {
    const [name, setName] = useState<string>("");
    const [race, setRace] = useState<string>("Goblin");
    const [initiativeRoll, setInitiativeRoll] = useState<number>(0);
    const [armorClass, setArmorClass] = useState<number>(10);
    const [statModifiers, setStatModifiers] = useState<StatModifiers>(DEFAULT_STATS);

    useEffect(() => {
        randomizeStats();
    }, []);

    function randomizeStats() {
        setName(getRandomNpcName());
        setInitiativeRoll(randomNonZeroInteger(20));
    }

    function handleAddNpc(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        const newNpc: Npc = {
            id: randomNonZeroInteger(10000000000),
            type: CharacterType.NPC,
            name,
            race,
            raceNumber: getRaceCount(race) + 1,
            initiativeRoll,
            armorClass,
            statModifiers,
        };

        props.setCharacters([...props.characters, newNpc]);
        incrementRaceCount(race);
        randomizeStats();
    }

    return (
        <form onSubmit={handleAddNpc} className="m-4">
            <AdderInput name="name" setter={setName} value={name} />
            <AdderInput name="race" setter={setRace} value={race} />
            <AdderInput name="AC" setter={(ac) => setArmorClass(parseInt(ac) || 0)} value={armorClass} />
            {Object.keys(statModifiers).map((sm) => {
                return <AdderInput key={sm} name={sm} setter={(value) => setStatModifiers({ ...statModifiers, [sm]: parseInt(value) || 0 })} value={statModifiers[sm]} />;
            })}
            <button type="submit">add NPC</button>
        </form>
    );
}

const DEFAULT_STATS: StatModifiers = {
    str: 0,
    dex: 0,
    con: 0,
    int: 0,
    wis: 0,
    cha: 0,
};

function getRandomNpcName(): string {
    const randI = Math.floor(Math.random() * npcNames.length);
    return npcNames[randI];
}

function getRaceCountsFromLocalStorage(): Record<string, number> {
    const raceCountsData = localStorage.getItem("raceCounts");
    return raceCountsData ? JSON.parse(raceCountsData) : {};
}

function getRaceCount(race: string): number {
    return getRaceCountsFromLocalStorage()[race.toLowerCase()] || 0;
}

function incrementRaceCount(race: string): void {
    const normalizedRace = race.toLowerCase();
    const raceCounts = getRaceCountsFromLocalStorage();
    raceCounts[normalizedRace] ? (raceCounts[normalizedRace] += 1) : (raceCounts[normalizedRace] = 1);
    localStorage.setItem("raceCounts", JSON.stringify(raceCounts));
}
