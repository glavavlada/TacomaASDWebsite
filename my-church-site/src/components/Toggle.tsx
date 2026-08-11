type ToggleProps = {
    left: string;
    right: string;
    value: boolean;
    onChange: (value: boolean) => void;
    className?: string;
};

export default function Toggle({
    left,
    right,
    value,
    onChange,
    className = "",
}: ToggleProps) {
    return (
        <button
            className={`text-[var(--textLight)] shrink-0 relative flex cursor-pointer overflow-hidden rounded-full border-2 border-[var(--buttonDark)] bg-[var(--buttonDark)] p-1 hover:bg-[var(--hoverDark)]${className} ${value ? "right" : "left"}`}
            onClick={() => onChange(!value)}
            type="button"
        >
            <span className="slider" />
            <span className="relative z-10 px-2">{left}</span>
            <span className="relative z-10 px-2">{right}</span>
        </button>
    );
}