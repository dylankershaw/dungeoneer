import { CharacterType, Npc } from "../common/types";
import { Input } from "./input";

export interface NpcCardProps extends Npc {
    handleDelete(id: number): void;
    setHp(hp: string): void;
}

export function NpcCard(props: NpcCardProps) {
    return (
        <div className="rounded-md bg-slate-500 m-4 w-80 p-2 h-36">
            <div className="flex justify-between">
                <span className="flex">
                    <p className="px-1 bg-red-400 h-fit">NPC</p>
                    <p className="ml-2 w-fit font-bold">{`${props.name} (${props.race} #${props.raceNumber})`}</p>
                </span>
                <button
                    title="Delete NPC"
                    className="text-red-400 font-bold outline-1"
                    onClick={() => props.handleDelete(props.id)}
                >
                    X
                </button>
            </div>
            <div className="flex justify-between items-center">
                <p className="bg-slate-400 px-1 ml-1">
                    Initiative Roll: {props.initiativeRoll}
                </p>
                <div className="flex items-center">
                    <p className="bg-slate-400 px-1">AC: {props.armorClass}</p>
                    <Input
                        name="HP"
                        value={props.hp}
                        type="number"
                        setter={props.setHp}
                        containerClassName="ml-4 bg-slate-400 px-1"
                    />
                </div>
            </div>
            <p className="underline w-fit mx-auto bg-slate-400 px-1 mt-1">
                Stat Modifiers
            </p>
            <div className="flex flex-col flex-wrap h-12 bg-slate-400 items-center">
                {Object.keys(props.statModifiers).map((sm) => {
                    const value = props.statModifiers[sm];
                    return (
                        <div key={sm} className="w-fit">
                            {sm.toUpperCase()}:{" "}
                            {value > 0 ? `+${value}` : value}
                        </div>
                    );
                })}
            </div>
            {props.hp <= 0 && (
                <p className="text-8xl relative -top-28 opacity-75 text-red-400 w-fit m-auto pointer-events-none">
                    DEAD
                </p>
            )}
        </div>
    );
}
