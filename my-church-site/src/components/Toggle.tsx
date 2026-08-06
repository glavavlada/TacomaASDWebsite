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
            className={`relative flex cursor-pointer overflow-hidden rounded-full border-2 border-[var(--earth)] bg-[var(--buttonDark)] p-1 hover:bg-[var(--hoverDark)] ${value ? "right" : "left"}`}
            onClick={() => onChange(!value)}
            type="button"
        >
            <span className="slider" />
            <span className="relative z-10 px-2">{left}</span>
            <span className="relative z-10 px-2">{right}</span>
        </button>
    );
}