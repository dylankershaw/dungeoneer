import { CharacterType, Npc } from "../common/types";

export interface NpcCardProps extends Npc {
    handleDelete(id: number): void;
}

export function NpcCard(props: NpcCardProps) {
    return (
        <div className="rounded-md bg-slate-500 m-4 w-96 p-2">
            <div className="flex justify-between">
                <span className="flex">
                    <p className="w-fit font-bold">{`${props.name} (${props.race} #${props.raceNumber})`}</p>
                    <p className="ml-2 px-1 bg-red-400">NPC</p>
                </span>
                <button title="Delete NPC" className="text-red-400 font-bold outline-1" onClick={() => props.handleDelete(props.id)}>
                    X
                </button>
            </div>
            <div className="flex justify-between">
                <p>Initiative Roll: {props.initiativeRoll}</p>
                <p>AC: {props.armorClass}</p>
            </div>
            <p className="underline w-fit mx-auto">Stat Modifiers</p>
            <div className="flex flex-col flex-wrap h-12">
                {Object.keys(props.statModifiers).map((sm) => {
                    const value = props.statModifiers[sm];
                    return (
                        <div key={sm} className="w-fit">
                            {sm.toUpperCase()}: {value > 0 ? `+${value}` : value}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
