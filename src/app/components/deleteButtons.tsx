import { Character, CharacterType } from "../common/types";

interface DeleteButtonsProps {
    setCharacters(characters: Character[]): void;
    characters: Character[];
}

export function DeleteButtons({
    setCharacters,
    characters,
}: DeleteButtonsProps) {
    function deleteAllCharacters() {
        setCharacters([]);
    }

    function deleteNpcs() {
        const newCharacters = characters.filter(
            (c) => c.type !== CharacterType.NPC
        );
        setCharacters(newCharacters);
    }

    return (
        <>
            <button className={CLASS_NAMES} onClick={deleteAllCharacters}>
                Delete All Characters
            </button>
            <button className={CLASS_NAMES} onClick={deleteNpcs}>
                Delete NPCs Only
            </button>
        </>
    );
}

const CLASS_NAMES =
    "h-fit text-red-400 font-bold mt-2 mr-2 p-1 border-solid border-2 border-red-400";
