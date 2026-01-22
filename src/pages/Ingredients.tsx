import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { pb } from '../lib/pocketbase';
import { Link } from 'react-router-dom';
import { getLocalizedField } from '../utils/i18n';

interface Ingredient {
    id: string;
    name: string;
    name_es?: string;
    description: string;
    description_es?: string;
    image: string;
    category: string;
    category_es?: string;
}

export function Ingredients() {
    const { t, i18n } = useTranslation();
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchIngredients() {
            try {
                const records = await pb.collection('ingredients').getFullList<Ingredient>({
                    sort: 'name',
                });
                setIngredients(records);
            } catch (err) {
                console.error("Error fetching ingredients:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchIngredients();
    }, []);

    const lowerTerm = searchTerm.toLowerCase();
    const filteredIngredients = ingredients.filter(ing => {
        const name = getLocalizedField(ing.name, ing.name_es, i18n.language);
        const desc = getLocalizedField(ing.description, ing.description_es, i18n.language);
        const cat = getLocalizedField(ing.category, ing.category_es, i18n.language);

        return (name || '').toLowerCase().includes(lowerTerm) ||
            (desc || '').toLowerCase().includes(lowerTerm) ||
            (cat || '').toLowerCase().includes(lowerTerm);
    });

    if (loading) {
        return <div className="font-retro text-2xl text-center mt-10 text-purple-retro animate-pulse">{t('ingredients.loading')}</div>;
    }

    return (
        <div className="max-w-4xl mx-auto pb-10">
            <Link to="/" className="inline-block mb-4 font-retro hover:underline text-lg uppercase">{t('ingredients.backToScrolls')}</Link>

            <div className="mb-10 relative">
                {/* Decorative Background Elements */}
                <div className="absolute -top-4 -left-4 w-12 h-12 border-t-8 border-l-8 border-purple-500 pointer-events-none"></div>
                <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-8 border-r-8 border-purple-500 pointer-events-none"></div>

                <div className="bg-white border-8 border-black p-8 shadow-hard relative overflow-hidden group">
                    {/* Alchemist Pattern Overlay */}
                    <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>

                    <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="bg-purple-600 text-white font-pixel text-xs px-2 py-1 uppercase tracking-tighter">{t('ingredients.inventoryLevel')}</span>
                                <div className="h-[2px] w-12 bg-purple-600"></div>
                            </div>
                            <h1 className="font-retro text-5xl md:text-7xl text-black leading-none tracking-tight">
                                {t('ingredients.pantryTitle')} <span className="text-purple-600">{t('ingredients.potions')}</span>
                            </h1>
                            <p className="font-pixel text-xl text-gray-500 mt-4 max-w-xl leading-relaxed">
                                {t('ingredients.subtitle')} <span className="text-black font-bold">{t('ingredients.arcaneComponents')}</span>{t('ingredients.subtitle2')}
                            </p>
                        </div>

                        <div className="flex flex-col items-end gap-2 shrink-0">
                            <div className="bg-yellow-100 border-4 border-black p-3 transform rotate-3 hover:rotate-0 transition-transform cursor-default">
                                <span className="font-retro text-2xl text-black">{ingredients.length}</span>
                                <span className="font-pixel text-xs block text-gray-600 uppercase">{t('ingredients.artifactsFound')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t-4 border-black border-dashed mb-10"></div>

            {/* Search Box */}
            <div className="relative mb-8 group">
                <input
                    type="text"
                    placeholder={t('ingredients.searchPlaceholder')}
                    className="w-full bg-[#fdf6e3] border-4 border-black p-5 font-pixel text-lg text-black focus:outline-none focus:bg-white shadow-hard transition-all group-hover:-translate-y-1 placeholder:text-gray-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute right-6 top-1/2 -translate-y-1/2 font-retro text-purple-600 pointer-events-none uppercase tracking-widest hidden md:block">
                    {t('ingredients.search')}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredIngredients.map((ing) => (
                    <Link
                        key={ing.id}
                        to={`/ingredient/${ing.id}`}
                        className="bg-white border-4 border-black p-4 shadow-hard flex gap-4 transform transition-transform hover:-translate-y-1 group cursor-pointer"
                    >
                        <div className="w-24 h-24 border-4 border-black flex-shrink-0 bg-yellow-50 overflow-hidden relative">
                            <img
                                src={ing.image ? pb.files.getURL(ing, ing.image) : ''}
                                alt={getLocalizedField(ing.name, ing.name_es, i18n.language)}
                                className="w-full h-full object-cover"
                                style={{ imageRendering: 'pixelated' }}
                            />
                            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 flex items-center justify-center font-retro text-[10px] text-white">
                                {t('ingredients.viewStats')}
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-pixel text-[10px] uppercase tracking-tighter text-purple-600 font-bold mb-1">
                                [{getLocalizedField(ing.category, ing.category_es, i18n.language)}]
                            </span>
                            <h2 className="font-retro text-xl mb-1 group-hover:underline">{getLocalizedField(ing.name, ing.name_es, i18n.language)}</h2>
                            <p className="font-pixel text-xs leading-tight text-gray-700">
                                {getLocalizedField(ing.description, ing.description_es, i18n.language)}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>

            {filteredIngredients.length === 0 && (
                <div className="text-center py-20 border-4 border-black border-dashed bg-gray-50">
                    <p className="font-retro text-xl text-gray-400">
                        {searchTerm ? `${t('ingredients.noComponentsFound')} "${searchTerm}"` : t('ingredients.pantryEmpty')}
                    </p>
                </div>
            )}

            <div className="mt-12 p-6 border-4 border-black bg-green-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-green-200 transform rotate-45 translate-x-8 -translate-y-8 border-l-4 border-black"></div>
                <h3 className="font-retro text-2xl mb-2">{t('ingredients.proTip')}</h3>
                <p className="font-pixel text-sm text-green-800">
                    {t('ingredients.proTipText')} <span className="text-purple-600 font-bold">{t('ingredients.arcane')}</span> {t('ingredients.proTipText2')}
                </p>
            </div>
        </div>
    );
}
