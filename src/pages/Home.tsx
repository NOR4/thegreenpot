import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { RecipeCard } from '../components/RecipeCard';
import { pb } from '../lib/pocketbase';
import { getLocalizedField } from '../utils/i18n';

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
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("All");

    // Extract all individual categories from all recipes
    const categories = ["All", ...Array.from(new Set(
        recipes.flatMap(r => (r.category || "Uncategorized").split(',').map(c => c.trim()))
    ))].sort();

    // Create a mapping for category display names for each INDIVIDUAL category
    const categoryDisplayNames = recipes.reduce((acc, r) => {
        const enCats = (r.category || "Uncategorized").split(',').map(c => c.trim());
        const esCats = (r.category_es || r.category || "Uncategorized").split(',').map(c => c.trim());

        enCats.forEach((cat, idx) => {
            if (!acc[cat]) {
                acc[cat] = i18n.language === 'es' ? (esCats[idx] || cat) : cat;
            }
        });
        return acc;
    }, {} as Record<string, string>);

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
        : recipes.filter(recipe => {
            const recipeCats = (recipe.category || "Uncategorized").split(',').map(c => c.trim());
            return recipeCats.includes(selectedCategory);
        });

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
                        {category === "All" ? t('home.allCategories') : (categoryDisplayNames[category] || category).toUpperCase()}
                    </button>
                ))}
            </div>

            {/* Warnings Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {/* Dosage Disclaimer */}
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 font-pixel shadow-md relative" role="alert">
                    <p className="font-bold font-retro text-lg mb-1">{t('home.potencyTitle')}</p>
                    <p className="text-sm">
                        {t('home.potencyText')} <a href="/dosage-guide" className="underline font-bold hover:text-yellow-900">{t('home.dosageGuideLink')}</a> {t('home.potencyText2')}
                    </p>
                </div>

                {/* Decarb Disclaimer */}
                <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-800 p-4 font-pixel shadow-md relative" role="alert">
                    <p className="font-bold font-retro text-lg mb-1">{t('home.decarbTitle')}</p>
                    <p className="text-sm">
                        {t('home.decarbText')} <a href="/decarboxylation" className="underline font-bold hover:text-orange-950">{t('home.decarbLink')}</a>
                    </p>
                    <div className="absolute top-2 right-2 text-orange-300 opacity-50 select-none pointer-events-none">
                        🔥
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="font-retro text-black">{t('home.loading')}</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredRecipes.map((recipe) => {
                        // Handle multiple categories for display in the card
                        const enCats = (recipe.category || "Uncategorized").split(',').map(c => c.trim());
                        const esCats = (recipe.category_es || recipe.category || "Uncategorized").split(',').map(c => c.trim());
                        const displayCategory = i18n.language === 'es'
                            ? esCats.join(' & ')
                            : enCats.join(' & ');

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
