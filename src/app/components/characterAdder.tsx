import { Character } from "../page";

export function CharacterAdder(props: CharacterAdderProps) {
    function handleAddCharacter(): void {
        const newCharacter: Character = {
            id: Math.floor(Math.random() * 10000000000),
            name: "name",
            race: "goblin",
            initiative: 1,
        };

        props.setCharacters([...props.characters, newCharacter]);
    }

    return (
        <div>
            <button onClick={handleAddCharacter}>add card</button>
        </div>
    );
}

interface CharacterAdderProps {
    characters: Character[];
    setCharacters(characters: Character[]): void;
}
