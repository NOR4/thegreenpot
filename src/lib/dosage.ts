export interface DosageBracket {
    range: [number, number];
    label: string;
    profile: string;
    effects: string;
    bgColor: string;
    textColor?: string;
}

export const DOSAGE_BRACKETS: DosageBracket[] = [
    {
        range: [1, 3],
        label: "1 - 3 mg",
        profile: "Primerizos y microdosis.",
        effects: "Ligero alivio de dolores y otros síntomas (temblores, crisis, estrés). Relajación muy suave.",
        bgColor: "bg-[#e0f7e9]"
    },
    {
        range: [3, 15],
        label: "3 - 15 mg",
        profile: "Consumidores ocasionales. Pacientes con síntomas persistentes.",
        effects: "Desaparición de la mayoría de los síntomas. Ligera euforia. Puede aparecer algo de descoordinación.",
        bgColor: "bg-[#bbf7d0]"
    },
    {
        range: [15, 30],
        label: "15 - 30 mg",
        profile: "Consumidores frecuentes. Pacientes con síntomas persistentes.",
        effects: "Ya no te acuerdas de qué te duele. Euforia, creatividad, risa tonta. Ayuda a conciliar el sueño.",
        bgColor: "bg-[#86efac]"
    },
    {
        range: [30, 50],
        label: "30 - 50 mg",
        profile: "Consumidores experimentados. Pacientes con alta tolerancia al THC y/o al CBD.",
        effects: "Euforia, leve amnesia de los hechos recientes, verborrea. Si no estás acostumbrado pueden aparecer efectos adversos.",
        bgColor: "bg-[#4ade80]"
    },
    {
        range: [50, 100],
        label: "50 - 100 mg",
        profile: "Valientes. Pacientes con síntomas muy graves.",
        effects: "Posiblemente te quedes fuera de combate por varias horas. No vas a saber ni cómo te llamas. Ojo, pueden aparecer náuseas y taquicardia.",
        bgColor: "bg-[#15803d]",
        textColor: "text-white bg-[#14532d]"
    }
];

export function getDosageInfo(mg: number): DosageBracket | null {
    if (mg <= 0) return null;
    return DOSAGE_BRACKETS.find(bracket => mg >= bracket.range[0] && mg <= bracket.range[1]) ||
        (mg > 100 ? DOSAGE_BRACKETS[DOSAGE_BRACKETS.length - 1] : null);
}
