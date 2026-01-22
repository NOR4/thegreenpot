import { useTranslation } from 'react-i18next';

export function Decarboxylation() {
    const { t } = useTranslation();

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
            {/* Header section with fire/heat theme */}
            <div className="bg-[#fbbf24] border-4 border-black p-8 shadow-hard relative overflow-hidden">
                {/* Decorative pixel flames (CSS-based) */}
                <div className="absolute top-0 right-0 p-4 opacity-20 hidden md:block">
                    <div className="w-16 h-16 bg-[#b45309] rounded-sm transform rotate-45 animate-pulse" />
                </div>

                <h1 className="font-retro text-4xl mb-2 text-black drop-shadow-sm uppercase">
                    {t('decarb.title')}
                </h1>
                <p className="font-retro text-xl text-[#b45309]">
                    {t('decarb.importance')}
                </p>
            </div>

            {/* Warning Section */}
            <div className="bg-[#ef4444] border-4 border-black p-6 shadow-hard flex items-center gap-6 animate-bounce-subtle">
                <div className="flex-shrink-0 w-16 h-16 bg-white border-4 border-black rounded-full flex items-center justify-center">
                    <span className="text-4xl font-bold">!</span>
                </div>
                <p className="font-retro text-lg text-white leading-relaxed">
                    {t('decarb.warning')}
                </p>
            </div>

            {/* Content Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* What is it? */}
                <div className="bg-white border-4 border-black p-6 shadow-hard">
                    <h2 className="font-retro text-2xl mb-4 text-[#4ade80] border-b-4 border-[#4ade80] pb-2">
                        {t('decarb.whatIsIt')}
                    </h2>
                    <p className="font-pixel text-lg leading-relaxed text-gray-700">
                        {t('decarb.whatIsItText')}
                    </p>
                </div>

                {/* Pro Tip */}
                <div className="bg-[#7c3aed] border-4 border-black p-6 shadow-hard text-white">
                    <h2 className="font-retro text-2xl mb-4 text-[#ff00ff]">
                        {t('decarb.proTip').split(':')[0]}
                    </h2>
                    <p className="font-pixel text-lg leading-relaxed italic">
                        {t('decarb.proTip').split(':')[1]}
                    </p>
                </div>
            </div>

            {/* Steps Section */}
            <div className="bg-white border-4 border-black p-8 shadow-hard">
                <h2 className="font-retro text-2xl mb-8 text-black border-b-4 border-black pb-2 text-center">
                    {t('decarb.howToDoIt')}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((step) => {
                        const stepText = t(`decarb.step${step}`);
                        const [title, ...descParts] = stepText.split(':');
                        const description = descParts.join(':');

                        return (
                            <div key={step} className="flex flex-col gap-4">
                                <div className="w-12 h-12 bg-black text-white font-retro flex items-center justify-center text-2xl shadow-[4px_4px_0px_0px_#4ade80]">
                                    {step}
                                </div>
                                <div className="font-pixel text-black">
                                    <p className="text-xl font-bold mb-1 uppercase text-[#4ade80] drop-shadow-[1px_1px_0px_black]">{title}</p>
                                    <p className="text-lg leading-tight font-medium">
                                        {description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Temperature Gauge Visualization (CSS) */}
            <div className="bg-black text-white border-4 border-black p-8 shadow-hard text-center rounded-sm overflow-hidden relative">
                <div className="flex justify-between items-end h-32 mb-4 gap-2">
                    {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((h, i) => (
                        <div
                            key={i}
                            style={{ height: `${h}%` }}
                            className={`w-full ${i > 7 ? 'bg-red-500 animate-pulse' : 'bg-[#4ade80]'}`}
                        />
                    ))}
                </div>
                <p className="font-retro text-2xl tracking-widest animate-pulse">
                    110°C - 120°C
                </p>
                <p className="font-pixel text-sm mt-2 text-gray-400">
                    230°F - 250°F
                </p>
            </div>
        </div>
    );
}
