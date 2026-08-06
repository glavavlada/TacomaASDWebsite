type ToggleProps = {
    left: string;
    right: string;
    value: boolean;
    onChange: (value: boolean) => void;
};

export default function Toggle({
    left,
    right,
    value,
    onChange,
}: ToggleProps) {
    return (
        <button
            className={`toggle ${value ? "right" : "left"}`}
            onClick={() => onChange(!value)}
            type="button"
        >
            <span className="slider" />
            <span className="option">{left}</span>
            <span className="option">{right}</span>
        </button>
    );
}