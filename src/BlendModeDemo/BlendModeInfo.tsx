export interface BlendModeInfo {
    mode: string;
    shortcut: string;
    name: string;
    description: string;
    skip?: boolean;
}

export function suggestedStartingBlendMode(): BlendModeInfo {
    const found = createBlendModeInfos().find(bmi => bmi.mode === "multiply");
    if (!found) {
        throw new Error("can't find suggested blend mode");
    }
    return found;
}
export function createBlendModeInfos(): BlendModeInfo[] {
    const raws: [string, string, string, string, boolean?][] = [
        [
            "soft-light",
            "1",
            "SOFT_LIGHT",
            "Mix of DARKEST and LIGHTEST.  Works like OVERLAY, but not as harsh."
        ],
        [
            "hard-light",
            "2",
            "HARD_LIGHT",
            "SCREEN when greater than 50% gray, MULTIPLY when lower."
        ],
        [
            "source-over",
            "3",
            "BLEND",
            "Default.  Linear interpolation of colours (default)"
        ],
        [
            "multiply",
            "4",
            "MULTIPLY",
            "Multiply the colors, result will always be darker."
        ],
        [
            "screen",
            "5",
            "SCREEN",
            "Opposite multiply, uses inverse values of the colors."
        ],
        [
            "color-burn",
            "6",
            "BURN",
            "Darker areas are applied, increasing contrast, ignores lights."
        ],
        [
            "color-dodge",
            "7",
            "DODGE",
            "Lightens light tones and increases contrast, ignores darks."
        ],
        [
            "overlay",
            "8",
            "OVERLAY",
            "Mix of MULTIPLY and SCREEN.  Multiplies dark values, and screens light values."
        ],
        [
            "lighter",
            "9",
            "ADD",
            "Sum of A and B"
        ],
        [
            "darken",
            "0",
            "DARKEST",
            "Only the darkest colour succeeds"
        ],
        [
            "lighten",
            "-",
            "LIGHTEST",
            "Only the lightest colour succeeds"
        ],
        [
            "difference",
            "=",
            "DIFFERENCE",
            "Subtract colors from underlying image."
        ],
        [
            "exclusion",
            "q",
            "EXCLUSION",
            "Similar to DIFFERENCE, but less extreme.",
            true
        ],
        [
            "copy",
            "w",
            "REPLACE",
            "The pixels entirely replace the others and don't utilize alpha (transparency) values.",
            true
        ],
        [
            "destination-out",
            "e",
            "REMOVE",
            "Removes pixels from B with the alpha strength of A.",
            true
        ]
    ];
    return raws.map(([mode, shortcut, name, description, skip]) => {
        return {
            mode,
            shortcut,
            name,
            description,
            skip
        };
    });

}