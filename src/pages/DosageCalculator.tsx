import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '../utils/cn';
import { IconChevronDown } from '../components/icons';

export function DosageCalculator() {
    const { t } = useTranslation();
    const [grams, setGrams] = useState<string>('');
    const [thcPercent, setThcPercent] = useState<string>('20'); // Default approx for strong flower
    const [yieldPercent, setYieldPercent] = useState<string>('60'); // Default conservative yield
    const [servings, setServings] = useState<string>('12');
    const [fatAmount, setFatAmount] = useState<string>('240'); // approx 1 cup in ml

    const [totalTHC, setTotalTHC] = useState<number>(0);
    const [thcPerServing, setThcPerServing] = useState<number>(0);
    const [thcPerMl, setThcPerMl] = useState<number>(0);

    useEffect(() => {
        // Calculation Logic
        // Total THC (mg) = Grams * 1000 * (THC% / 100) * (Yield% / 100)
        const g = parseFloat(grams) || 0;
        const p = parseFloat(thcPercent) || 0;
        const y = parseFloat(yieldPercent) || 0;

        const total = g * 1000 * (p / 100) * (y / 100);
        setTotalTHC(total);

        // Per Serving
        const s = parseFloat(servings) || 1;
        setThcPerServing(total / s);

        // Per mL
        const f = parseFloat(fatAmount) || 1;
        setThcPerMl(total / f);

    }, [grams, thcPercent, yieldPercent, servings, fatAmount]);

    return (
        <div className="max-w-4xl mx-auto pb-10">
            <div className="bg-gray-800 text-white border-4 border-black p-6 mb-8 shadow-hard">
                <h1 className="font-retro text-4xl md:text-5xl text-[#4ade80] drop-shadow-md mb-2">{t('calculator.title')}</h1>
                <p className="font-pixel text-gray-300">{t('calculator.subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* INPUTS */}
                <div className="bg-green-100 border-4 border-pink-500 p-6 shadow-hard flex flex-col gap-6 relative overflow-hidden">
                    {/* Decorative Background Element */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-purple-400 rounded-full translate-x-1/3 -translate-y-1/3 blur-xl opacity-50"></div>

                    <h2 className="font-retro text-2xl border-4 border-pink-500 inline-block mb-2 bg-white text-black px-4 py-1 relative z-10 shadow-[4px_4px_0px_0px_rgba(236,72,153,1)]">
                        {t('calculator.ingredients')}
                    </h2>

                    {/* Amount */}
                    <div className="relative z-10">
                        <label className="block font-retro text-lg mb-2 text-black">{t('calculator.cannabisAmount')}</label>
                        <input
                            type="number"
                            value={grams}
                            onChange={(e) => setGrams(e.target.value)}
                            placeholder={t('calculator.cannabisPlaceholder')}
                            className="w-full font-pixel text-xl p-3 border-4 border-black focus:ring-4 focus:ring-purple-400 focus:outline-none text-black placeholder-gray-500 bg-purple-50"
                        />
                    </div>

                    {/* Potency */}
                    <div className="relative z-10">
                        <label className="block font-retro text-lg mb-2 text-black">{t('calculator.thcPercentage')}</label>
                        <div className="flex gap-2 mb-2 flex-wrap">
                            {[10, 15, 20, 25].map(val => (
                                <button
                                    key={val}
                                    onClick={() => setThcPercent(val.toString())}
                                    className={cn(
                                        "font-pixel text-xs px-2 py-1 border-2 border-black transition-all",
                                        thcPercent === val.toString() ? "bg-black text-white" : "bg-purple-100 hover:bg-purple-200 text-black"
                                    )}
                                >
                                    {val}%
                                </button>
                            ))}
                        </div>
                        <input
                            type="number"
                            value={thcPercent}
                            onChange={(e) => setThcPercent(e.target.value)}
                            className="w-full font-pixel text-xl p-3 border-4 border-black focus:ring-4 focus:ring-purple-400 focus:outline-none text-black bg-purple-50"
                        />
                        <p className="text-xs font-pixel text-black mt-1">{t('calculator.thcHint')}</p>
                    </div>

                    {/* Extraction Yield */}
                    <div className="relative z-10">
                        <div className="flex justify-between items-baseline mb-2">
                            <label className="block font-retro text-lg text-black">{t('calculator.extractionYield')}</label>
                            <div className="group relative">
                                <span className="font-pixel text-xs underline cursor-help text-purple-700 font-bold">{t('calculator.whatIsThis')}</span>
                                <div className="absolute bottom-full right-0 w-48 bg-black text-white p-2 text-xs font-pixel mb-1 hidden group-hover:block border-2 border-white pointer-events-none z-10">
                                    {t('calculator.yieldTooltip')}
                                </div>
                            </div>
                        </div>
                        <select
                            value={yieldPercent}
                            onChange={(e) => setYieldPercent(e.target.value)}
                            className="w-full font-pixel text-xl p-3 border-4 border-black bg-purple-50 focus:ring-4 focus:ring-purple-400 focus:outline-none appearance-none text-black"
                        >
                            <option value="40">{t('calculator.yieldPoor')}</option>
                            <option value="60">{t('calculator.yieldStandard')}</option>
                            <option value="80">{t('calculator.yieldEfficient')}</option>
                            <option value="90">{t('calculator.yieldProfessional')}</option>
                        </select>
                        <div className="pointer-events-none absolute right-4 top-1/2 translate-y-1/2">
                            <IconChevronDown className="w-6 h-6 text-black" />
                        </div>
                    </div>

                    {/* Fat Volume */}
                    <div className="relative z-10">
                        <label className="block font-retro text-lg mb-2 text-black">{t('calculator.fatVolume')}</label>
                        <input
                            type="number"
                            value={fatAmount}
                            onChange={(e) => setFatAmount(e.target.value)}
                            className="w-full font-pixel text-xl p-3 border-4 border-black focus:ring-4 focus:ring-purple-400 focus:outline-none text-black bg-purple-50"
                        />
                        <p className="text-xs font-pixel text-black mt-1">{t('calculator.fatHint')}</p>
                    </div>

                    {/* Servings */}
                    <div className="relative z-10">
                        <label className="block font-retro text-lg mb-2 text-black">{t('calculator.servings')}</label>
                        <input
                            type="number"
                            value={servings}
                            onChange={(e) => setServings(e.target.value)}
                            className="w-full font-pixel text-xl p-3 border-4 border-black focus:ring-4 focus:ring-purple-400 focus:outline-none text-black bg-purple-50"
                        />
                    </div>
                </div>

                {/* RESULTS */}
                <div className="flex flex-col gap-8">
                    {/* Vibrant Result Card - Updated Styling */}
                    <div className="bg-green-100 border-4 border-pink-500 p-6 shadow-hard relative overflow-hidden">
                        {/* Decorative Background Element */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-purple-400 rounded-full translate-x-1/3 -translate-y-1/3 blur-xl opacity-50"></div>

                        <h2 className="font-retro text-2xl border-4 border-pink-500 inline-block mb-6 bg-white text-black px-4 py-1 relative z-10 shadow-[4px_4px_0px_0px_rgba(236,72,153,1)]">
                            {t('calculator.results')}
                        </h2>

                        <div className="flex flex-col gap-6 relative z-10">
                            <div className="bg-white border-4 border-pink-500 p-4 text-center shadow-[4px_4px_0px_0px_rgba(236,72,153,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                                <span className="block font-retro text-black mb-1 text-lg">{t('calculator.totalBatchPotency')}</span>
                                <span className="block font-retro text-6xl text-purple-600 drop-shadow-sm">{Math.round(totalTHC)} <span className="text-2xl text-black">mg</span></span>
                                <span className="block font-pixel text-sm text-black mt-2 bg-purple-100 inline-block px-2 border border-pink-500">{t('calculator.totalThcIn')} {fatAmount}ml</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-[#4ade80] border-4 border-pink-500 p-4 text-center shadow-[4px_4px_0px_0px_rgba(236,72,153,1)]">
                                    <span className="block font-retro text-black text-sm mb-1 bg-white border-2 border-pink-500 inline-block px-1">{t('calculator.perServing')}</span>
                                    <span className="block font-retro text-4xl text-black mt-2">{Math.round(thcPerServing)} <span className="text-lg">mg</span></span>
                                </div>
                                <div className="bg-cyan-300 border-4 border-pink-500 p-4 text-center shadow-[4px_4px_0px_0px_rgba(236,72,153,1)]">
                                    <span className="block font-retro text-black text-sm mb-1 bg-white border-2 border-pink-500 inline-block px-1">{t('calculator.perMl')}</span>
                                    <span className="block font-retro text-4xl text-black mt-2">{thcPerMl.toFixed(1)} <span className="text-lg">mg</span></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-yellow-200 border-4 border-black p-6 shadow-hard">
                        <h3 className="font-retro text-xl mb-4 bg-black text-white inline-block px-2">{t('calculator.dosageGuideTitle')}</h3>
                        <ul className="font-pixel text-sm space-y-3 text-black">
                            <li className="flex gap-2 items-start"><span className="font-bold bg-white border border-black px-1">1-5mg</span> <span>{t('calculator.microdose')}</span></li>
                            <li className="flex gap-2 items-start"><span className="font-bold bg-white border border-black px-1">5-10mg</span> <span>{t('calculator.standard')}</span></li>
                            <li className="flex gap-2 items-start"><span className="font-bold bg-white border border-black px-1">10-25mg</span> <span>{t('calculator.strong')}</span></li>
                            <li className="flex gap-2 items-start"><span className="font-bold bg-white border border-black px-1">25-50mg</span> <span>{t('calculator.veryStrong')}</span></li>
                            <li className="flex gap-2 items-start"><span className="font-bold bg-red-500 text-white border border-black px-1">50mg+</span> <span>{t('calculator.heroic')}</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
