import { useState, useEffect, FormEvent } from "react";

import npcNames from "../data/npcNames.json";
import { Input } from "./input";
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
    const [hp, setHp] = useState<number>(10);
    const [statModifiers, setStatModifiers] =
        useState<StatModifiers>(DEFAULT_STATS);

    useEffect(() => {
        randomizeName();
    }, []);

    function randomizeName() {
        setName(getRandomNpcName());
    }

    function handleAddNpc(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        const newNpc: Npc = {
            id: randomNonZeroInteger(10000000000),
            type: CharacterType.NPC,
            name,
            race,
            raceNumber: getRaceCount(race) + 1,
            initiativeRoll: randomNonZeroInteger(20) + statModifiers.dex,
            armorClass,
            statModifiers,
            hp,
            notes: ""
        };

        props.setCharacters([...props.characters, newNpc]);
        incrementRaceCount(race);
        randomizeName();
    }

    return (
        <form
            onSubmit={handleAddNpc}
            className="mt-4 flex flex-wrap bg-slate-500 w-fit p-1 rounded-md items-center"
        >
            <Input name="Name" setter={setName} value={name} />
            <Input name="Race" setter={setRace} value={race} />
            <Input
                type="number"
                name="AC"
                setter={(ac: string) => setArmorClass(parseInt(ac) || 0)}
                value={armorClass}
            />
            <Input
                type="number"
                name="HP"
                setter={(hp: string) => setHp(parseInt(hp) || 0)}
                value={hp}
            />
            {Object.keys(statModifiers).map((sm) => {
                return (
                    <Input
                        type="number"
                        key={sm}
                        name={sm.toUpperCase()}
                        setter={(value: string) =>
                            setStatModifiers({
                                ...statModifiers,
                                [sm]: parseInt(value) || 0,
                            })
                        }
                        value={statModifiers[sm]}
                    />
                );
            })}
            <button
                type="submit"
                className="font-bold border-solid border-2 p-1 m-1 text-green-400 border-green-400"
            >
                Add NPC
            </button>
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
    raceCounts[normalizedRace]
        ? (raceCounts[normalizedRace] += 1)
        : (raceCounts[normalizedRace] = 1);
    localStorage.setItem("raceCounts", JSON.stringify(raceCounts));
}
