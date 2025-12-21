import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { pb } from '../lib/pocketbase';
import { LikeButton } from '../components/LikeButton';
import { Comments } from '../components/Comments';
import { ShareButtons } from '../components/ShareButtons';
import { IconHeart } from '../components/icons';

interface Recipe {
    id: string;
    title: string;
    category: string;
    difficulty: number;
    image: string;
    price: string;
    description: string;
    collectionId: string;
}

export function RecipeDetail() {
    const { id } = useParams<{ id: string }>();
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchRecipe() {
            if (!id) return;
            try {
                const record = await pb.collection('recipes').getOne<Recipe>(id);
                setRecipe(record);
            } catch (err) {
                console.error("Error fetching recipe:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchRecipe();
    }, [id]);

    if (loading) {
        return <div className="font-retro text-2xl text-center mt-10">Searching the archives...</div>;
    }

    if (!recipe) {
        return <div className="font-retro text-2xl text-center mt-10 text-red-500">Scroll not found!</div>;
    }

    const currentUrl = window.location.href;

    return (
        <div className="max-w-4xl mx-auto pb-10">
            <Link to="/" className="inline-block mb-4 font-retro hover:underline">&larr; BACK TO SCROLLS</Link>

            <div className="bg-white border-4 border-black p-6 md:p-8 shadow-hard mb-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-4 border-black pb-4 mb-6 gap-4">
                    <div>
                        <span className="font-pixel text-purple-retro uppercase tracking-widest text-sm block mb-1">{recipe.category}</span>
                        <h1 className="font-retro text-3xl md:text-5xl">{recipe.title}</h1>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <div className="flex gap-1" title={`Difficulty: ${recipe.difficulty}/5`}>
                            {[...Array(5)].map((_, i) => (
                                <IconHeart key={i} className={`w-6 h-6 ${i < recipe.difficulty ? "text-red-500 fill-current" : "text-gray-300"}`} />
                            ))}
                        </div>
                        <span className="font-retro text-xl bg-yellow-200 px-2 border-2 border-black inline-block transform rotate-[-2deg]">
                            {recipe.price}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Image Column */}
                    <div className="flex flex-col gap-4">
                        <div className="border-4 border-black aspect-square overflow-hidden bg-gray-100 relative">
                            <img
                                src={recipe.image}
                                alt={recipe.title}
                                className="w-full h-full object-cover"
                                style={{ imageRendering: 'pixelated' }}
                            />
                        </div>
                        <div className="flex justify-between items-center bg-gray-100 p-3 border-4 border-black">
                            <LikeButton recipeId={recipe.id} />
                            <ShareButtons title={recipe.title} url={currentUrl} />
                        </div>
                    </div>

                    {/* Content Column */}
                    <div className="flex flex-col gap-6">
                        <div>
                            <h2 className="font-retro text-2xl mb-2 decoration-slice underline decoration-4 decoration-[#4ade80]">DESCRIPTION</h2>
                            <p className="font-pixel text-lg leading-relaxed text-gray-800">
                                {recipe.description}
                            </p>
                        </div>

                        {/* Ingredients/Instructions Placeholder since schema is simple */}
                        <div className="bg-yellow-50 p-4 border-4 border-black border-dashed">
                            <h3 className="font-retro text-lg mb-2 text-gray-500 uppercase">Recipe Details</h3>
                            <p className="font-pixel text-sm text-gray-500 italic">
                                The ancient scroll is faded here... (Ingredients and Instructions are not yet deciphered in the database schema)
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Comments Section */}
            <Comments recipeId={recipe.id} />
        </div>
    );
}
