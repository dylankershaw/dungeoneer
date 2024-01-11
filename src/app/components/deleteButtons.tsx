import { useState } from "react";
import { Character, CharacterType } from "../common/types";
import { DeleteConfirmationModal } from "./deleteConfirmationModal";

interface DeleteButtonsProps {
    setCharacters(characters: Character[]): void;
    characters: Character[];
}

// TODO: add confirmation prompts for delete
export function DeleteButtons({
    setCharacters,
    characters,
}: DeleteButtonsProps) {
    const [showDeleteAllConfirmation, setShowDeleteAllConfirmation] =
        useState(false);
    const [showDeleteNpcsConfirmation, setShowDeleteNpcsConfirmation] =
        useState(false);

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
            {showDeleteAllConfirmation && (
                <DeleteConfirmationModal
                    handleDelete={deleteAllCharacters}
                    hideModal={() => setShowDeleteAllConfirmation(false)}
                >
                    Delete all characters?
                </DeleteConfirmationModal>
            )}
            {showDeleteNpcsConfirmation && (
                <DeleteConfirmationModal
                    handleDelete={deleteNpcs}
                    hideModal={() => setShowDeleteNpcsConfirmation(false)}
                >
                    Delete all NPCs?
                </DeleteConfirmationModal>
            )}
            <button
                className={CLASS_NAMES}
                onClick={() => setShowDeleteAllConfirmation(true)}
            >
                Delete All Characters
            </button>
            <button
                className={CLASS_NAMES}
                onClick={() => setShowDeleteNpcsConfirmation(true)}
            >
                Delete NPCs Only
            </button>
        </>
    );
}

const CLASS_NAMES =
    "h-fit text-red-400 font-bold mt-4 mr-4 p-1 border-solid border-2 border-red-400";
