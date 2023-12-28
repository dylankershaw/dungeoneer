import { useState } from "react";
import { Player } from "../common/types";

interface PlayerCardProps extends Player {
    handleDelete(id: number): void;
    setIsDowned(isDowned: boolean): void;
}

export function PlayerCard(props: PlayerCardProps) {
    return (
        <div className="rounded-md bg-slate-500 m-4 w-80 p-2 h-36">
            {" "}
            <div className="flex justify-between">
                <span className="flex">
                    <p className="px-1 bg-green-400 h-fit">Player</p>
                    <p className="ml-2 w-fit font-bold">{props.name}</p>
                </span>
                <button
                    title="Delete NPC"
                    className="text-red-400 font-bold outline-1"
                    onClick={() => props.handleDelete(props.id)}
                >
                    X
                </button>
            </div>
            <div className="bg-slate-400 px-1 mt-4 w-fit mx-auto">
                Initiative Roll: {props.initiativeRoll}
            </div>
            <div className="bg-slate-400 px-1 mt-4 w-fit mx-auto">
                <label>Is Downed?</label>
                {/* TODO: make this clickable while downed */}
                <input
                    className="ml-2"
                    type="checkbox"
                    checked={props.isDowned}
                    onChange={(e) => props.setIsDowned(e.target.checked)}
                />
            </div>
            {props.isDowned && (
                <p className="text-8xl relative -top-24 opacity-75 text-red-400 w-fit m-auto">
                    DOWN
                </p>
            )}
        </div>
    );
}
