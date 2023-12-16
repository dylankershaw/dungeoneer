interface Input {
    name: string;
    value: string | number;
    type?: string;
    setter(value: string): void;
    containerClassName?: string;
}

export function Input(props: Input) {
    const { name, value, type = "text", setter, containerClassName = "mr-6" } = props;
    const id = `input-${name}`;
    const inputWidth = type === "number" ? "w-10" : "w-32";
    return (
        <div className={containerClassName}>
            <label htmlFor={id}>{name}</label>
            <input id={id} type={type} value={value} onChange={(e) => setter(e.target.value)} className={"text-slate-900 m-1 px-1" + " " + inputWidth} />
        </div>
    );
}
