import { Character } from "../page";

export function Card(props: CardProps) {
    return (
        <div className="rounded-md bg-slate-500 m-4 w-96 p-2">
            <div className="flex justify-between">
                <h3 className="w-fit">{props.name}</h3>
                <button onClick={() => props.handleDelete(props.id)}>X</button>
            </div>
            <p>Initiative: {props.initiative}</p>
            <p>Race: {props.race}</p>
        </div>
    );
}

interface CardProps extends Character {
    handleDelete(id: number): void;
}
