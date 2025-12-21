import { useState, useEffect } from 'react';
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
}

export function Home() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);

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

    return (
        <div className="mb-8">
            <h2 className="font-retro text-xl mb-4 text-purple-retro">LATEST SCROLLS</h2>
            {loading ? (
                <div className="font-retro text-black">Loading scrolls...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {recipes.map((recipe) => (
                        <RecipeCard
                            key={recipe.id}
                            id={recipe.id}
                            title={recipe.title}
                            category={recipe.category}
                            difficulty={recipe.difficulty}
                            image={recipe.image}
                            price={recipe.price}
                            total_votes={recipe.total_votes}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
