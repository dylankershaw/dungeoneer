import { CharacterType, Npc } from "../common/types";

export interface NpcCardProps extends Npc {
    handleDelete(id: number): void;
}

export function NpcCard(props: NpcCardProps) {
    return (
        <div className="rounded-md bg-slate-500 m-4 w-96 p-2">
            <div className="flex justify-between">
                <h3 className="w-fit">{`${props.name} (${props.race} #${props.raceNumber})`}</h3>
                <button onClick={() => props.handleDelete(props.id)}>X</button>
            </div>
            NPC
            <p>initiative roll: {props.initiativeRoll}</p>
            <p>armor class: {props.armorClass}</p>
            <div>
                Stat Modifiers
                {Object.keys(props.statModifiers).map((sm) => {
                    return (
                        <div key={sm}>
                            {sm}: {props.statModifiers[sm]}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
