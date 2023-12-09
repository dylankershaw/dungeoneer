"use client";

import { useState, useEffect } from "react";
import { Card } from "./components/card";
import { CharacterAdder } from "./components/characterAdder";

export default function Page() {
    const [characters, setCharacters] = useState<Character[]>(getCardsFromLocalStorage());
    function getCardsFromLocalStorage(): Character[] {
        if (typeof window === "undefined") return [];
        const cardsData = localStorage.getItem("cards");
        return cardsData ? JSON.parse(cardsData) : [];
    }

    useEffect(() => {
        if (typeof window !== "undefined") {
            // TODO: sort characters by initiative
            localStorage.setItem("characters", JSON.stringify(characters));
        }
    }, [characters]);

    function deleteCharacter(id: number) {
        const newCharacters = characters.filter((c) => c.id !== id);
        setCharacters(newCharacters);
    }

    return (
        <div>
            <CharacterAdder characters={characters} setCharacters={setCharacters} />
            <div className="flex flex-wrap">
                {characters.map((Character) => {
                    return <Card key={Character.id} {...Character} handleDelete={deleteCharacter} />;
                })}
            </div>
        </div>
    );
}

export interface Character {
    id: number;
    name: string;
    race: string;
    initiative: number;
}
