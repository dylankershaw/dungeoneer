"use client";

// TODO: add playerAdder

import { useState, useEffect } from "react";
import { NpcCard } from "./components/npcCard";
import { NpcAdder } from "./components/npcAdder";
import { Character, CharacterType, Npc } from "./common/types";

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
    }, [characters]);

    function deleteCharacter(id: number) {
        const newCharacters = characters.filter((c) => c.id !== id);
        setCharacters(newCharacters);
    }

    return (
        <div>
            <div className="flex justify-between">
                <NpcAdder characters={characters} setCharacters={setCharacters} />
                <button className="h-fit text-red-400 font-bold m-4 p-1 border-solid border-2 border-red-400" onClick={() => setCharacters([])}>
                    Delete All Characters
                </button>
            </div>
            <div className="flex flex-wrap">
                {sortedCharacters.map((char) => {
                    return char.type === CharacterType.NPC ? <NpcCard key={char.id} {...char} handleDelete={deleteCharacter} /> : "player";
                })}
            </div>
        </div>
    );
}

function getCharactersFromLocalStorage(): Character[] {
    if (typeof window === "undefined") return [];
    const characterData = localStorage.getItem("characters");
    return characterData ? JSON.parse(characterData) : [];
}

function sortCharacters(characters: Character[]) {
    return characters.sort((a, b) => {
        if (b.initiativeRoll - a.initiativeRoll !== 0) return b.initiativeRoll - a.initiativeRoll; // desc. sort on initiativeRoll
        else if (a.type === CharacterType.Player && b.type === CharacterType.NPC) return -1; // priority to player
        else if (a.type === CharacterType.NPC && b.type === CharacterType.Player) return 1; // priority to player
        else return a.id - b.id; // if initiativeRoll and type are the same, sort based on ID
    });
}
