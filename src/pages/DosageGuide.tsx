import { useTranslation } from 'react-i18next';
import potIcon from '../assets/pot-icon.png';
import leafImage from '../assets/leaf.png';
import { DOSAGE_BRACKETS, type DosageBracket } from '../lib/dosage';

export function DosageGuide() {
    const { t } = useTranslation();
    return (
        <div className="bg-purple-retro p-4 md:p-8 border-4 border-black shadow-hard text-black rounded-sm relative overflow-hidden">
            <div className="text-center mb-12 flex items-center justify-center gap-8">
                <img src={potIcon} alt="Pot Icon" className="w-16 h-16 md:w-24 md:h-24 object-contain" />
                <h2 className="font-retro text-3xl md:text-5xl text-[#8DFF5C] drop-shadow-[4px_4px_0_#000000]">{t('dosageGuide.title')}</h2>
                <img src={potIcon} alt="Pot Icon" className="w-16 h-16 md:w-24 md:h-24 object-contain" />
            </div>

            <div className="overflow-x-auto pb-8 no-scrollbar relative z-10">
                <div className="min-w-[1400px] grid grid-cols-[250px_1fr_1fr_1fr_1fr_1fr] gap-6">

                    {/* Headers / Left Column Labels */}
                    <div className="flex flex-col justify-start gap-6 pt-7 font-retro text-[#8DFF5C] text-right pr-6 text-2xl">
                        <div className="h-24 flex items-center justify-end" dangerouslySetInnerHTML={{ __html: t('dosageGuide.amountLabel').replace('\n', '<br />') }} />
                        <div className="h-40 flex items-center justify-end" dangerouslySetInnerHTML={{ __html: t('dosageGuide.profileLabel').replace('\n', '<br />') }} />
                        <div className="h-48 flex items-center justify-end">{t('dosageGuide.effectsLabel')}</div>
                    </div>

                    {DOSAGE_BRACKETS.map((bracket, index) => (
                        <DosageColumn key={index} {...bracket} />
                    ))}

                </div>

                <div className="mt-8 flex justify-center md:hidden">
                    <span className="font-retro text-white text-xs">{t('dosageGuide.scrollMore')}</span>
                </div>
            </div>

            {/* Decoration */}
            <div className="absolute -bottom-10 -left-10 text-[#8DFF5C] opacity-80 pointer-events-none rotate-12 z-0">
                <img src={leafImage} alt="Weed Leaf" className="w-64 h-64 object-contain" />
            </div>
        </div>
    );
}

function DosageColumn({ label, profileKey, effectsKey, bgColor, textColor }: DosageBracket) {
    const { t } = useTranslation();
    // Base classes
    const containerClass = `flex flex-col gap-6 p-6 border-4 border-[#EC28ED] ${bgColor} ${textColor || 'text-black'} hover:transform hover:-translate-y-2 transition-transform duration-300 shadow-hard`;

    return (
        <div className={containerClass}>
            <div className="h-24 flex items-center justify-center border-b-2 border-black/10 pb-4">
                <h3 className="font-retro text-3xl text-center">{label}</h3>
            </div>
            <div className="h-40 flex items-start overflow-y-auto">
                <p className="font-bold text-xl leading-snug">{t(profileKey)}</p>
            </div>
            <div className="h-48 flex items-start overflow-y-auto">
                <p className="font-bold text-xl leading-snug">{t(effectsKey)}</p>
            </div>
        </div>
    )
}
