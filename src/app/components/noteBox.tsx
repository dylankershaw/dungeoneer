import { useState } from "react";

interface TextboxProps {
    notes: string;
    setNotes(notes: string): void;
}

export function NoteBox(props: TextboxProps) {
    const [showTextbox, setShowTextbox] = useState(false);

    function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        e.preventDefault();
        props.setNotes(e.target.value);
    }

    return (
        <>
            <button
                onClick={() => setShowTextbox(!showTextbox)}
                className=" font-bold text-orange-200"
            >
                Notes
            </button>
            {showTextbox && (
                <textarea
                    rows={5}
                    cols={33}
                    placeholder="add notes here"
                    className="absolute text-slate-800 mt-6 opacity-85 bg-slate-200 z-20"
                    value={props.notes}
                    onChange={handleInputChange}
                />
            )}
        </>
    );
}
