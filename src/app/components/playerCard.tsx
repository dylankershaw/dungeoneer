import { useState } from "react";
import { Player } from "../common/types";
import { DeleteConfirmationModal } from "./deleteConfirmationModal";

interface PlayerCardProps extends Player {
    handleDelete(id: number): void;
    setIsDowned(isDowned: boolean): void;
}

export function PlayerCard(props: PlayerCardProps) {
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    return (
        <div className="rounded-md bg-slate-500 m-4 w-80 p-2 h-36">
            {" "}
            <div className="flex justify-between">
                <span className="flex">
                    <p className="px-1 bg-green-400 h-fit">Player</p>
                    <p className="ml-2 w-fit font-bold">{props.name}</p>
                </span>
                {showDeleteConfirmation && (
                    <DeleteConfirmationModal
                        handleDelete={() => props.handleDelete(props.id)}
                        hideModal={() => setShowDeleteConfirmation(false)}
                    >
                        Delete {props.name}?
                    </DeleteConfirmationModal>
                )}
                <button
                    title="Delete player"
                    className="text-red-400 font-bold outline-1"
                    onClick={() => setShowDeleteConfirmation(true)}
                >
                    X
                </button>
            </div>
            <div className="bg-slate-400 px-1 mt-4 w-fit mx-auto">
                Initiative Roll: {props.initiativeRoll}
            </div>
            <div className="bg-slate-400 px-1 mt-4 w-fit mx-auto">
                <label>Is Downed?</label>
                <input
                    className="ml-2"
                    type="checkbox"
                    checked={props.isDowned}
                    onChange={(e) => props.setIsDowned(e.target.checked)}
                />
            </div>
            {props.isDowned && (
                <p className="text-8xl relative -top-24 opacity-75 text-red-400 w-fit m-auto pointer-events-none">
                    DOWN
                </p>
            )}
        </div>
    );
}