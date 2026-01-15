import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { RecipeCard } from '../components/RecipeCard';
import { pb } from '../lib/pocketbase';

interface Recipe {
    id: string;
    title: string;
    category: string;
    difficulty: number;
    image: string;
    price: string;
    total_votes: number;
    description: string;
}

export function Home() {
    const { t } = useTranslation();
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = ["All", ...Array.from(new Set(recipes.map(r => r.category || "Uncategorized"))).sort()];

    useEffect(() => {
        async function fetchRecipes() {
            try {
                const resultList = await pb.collection('recipes').getList<Recipe>(1, 50);
                setRecipes(resultList.items);
            } catch (error) {
                console.error("Error fetching recipes:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchRecipes();
    }, []);

    const filteredRecipes = selectedCategory === "All"
        ? recipes
        : recipes.filter(recipe => recipe.category === selectedCategory);

    return (
        <div className="mb-8">
            <h2 className="font-retro text-xl mb-4 text-purple-retro">{t('home.latestRecipes')}</h2>

            <div className="flex gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`
                            px-4 py-2 rounded-full font-retro text-sm whitespace-nowrap transition-colors border-2
                            ${selectedCategory === category
                                ? 'bg-purple-retro text-white border-purple-retro'
                                : 'bg-white text-purple-retro border-purple-retro hover:bg-purple-100'}
                        `}
                    >
                        {category.toUpperCase()}
                    </button>
                ))}
            </div>

            {/* Dosage Disclaimer */}
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-8 font-pixel shadow-md relative" role="alert">
                <p className="font-bold font-retro text-lg mb-1">{t('home.potencyTitle')}</p>
                <p>
                    {t('home.potencyText')} <a href="/dosage-guide" className="underline font-bold hover:text-yellow-900">{t('home.dosageGuideLink')}</a> {t('home.potencyText2')}
                </p>
            </div>

            {loading ? (
                <div className="font-retro text-black">{t('home.loading')}</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredRecipes.map((recipe) => (
                        <RecipeCard
                            key={recipe.id}
                            id={recipe.id}
                            title={recipe.title}
                            category={recipe.category}
                            difficulty={recipe.difficulty}
                            image={recipe.image}
                            price={recipe.price}
                            total_votes={recipe.total_votes}
                            description={recipe.description}
                        />
                    ))}
                    {filteredRecipes.length === 0 && (
                        <div className="col-span-full text-center py-8 font-retro text-gray-500">
                            {t('home.noRecipesFound')}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
