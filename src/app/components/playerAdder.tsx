import { FormEvent, useState } from "react";
import { Character, CharacterType, Player } from "../common/types";
import { Input } from "./input";
import { randomNonZeroInteger } from "../common/utils";

interface PlayerAdderProps {
    characters: Character[];
    setCharacters(characters: Character[]): void;
}

export function PlayerAdder(props: PlayerAdderProps) {
    const [characterName, setCharacterName] = useState("");
    const [initiativeRoll, setInitiativeRoll] = useState(0);

    function handleAddPlayer(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        const newPlayer: Player = {
            id: randomNonZeroInteger(10000000000),
            type: CharacterType.Player,
            name: characterName,
            initiativeRoll,
            isDowned: false,
        };

        props.setCharacters([...props.characters, newPlayer]);
        setCharacterName("");
        setInitiativeRoll(0);
    }

    return (
        <form
            className="flex bg-slate-500 p-1 rounded-md items-center w-fit"
            onSubmit={handleAddPlayer}
        >
            <Input
                name="Character Name"
                setter={setCharacterName}
                value={characterName}
            />
            <Input
                name="Initiative Roll"
                setter={(ir: string) => setInitiativeRoll(parseInt(ir) || 0)}
                value={initiativeRoll}
                type="number"
            />
            <button
                className="font-bold border-solid border-2 p-1 m-1 text-green-400 border-green-400"
                type="submit"
            >
                add player
            </button>
        </form>
    );
}
