interface AdderInputProps {
    name: string;
    value: string | number;
    setter(value: string): void;
}

export function AdderInput(props: AdderInputProps) {
    const { name, value, setter } = props;
    return (
        <div>
            <label htmlFor={name}>{name}</label>
            <input name={name} value={value} onChange={(e) => setter(e.target.value)} className="text-slate-900 p-1" />
        </div>
    );
}
