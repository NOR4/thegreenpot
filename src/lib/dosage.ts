export interface DosageBracket {
    range: [number, number];
    label: string;
    profileKey: string;
    effectsKey: string;
    bgColor: string;
    textColor?: string;
}

export const DOSAGE_BRACKETS: DosageBracket[] = [
    {
        range: [1, 3],
        label: "1 - 3 mg",
        profileKey: "db.micro.profile",
        effectsKey: "db.micro.effects",
        bgColor: "bg-[#D5FFDC]"
    },
    {
        range: [3, 15],
        label: "3 - 15 mg",
        profileKey: "db.low.profile",
        effectsKey: "db.low.effects",
        bgColor: "bg-[#B1FFC1]"
    },
    {
        range: [15, 30],
        label: "15 - 30 mg",
        profileKey: "db.medium.profile",
        effectsKey: "db.medium.effects",
        bgColor: "bg-[#5EED6F]"
    },
    {
        range: [30, 50],
        label: "30 - 50 mg",
        profileKey: "db.high.profile",
        effectsKey: "db.high.effects",
        bgColor: "bg-[#55ED37]"
    },
    {
        range: [50, 100],
        label: "50 - 100 mg",
        profileKey: "db.heavy.profile",
        effectsKey: "db.heavy.effects",
        bgColor: "bg-[#248100]"
    }
];

export function getDosageInfo(mg: number): DosageBracket | null {
    if (mg <= 0) return null;
    return DOSAGE_BRACKETS.find(bracket => mg >= bracket.range[0] && mg <= bracket.range[1]) ||
        (mg > 100 ? DOSAGE_BRACKETS[DOSAGE_BRACKETS.length - 1] : null);
}
