import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { pb } from '../lib/pocketbase';
import { IconClock, IconStar } from '../components/icons';
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
    calories: number;
    allergies: string;
    rarity: string;
    effects: string;
}

export function IngredientDetail() {
    const { t, i18n } = useTranslation();
    const { id } = useParams<{ id: string }>();
    const [ingredient, setIngredient] = useState<Ingredient | null>(null);
    const [relatedRecipes, setRelatedRecipes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchIngredient() {
            if (!id) return;
            try {
                const record = await pb.collection('ingredients').getOne<Ingredient>(id);
                setIngredient(record);

                // Fetch related recipes
                const recipes = await pb.collection('recipes').getList(1, 4, {
                    filter: `ingredients_json ~ "${id}"`,
                    sort: '-created'
                });
                setRelatedRecipes(recipes.items);

            } catch (err) {
                console.error("Error fetching ingredient:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchIngredient();
    }, [id]);

    if (loading) {
        return <div className="font-retro text-2xl text-center mt-10 text-purple-retro animate-pulse">{t('ingredientDetail.loading')}</div>;
    }

    if (!ingredient) {
        return <div className="font-retro text-2xl text-center mt-10 text-red-500 uppercase">{t('ingredientDetail.notFound')}</div>;
    }

    const rarityColor = {
        'Common': 'bg-gray-200 text-gray-700',
        'Rare': 'bg-blue-100 text-blue-700',
        'Epic': 'bg-purple-100 text-purple-700',
        'Arcane': 'bg-yellow-100 text-yellow-700'
    }[ingredient.rarity] || 'bg-gray-100';

    const currentLang = i18n.language;

    return (
        <div className="max-w-4xl mx-auto pb-20 px-4">
            <Link to="/ingredients" className="inline-block mb-6 font-retro hover:underline text-lg text-white uppercase">{t('ingredientDetail.backLink')}</Link>

            <div className="bg-white border-8 border-black shadow-hard overflow-hidden mb-12">
                {/* Header Section */}
                <div className="bg-black text-white p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-center md:text-left">
                        <span className={`font-pixel text-xs px-2 py-1 uppercase font-bold ${rarityColor} border-2 border-black`}>
                            {ingredient.rarity || 'Common'} {t('ingredientDetail.item')}
                        </span>
                        <h1 className="font-retro text-4xl md:text-6xl mt-2">{getLocalizedField(ingredient.name, ingredient.name_es, currentLang)}</h1>
                    </div>
                    <div className="flex flex-col items-center md:items-end">
                        <span className="font-pixel text-[10px] text-gray-400 uppercase tracking-tighter mb-1">ID: {ingredient.id}</span>
                        <div className="bg-purple-600 px-4 py-1 border-2 border-white">
                            <span className="font-retro text-xl">{getLocalizedField(ingredient.category, ingredient.category_es, currentLang)}</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Visual Section */}
                    <div className="p-8 border-r-0 md:border-r-8 border-b-8 md:border-b-0 border-black bg-gray-50 flex items-center justify-center relative group">
                        <div className="absolute inset-4 border-2 border-dashed border-gray-300 pointer-events-none"></div>
                        <img
                            src={ingredient.image ? pb.files.getUrl(ingredient, ingredient.image) : ''}
                            alt={getLocalizedField(ingredient.name, ingredient.name_es, currentLang)}
                            className="w-full aspect-square object-cover shadow-hard border-4 border-black"
                            style={{ imageRendering: 'pixelated' }}
                        />
                    </div>

                    {/* Stats Section */}
                    <div className="p-8 flex flex-col gap-6 bg-[#fdf6e3]">
                        <div>
                            <h2 className="font-retro text-2xl mb-2 flex items-center gap-2 text-black">
                                <span className="w-2 h-8 bg-black"></span>
                                {t('ingredientDetail.lore')}
                            </h2>
                            <p className="font-pixel text-lg leading-relaxed text-gray-800 italic">
                                "{getLocalizedField(ingredient.description, ingredient.description_es, currentLang)}"
                            </p>
                        </div>

                        {/* Stat Grid */}
                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <div className="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-center">
                                <span className="font-pixel text-[10px] text-gray-500 block mb-1 uppercase tracking-tighter">{t('ingredientDetail.energy')}</span>
                                <span className="font-retro text-2xl text-red-500">{ingredient.calories || 0} KCAL</span>
                            </div>
                            <div className="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                <span className="font-pixel text-[10px] text-gray-500 block mb-1 uppercase tracking-tighter">{t('ingredientDetail.growth')}</span>
                                <div className="flex items-center gap-2 mt-1">
                                    <IconClock className="w-5 h-5 text-blue-500" />
                                    <span className="font-retro text-lg">{t('ingredientDetail.fast')}</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <div className="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                <span className="font-pixel text-[10px] text-gray-500 block mb-1 uppercase tracking-tighter">{t('ingredientDetail.risks')}</span>
                                <span className="font-retro text-lg text-yellow-600 block">
                                    {ingredient.allergies || t('ingredientDetail.noRisks')}
                                </span>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-pixel text-[10px] text-gray-500 uppercase mb-2 tracking-widest">{t('ingredientDetail.effects')}</h3>
                            <div className="flex flex-wrap gap-2">
                                {(ingredient.effects || '').split(',').filter(x => x).map((effect, idx) => (
                                    <span key={idx} className="bg-green-100 border-2 border-black px-3 py-1 font-pixel text-sm font-bold text-green-700">
                                        +{effect.trim().toUpperCase()}
                                    </span>
                                ))}
                                {!ingredient.effects && <span className="font-pixel text-sm text-gray-400">{t('ingredientDetail.neutral')}</span>}
                            </div>
                        </div>

                        {/* Pro Recommendation */}
                        <div className="mt-auto pt-6 border-t-4 border-black border-dotted">
                            <div className="flex items-center gap-2 mb-2 text-purple-600">
                                <IconStar className="w-5 h-5 fill-current" />
                                <span className="font-retro text-lg uppercase tracking-tight">{t('ingredientDetail.note')}</span>
                            </div>
                            <p className="font-pixel text-sm text-gray-700 leading-snug">
                                {t('ingredientDetail.noteText')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer Decor */}
                <div className="bg-gray-100 border-t-8 border-black p-4 flex justify-between items-center">
                    <div className="flex gap-2">
                        {[1, 2, 3].map(i => <div key={i} className="w-3 h-3 bg-black rounded-full"></div>)}
                    </div>
                    <span className="font-pixel text-[10px] text-gray-400 uppercase">{t('ingredientDetail.archives')} v1.2.0</span>
                </div>
            </div>

            {/* Related Recipes Section */}
            {relatedRecipes.length > 0 && (
                <div className="bg-[#444] border-8 border-black p-8 shadow-hard">
                    <h2 className="font-retro text-3xl text-yellow-400 mb-6 uppercase tracking-widest text-center border-b-4 border-yellow-400 pb-4">
                        {t('ingredientDetail.featured')}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        {relatedRecipes.map((recipe) => (
                            <Link
                                key={recipe.id}
                                to={`/recipe/${recipe.id}`}
                                className="bg-white border-4 border-black p-4 flex gap-4 hover:translate-x-1 hover:-translate-y-1 transition-transform group"
                            >
                                <div className="w-16 h-16 border-2 border-black flex-shrink-0 bg-gray-100">
                                    <img
                                        src={recipe.image ? pb.files.getUrl(recipe, recipe.image) : ''}
                                        alt={getLocalizedField(recipe.title, recipe.title_es, currentLang)}
                                        className="w-full h-full object-cover"
                                        style={{ imageRendering: 'pixelated' }}
                                    />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <span className="font-pixel text-[10px] text-purple-600 font-bold uppercase tracking-tighter mb-1">
                                        [{getLocalizedField(recipe.category, recipe.category_es, currentLang)}]
                                    </span>
                                    <h3 className="font-retro text-lg group-hover:underline text-black leading-none">{getLocalizedField(recipe.title, recipe.title_es, currentLang)}</h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
