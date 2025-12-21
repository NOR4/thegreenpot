import potIcon from '../assets/pot-icon.png';
import { IconLeaf } from '../components/icons/leaf';

export function DosageGuide() {
    return (
        <div className="bg-purple-retro p-4 md:p-8 border-4 border-black shadow-hard text-black rounded-sm relative overflow-hidden">
            <div className="text-center mb-12 flex items-center justify-center gap-8">
                <img src={potIcon} alt="Pot Icon" className="w-16 h-16 md:w-24 md:h-24 object-contain" />
                <h2 className="font-retro text-3xl md:text-5xl text-[#4ade80] drop-shadow-[4px_4px_0_#000000]">CALCULA TU DOSIS</h2>
                <img src={potIcon} alt="Pot Icon" className="w-16 h-16 md:w-24 md:h-24 object-contain" />
            </div>

            <div className="overflow-x-auto pb-8">
                <div className="min-w-[1400px] grid grid-cols-[200px_1fr_1fr_1fr_1fr_1fr] gap-6">

                    {/* Headers / Left Column Labels */}
                    <div className="flex flex-col justify-center gap-16 pt-24 font-retro text-[#4ade80] text-right pr-6 text-xl">
                        <div className="h-24 flex items-center justify-end">CANTIDAD DE<br />CBD/ THC</div>
                        <div className="h-40 flex items-center justify-end">PERFIL DE<br />CONSUMIDOR@</div>
                        <div className="h-48 flex items-center justify-end">EFECTOS</div>
                    </div>

                    {/* Column 1: 1-3 mg */}
                    <DosageColumn
                        amount="1 - 3 mg"
                        profile="Primerizos y microdosis."
                        effects="Ligero alivio de dolores y otros síntomas (temblores, crisis, estrés). Relajación muy suave."
                        bgColor="bg-[#e0f7e9]"
                    />

                    {/* Column 2: 3-15 mg */}
                    <DosageColumn
                        amount="3 - 15 mg"
                        profile="Consumidores ocasionales. Pacientes con síntomas persistentes."
                        effects="Desaparición de la mayoría de los síntomas. Ligera euforia. Puede aparecer algo de descoordinación."
                        bgColor="bg-[#e0f7e9]"
                    />

                    {/* Column 3: 15-30 mg */}
                    <DosageColumn
                        amount="15 - 30 mg"
                        profile="Consumidores frecuentes. Pacientes con síntomas persistentes."
                        effects="Ya no te acuerdas de qué te duele. Euforia, creatividad, risa tonta. Ayuda a conciliar el sueño."
                        bgColor="bg-[#86efac]"
                    />

                    {/* Column 4: 30-50 mg */}
                    <DosageColumn
                        amount="30 - 50 mg"
                        profile="Consumidores experimentados. Pacientes con alta tolerancia al THC y/o al CBD."
                        effects="Euforia, leve amnesia de los hechos recientes, verborrea. Si no estás acostumbrado pueden aparecer efectos adversos."
                        bgColor="bg-[#4ade80]"
                    />

                    {/* Column 5: 50-100 mg */}
                    <DosageColumn
                        amount="50 - 100 mg"
                        profile="Valientes. Pacientes con síntomas muy graves."
                        effects="Posiblemente te quedes fuera de combate por varias horas. No vas a saber ni cómo te llamas. Ojo, pueden aparecer náuseas y taquicardia."
                        bgColor="bg-[#166534]"
                        textColor="text-white bg-[#1a4a2e]"
                    />

                </div>

                <div className="mt-8 flex justify-center md:hidden">
                    <span className="font-retro text-white text-xs">← SCROLL FOR MORE →</span>
                </div>
            </div>

            {/* Decoration */}
            <div className="absolute -bottom-10 -left-10 text-[#4ade80] opacity-80 pointer-events-none rotate-12">
                <IconLeaf className="w-64 h-64" />
            </div>
        </div>
    );
}

interface DosageColumnProps {
    amount: string;
    profile: string;
    effects: string;
    bgColor: string;
    textColor?: string;
}

function DosageColumn({ amount, profile, effects, bgColor, textColor }: DosageColumnProps) {
    // Base classes
    const containerClass = `flex flex-col gap-6 p-6 rounded-xl border-4 border-black ${bgColor} ${textColor || 'text-black'} hover:transform hover:-translate-y-2 transition-transform duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]`;

    return (
        <div className={containerClass}>
            <div className="h-24 flex items-center justify-center border-b-2 border-black/10 pb-4">
                <h3 className="font-retro text-3xl text-center">{amount}</h3>
            </div>
            <div className="h-40 flex items-start overflow-y-auto">
                <p className="font-bold text-lg leading-snug">{profile}</p>
            </div>
            <div className="h-48 flex items-start overflow-y-auto">
                <p className="font-bold text-lg leading-snug">{effects}</p>
            </div>
        </div>
    )
}
