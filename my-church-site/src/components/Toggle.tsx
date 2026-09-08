// Toggle type definition
type ToggleProps = {
    left: React.ReactNode;
    right: React.ReactNode;
    value: boolean;
    // sets the new toggle value for the parent
    onChange: (value: boolean) => void;
    // optional className for additional styling
    className?: string;
};

// Toggle component definition and props destructuring
export default function Toggle({
    left,
    right,
    value,
    onChange,
    className = "",
}: ToggleProps) { // checks that the props match the definition
    return (
        <button
            className={`text-[var(--textLight)] shrink-0 relative flex items-center cursor-pointer overflow-hidden rounded-full border-2 border-[var(--buttonDark)] bg-[var(--buttonDark)] p-2 hover:bg-[var(--hoverDark)]
                ${className} {/* applies optional classes */}
                ${value ? "right" : "left"} {/* applies the right or left css class based on the value */}
                `}
            // flips the value on click and updates the parent
            onClick={() => onChange(!value)}
            // HTML element type
            type="button"
        >
            {/* moving slider element */}
            <span className="slider" />
            {/* left and right labels */}
            <span className="relative z-10 px-2">{left}</span>
            <span className="relative z-10 px-2">{right}</span>
        </button>
    );
}