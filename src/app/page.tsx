"use client";

import { useState, useEffect } from "react";
import { NpcCard } from "./components/npcCard";
import { NpcAdder } from "./components/npcAdder";
import { Character, CharacterType, Npc, Player } from "./common/types";
import { DeleteButtons } from "./components/deleteButtons";
import { PlayerAdder } from "./components/playerAdder";
import { PlayerCard } from "./components/playerCard";

export default function Page() {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);
    const sortedCharacters = sortCharacters(characters);

    useEffect(() => {
        const localStorageCharacters = getCharactersFromLocalStorage();
        setCharacters(localStorageCharacters);
        setIsFirstLoad(false);
    }, []);

    useEffect(() => {
        if (typeof window === "undefined" || isFirstLoad) return;
        if (characters.length === 0) localStorage.removeItem("raceCounts");
        localStorage.setItem("characters", JSON.stringify(characters));
    }, [characters, isFirstLoad]);

    function deleteCharacter(id: number) {
        const newCharacters = characters.filter((c) => c.id !== id);
        setCharacters(newCharacters);
    }

    function statSetterGenerator<T>(id: number, statName: string) {
        return (statValue: T) => {
            const newCharacters = characters.map((c) => {
                if (c.id === id) {
                    const newCharacter = { ...c, [statName]: statValue };
                    return newCharacter;
                } else return c;
            });
            setCharacters(newCharacters);
        };
    }

    return (
        <>
            <div className="flex justify-between">
                <div className="m-4">
                    <PlayerAdder
                        characters={characters}
                        setCharacters={setCharacters}
                    />
                    <NpcAdder
                        characters={characters}
                        setCharacters={setCharacters}
                    />
                </div>
                <span className="flex flex-col">
                    <DeleteButtons
                        characters={characters}
                        setCharacters={setCharacters}
                    />
                </span>
            </div>
            <div className="flex flex-wrap">
                {sortedCharacters.map((char) => {
                    const setHp = statSetterGenerator(char.id, "hp");
                    const setNotes = statSetterGenerator(char.id, "notes");
                    const setIsDowned = statSetterGenerator(
                        char.id,
                        "isDowned"
                    );

                    const setInitiativeRoll = statSetterGenerator(
                        char.id,
                        "initiativeRoll"
                    );

                    return char.type === CharacterType.NPC ? (
                        <NpcCard
                            key={char.id}
                            {...(char as Npc)}
                            handleDelete={deleteCharacter}
                            setHp={setHp}
                            setNotes={setNotes}
                        />
                    ) : (
                        <PlayerCard
                            key={char.id}
                            {...(char as Player)}
                            handleDelete={deleteCharacter}
                            setIsDowned={setIsDowned}
                            setNotes={setNotes}
                            setInitiativeRoll={setInitiativeRoll}
                        />
                    );
                })}
            </div>
        </>
    );
}

function getCharactersFromLocalStorage(): Character[] {
    if (typeof window === "undefined") return [];
    const characterData = localStorage.getItem("characters");
    return characterData ? JSON.parse(characterData) : [];
}

function sortCharacters(characters: Character[]) {
    return characters.sort((a, b) => {
        if (b.initiativeRoll - a.initiativeRoll !== 0) {
            // desc. sort on initiativeRoll
            return b.initiativeRoll - a.initiativeRoll;
        } else if (
            a.type === CharacterType.Player &&
            b.type === CharacterType.NPC
        ) {
            // priority to player
            return -1;
        } else if (
            a.type === CharacterType.NPC &&
            b.type === CharacterType.Player
        ) {
            // priority to player
            return 1;
        } else {
            // if initiativeRoll and type are the same, sort based on ID
            return a.id - b.id;
        }
    });
}
