import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { RecipeCard } from '../components/RecipeCard';
import { pb } from '../lib/pocketbase';
import { getLocalizedField } from '../utils/i18n';
import heroBanner from '../assets/hero-banner.jpg';
import { IconShoppingCart } from '../components/icons';

interface Recipe {
    id: string;
    title: string;
    title_es?: string;
    category: string;
    category_es?: string;
    difficulty: number;
    image: string;
    price: string;
    total_votes: number;
    description: string;
    description_es?: string;
}

export function Home() {
    const { t, i18n } = useTranslation();
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        async function fetchRecipes() {
            try {
                const resultList = await pb.collection('recipes').getList<Recipe>(1, 50);
                setRecipes(resultList.items);
            } catch (error) {
                console.error("Error fetching recipes:", error);
            }
        }

        fetchRecipes();
    }, []);

    const topRatedRecipes = [...recipes].sort((a, b) => b.total_votes - a.total_votes).slice(0, 3);

    const bestSellers = [
        { id: 1, name: t('calculator.toolThermometer'), price: "$19.99", image: "https://cdn-icons-png.flaticon.com/512/808/808439.png" },
        { id: 2, name: t('calculator.toolScale'), price: "$29.99", image: "https://cdn-icons-png.flaticon.com/512/3361/3361297.png" },
        { id: 3, name: t('calculator.toolCup'), price: "$14.99", image: "https://cdn-icons-png.flaticon.com/512/1046/1046874.png" }
    ];

    const offers = [
        { id: 1, name: "Starter Kit", price: "$49.99", originalPrice: "$65.00", image: "https://cdn-icons-png.flaticon.com/512/2921/2921822.png" },
        { id: 2, name: "Master Chef Bundle", price: "$89.99", originalPrice: "$120.00", image: "https://cdn-icons-png.flaticon.com/512/1531/1531339.png" }
    ];

    return (

        <div className="space-y-12 mb-12">
            {/* HERO BANNER */}
            <div className="relative w-full h-[300px] md:h-[400px] border-4 border-black shadow-hard overflow-hidden group">
                <img src={heroBanner} alt="The Green Pot" className="w-full h-full object-cover" style={{ imageRendering: 'pixelated' }} />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h1 className="font-retro text-4xl md:text-6xl text-white drop-shadow-[4px_4px_0_#000] text-center px-4">
                        THE GREEN POT
                    </h1>
                </div>
            </div>

            {/* TOP RATED RECIPES */}
            <section>
                <h2 className="font-retro text-2xl mb-6 text-yellow-400 drop-shadow-[2px_2px_0_#000] bg-black inline-block px-4 py-2 transform -rotate-1">
                    {t('home.topRated')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {topRatedRecipes.map(recipe => {
                        const enCats = (recipe.category || "Uncategorized").split(',').map(c => c.trim());
                        const esCats = (recipe.category_es || recipe.category || "Uncategorized").split(',').map(c => c.trim());
                        const displayCategory = i18n.language === 'es' ? esCats.join(' & ') : enCats.join(' & ');

                        return (
                            <RecipeCard
                                key={recipe.id}
                                id={recipe.id}
                                title={getLocalizedField(recipe.title, recipe.title_es, i18n.language)}
                                category={displayCategory}
                                difficulty={recipe.difficulty}
                                image={recipe.image}
                                total_votes={recipe.total_votes}
                                description={getLocalizedField(recipe.description, recipe.description_es, i18n.language)}
                            />
                        );
                    })}
                </div>
            </section>

            {/* BEST SELLERS */}
            <section>
                <h2 className="font-retro text-2xl mb-6 text-green-400 drop-shadow-[2px_2px_0_#000] bg-black inline-block px-4 py-2 transform rotate-1">
                    {t('home.bestSellers')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {bestSellers.map(tool => (
                        <div key={tool.id} className="bg-gray-800 border-4 border-black p-6 flex flex-col items-center gap-4 shadow-hard hover:-translate-y-1 transition-transform group relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rotate-45 transform translate-x-8 -translate-y-8"></div>
                            <div className="w-24 h-24 bg-white rounded-full border-4 border-black flex items-center justify-center p-2 group-hover:bg-yellow-100 transition-colors">
                                <img src={tool.image} alt={tool.name} className="w-16 h-16 pixelated" />
                            </div>
                            <div className="text-center w-full">
                                <h3 className="font-retro text-lg text-white mb-2 truncate px-2">{tool.name}</h3>
                                <p className="font-pixel text-2xl text-yellow-400 mb-4">{tool.price}</p>
                                <button className="w-full font-retro text-xs bg-green-500 text-black px-4 py-3 border-b-4 border-green-700 active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center gap-2 hover:bg-green-400">
                                    <IconShoppingCart className="w-4 h-4" />
                                    {t('calculator.buyNow')}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* OFFERS */}
            <section className="bg-purple-900 border-4 border-black p-6 md:p-8 shadow-hard relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/pixel-weave.png')] opacity-10"></div>
                <h2 className="font-retro text-2xl mb-8 text-white drop-shadow-[2px_2px_0_#000] text-center relative z-10">
                    {t('home.bestOffers')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    {offers.map(offer => (
                        <div key={offer.id} className="bg-white border-4 border-black p-4 flex flex-col md:flex-row items-center gap-6 shadow-hard transform hover:scale-[1.01] transition-transform">
                            <div className="w-32 h-32 bg-purple-100 border-4 border-black flex items-center justify-center flex-shrink-0">
                                <img src={offer.image} alt={offer.name} className="w-20 h-20 pixelated" />
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="font-retro text-xl text-black mb-2">{offer.name}</h3>
                                <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                                    <span className="font-pixel text-xl text-gray-400 line-through decoration-red-500 decoration-2">{offer.originalPrice}</span>
                                    <span className="font-retro text-2xl text-red-500 animate-pulse">{offer.price}</span>
                                </div>
                                <button className="font-retro text-xs bg-yellow-400 text-black px-6 py-2 border-b-4 border-yellow-600 active:border-b-0 active:translate-y-1 transition-all inline-flex items-center gap-2 hover:bg-yellow-300">
                                    {t('calculator.buyNow')}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>


        </div>
    );
}
