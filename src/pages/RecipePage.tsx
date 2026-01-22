import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { pb } from '../lib/pocketbase';
import { ShareButtons } from '../components/ShareButtons';
import { LikeButton } from '../components/LikeButton';
import { Comments } from '../components/Comments';
import { IconHeart, IconExternalLink, IconCheck, IconClock, IconBag, IconStar, IconChevronDown, IconChevronUp } from '../components/icons';
import { cn } from '../utils/cn';
import { parseIngredientName } from '../utils/ingredients';
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
    description: string;
    description_es?: string;
    time: string;
    total_votes: number;
    ingredients_text: string[];
    ingredients_text_es?: string[];
    instructions: string[];
    instructions_es?: string[];
    collectionId: string;
    expand?: {
        products?: AffiliateProduct[];
        ingredients?: BaseIngredient[];
    };
    ingredients_json?: string[];
}

interface BaseIngredient {
    id: string;
    name: string;
    name_es?: string;
    description: string;
    description_es?: string;
    image: string;
    category: string;
    category_es?: string;
    calories?: number;
    allergies?: string;
    rarity: string;
    thc_mg?: number;
}

interface AffiliateProduct {
    id: string;
    name: string;
    image: string;
    affiliate_link: string;
    price?: string;
}

export function RecipePage() {
    const { t, i18n } = useTranslation();
    const { id } = useParams<{ id: string }>();
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [products, setProducts] = useState<AffiliateProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [checkedStep, setCheckedStep] = useState<number[]>([]);
    const [isIngredientsOpen, setIsIngredientsOpen] = useState(false);
    const [isStepsOpen, setIsStepsOpen] = useState(false);
    const currentLang = i18n.language;

    useEffect(() => {
        async function fetchData() {
            if (!id) return;
            try {
                // Fetch Recipe with expanded ingredients
                const record = await pb.collection('recipes').getOne<Recipe>(id, {
                    expand: 'ingredients'
                });

                // Check if ingredients relation is populated
                const rRelation = record.expand?.ingredients;
                const hasRelationData = Array.isArray(rRelation) && rRelation.length > 0;

                if (!hasRelationData) {
                    // Fallback: Check for JSON ingredients list
                    const ingredientIds = record.ingredients_json;
                    if (Array.isArray(ingredientIds) && ingredientIds.length > 0) {
                        const filter = ingredientIds.map(fid => `id="${fid}"`).join(' || ');
                        try {
                            const ingredients = await pb.collection('ingredients').getFullList<BaseIngredient>({
                                filter: filter,
                            });
                            if (!record.expand) record.expand = {};
                            record.expand.ingredients = ingredients;
                        } catch (ingErr) {
                            console.error("Failed to fetch ingredients manually:", ingErr);
                        }
                    }
                }

                console.log("RecipePage - Fetched record:", record);
                setRecipe(record);

                // Fetch products independently to ensure they appear even if recipe fetch has issues
                try {
                    const productsResult = await pb.collection('products').getList<AffiliateProduct>(1, 50, {
                        sort: '@random' // Some PB versions support this, if not we shuffle manually
                    });

                    if (productsResult.items.length > 0) {
                        const shuffled = [...productsResult.items].sort(() => 0.5 - Math.random());
                        setProducts(shuffled.slice(0, 4));
                        console.log("RecipePage - Loaded products:", shuffled.length);
                    } else {
                        console.log("RecipePage - No products found in DB");
                    }
                } catch (prodErr) {
                    console.error("RecipePage - Error fetching products:", prodErr);
                }

            } catch (err) {
                console.error("RecipePage - Error fetching recipe data:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [id]);

    const handleProductClick = async (productId: string) => {
        try {
            await pb.collection('products').update(productId, {
                'clicks+': 1
            });
        } catch (err) {
            console.error("Failed to track click:", err);
        }
    };

    const toggleStep = (index: number) => {
        setCheckedStep(prev =>
            prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        );
    };

    if (loading) {
        return <div className="font-retro text-2xl text-center mt-10">{t('recipePage.loading')}</div>;
    }

    if (!recipe) {
        return <div className="font-retro text-2xl text-center mt-10 text-red-500">{t('recipePage.notFound')}</div>;
    }

    const currentUrl = window.location.href;

    // Calculate dietary info
    const totalCalories = recipe.expand?.ingredients?.reduce((sum, ing) => sum + (ing.calories || 0), 0) || 0;
    const uniqueAllergens = Array.from(new Set(
        recipe.expand?.ingredients
            ?.flatMap(ing => ing.allergies ? ing.allergies.split(',').map(a => a.trim()) : [])
            .filter(a => a && a.toLowerCase() !== 'none')
        || []));

    return (
        <div className="max-w-7xl mx-auto pb-10">
            <Link to="/" className="inline-block mb-4 font-retro hover:underline text-lg">{t('recipePage.backLink')}</Link>

            <div className="bg-gray-800 text-white border-4 border-black p-6 mb-8 shadow-hard">
                <div className="flex flex-col gap-2 mb-4">
                    <span className="font-pixel text-yellow-400 uppercase tracking-widest text-sm">
                        {(() => {
                            const enCats = (recipe.category || "Uncategorized").split(',').map(c => c.trim());
                            const esCats = (recipe.category_es || recipe.category || "Uncategorized").split(',').map(c => c.trim());
                            return currentLang === 'es' ? esCats.join(' & ') : enCats.join(' & ');
                        })()} {t('recipePage.quest')}
                    </span>
                    <h1 className="font-retro text-4xl md:text-6xl text-white drop-shadow-md leading-none">{getLocalizedField(recipe.title, recipe.title_es, currentLang)}</h1>
                </div>

                <div className="flex flex-wrap gap-6 md:gap-12 mt-6 border-t-2 border-gray-600 pt-4">
                    <div className="flex items-center gap-3">
                        <div className="flex gap-1" title={`Difficulty: ${recipe.difficulty}/5`}>
                            {[...Array(5)].map((_, i) => (
                                <IconStar key={i} className={`w-6 h-6 ${i < recipe.difficulty ? "text-yellow-400 fill-current" : "text-gray-600"}`} />
                            ))}
                        </div>
                        <span className="font-pixel text-gray-400 text-sm">{t('recipePage.difficulty')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <IconHeart className="w-6 h-6 text-red-500" />
                        <span className="font-retro text-xl">{recipe.total_votes || 0} {t('recipePage.votes')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <IconClock className="w-6 h-6 text-blue-400" />
                        <span className="font-retro text-xl">{recipe.time || 'Unknown'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <IconBag className="w-6 h-6 text-yellow-400" />
                        <span className="font-retro text-xl">{Array.isArray(recipe.ingredients_text) ? recipe.ingredients_text.length : 0} {t('recipePage.itemsNeeded')}</span>
                    </div>

                    {/* Dietary Info */}
                    {totalCalories > 0 && (
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">🔥🔥</span>
                            <span className="font-retro text-xl">{totalCalories} {t('recipePage.cal')}</span>
                        </div>
                    )}
                    {uniqueAllergens.length > 0 && (
                        <div className="flex items-center gap-2 px-3 py-1 bg-red-900/50 border-2 border-red-500 text-red-200">
                            <span className="text-xl">⚠️</span>
                            <span className="font-pixel text-sm uppercase">{t('recipePage.contains')}: {uniqueAllergens.join(', ')}</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 flex flex-col gap-8">
                    <div className="border-4 border-black aspect-video overflow-hidden bg-gray-900 shadow-hard relative">
                        <img
                            src={recipe.image ? pb.files.getURL(recipe, recipe.image) : ''}
                            alt={recipe.title}
                            className="w-full h-full object-cover"
                            style={{ imageRendering: 'pixelated' }}
                        />
                        <div className="absolute bottom-0 right-0 bg-black/70 p-2 border-t-4 border-l-4 border-black">
                            <span className="font-retro text-white text-lg">{recipe.price} {t('recipePage.reward')}</span>
                        </div>
                    </div>

                    <div className="bg-white border-4 border-black p-6 shadow-hard">
                        <h2 className="font-retro text-2xl mb-4 border-b-4 border-black inline-block pr-8 bg-green-200 text-black">{t('recipePage.scrollSays')}</h2>
                        <p className="font-pixel text-lg leading-relaxed text-gray-800">
                            {getLocalizedField(recipe.description, recipe.description_es, currentLang)}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-4 items-center">
                            <LikeButton recipeId={id!} />
                            <div className="h-8 w-1 bg-gray-300 mx-2 hidden md:block"></div>
                            <ShareButtons title={getLocalizedField(recipe.title, recipe.title_es, currentLang)} url={currentUrl} />
                        </div>
                    </div>

                    <div className="bg-[#fdf6e3] border-4 border-black p-6 shadow-hard transition-all">
                        <div
                            className="flex items-center justify-between cursor-pointer select-none"
                            onClick={() => setIsIngredientsOpen(!isIngredientsOpen)}
                        >
                            <h2 className="font-retro text-2xl flex items-center gap-3 text-black">
                                <span className="bg-black text-white px-2 py-1">!</span>
                                {t('recipePage.requiredMaterials')}
                            </h2>
                            {isIngredientsOpen ? (
                                <IconChevronUp className="w-8 h-8 text-black" />
                            ) : (
                                <IconChevronDown className="w-8 h-8 text-black" />
                            )}
                        </div>

                        {isIngredientsOpen && (
                            <div className="mt-6 animate-in slide-in-from-top-2 duration-300">
                                <div className="flex flex-col gap-4">
                                    {Array.isArray(recipe.ingredients_text) && recipe.ingredients_text.length > 0 ? (
                                        getLocalizedField(recipe.ingredients_text, recipe.ingredients_text_es, currentLang).map((item, idx) => {
                                            // Find matching ingredient data
                                            const parsedName = parseIngredientName(item);
                                            const match = recipe.expand?.ingredients?.find(ing =>
                                                ing.name.toLowerCase() === parsedName.toLowerCase() ||
                                                ing.name_es?.toLowerCase() === parsedName.toLowerCase()
                                            );

                                            return (
                                                <div key={idx} className="flex flex-col gap-2 p-2 hover:bg-black/5 transition-colors border-b border-dashed border-gray-300 last:border-0 pb-4 last:pb-2">
                                                    {/* Material Checkbox Line */}
                                                    <label className="flex items-start gap-3 cursor-pointer group select-none">
                                                        <input type="checkbox" className="peer sr-only" />
                                                        <div className="w-6 h-6 border-4 border-black bg-white peer-checked:bg-[#4ade80] flex items-center justify-center transition-colors mt-1 flex-shrink-0">
                                                            <IconCheck className="w-4 h-4 text-black opacity-0 peer-checked:opacity-100" />
                                                        </div>
                                                        <span className="font-pixel text-lg group-hover:underline decoration-2 text-black leading-snug">{item}</span>
                                                    </label>

                                                    {/* Matched Stats Card - Embedded */}
                                                    {match && (
                                                        <Link
                                                            to={`/ingredient/${match.id}`}
                                                            className="ml-9 flex items-center gap-3 bg-white border-2 border-black p-2 max-w-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all group/card"
                                                        >
                                                            <div className="w-12 h-12 border-2 border-black overflow-hidden bg-gray-100 flex-shrink-0">
                                                                <img
                                                                    src={match.image ? pb.files.getURL(match, match.image) : ''}
                                                                    alt={match.name}
                                                                    className="w-full h-full object-cover"
                                                                    style={{ imageRendering: 'pixelated' }}
                                                                />
                                                            </div>
                                                            <div className="flex flex-col flex-1 min-w-0">
                                                                <div className="flex items-center gap-2">
                                                                    <span className="font-retro text-sm uppercase text-purple-700 group-hover/card:underline">{match.name}</span>
                                                                    <span className="text-[10px] font-pixel bg-gray-200 px-1 border border-gray-300 text-gray-600">{match.rarity}</span>
                                                                </div>

                                                                <div className="flex flex-wrap gap-2 mt-1">
                                                                    {match.thc_mg && match.thc_mg > 0 ? (
                                                                        <span className="text-[10px] font-pixel bg-green-100 text-green-800 px-1 border border-green-200">
                                                                            🌿 {match.thc_mg}mg THC
                                                                        </span>
                                                                    ) : null}
                                                                    {match.calories ? (
                                                                        <span className="text-[10px] font-pixel bg-orange-100 text-orange-800 px-1 border border-orange-200">
                                                                            🔥 {match.calories} cal
                                                                        </span>
                                                                    ) : null}
                                                                </div>
                                                            </div>
                                                            <IconExternalLink className="w-4 h-4 text-gray-400 group-hover/card:text-black" />
                                                        </Link>
                                                    )}
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <p className="font-pixel text-gray-500 italic">{t('recipePage.noMaterials')}</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="bg-white border-4 border-black p-6 shadow-hard transition-all">
                        <div
                            className="flex items-center justify-between cursor-pointer select-none"
                            onClick={() => setIsStepsOpen(!isStepsOpen)}
                        >
                            <h2 className="font-retro text-2xl text-black">{t('recipePage.questSteps')}</h2>
                            {isStepsOpen ? (
                                <IconChevronUp className="w-8 h-8 text-black" />
                            ) : (
                                <IconChevronDown className="w-8 h-8 text-black" />
                            )}
                        </div>

                        {isStepsOpen && (
                            <div className="mt-6 flex flex-col gap-6 animate-in slide-in-from-top-2 duration-300">
                                {Array.isArray(recipe.instructions) && recipe.instructions.length > 0 ? (
                                    recipe.instructions.map((step, idx) => (
                                        <div
                                            key={idx}
                                            onClick={() => toggleStep(idx)}
                                            className={cn(
                                                "flex gap-4 p-4 border-2 border-dashed transition-all cursor-pointer",
                                                checkedStep.includes(idx) ? "bg-gray-100 border-gray-400 opacity-60" : "bg-white border-black hover:bg-gray-50"
                                            )}
                                        >
                                            <div className={cn(
                                                "font-retro text-2xl w-10 h-10 flex-shrink-0 flex items-center justify-center border-2 border-black",
                                                checkedStep.includes(idx) ? "bg-gray-400 text-white" : "bg-black text-white"
                                            )}>
                                                {idx + 1}
                                            </div>
                                            <p className={cn(
                                                "font-pixel text-lg leading-snug pt-1",
                                                checkedStep.includes(idx) ? "line-through text-gray-500" : "text-black"
                                            )}>
                                                {step}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="font-pixel text-gray-500 italic">{t('recipePage.noSteps')}</p>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="bg-white border-4 border-black p-6 shadow-hard">
                        <Comments recipeId={id!} />
                    </div>
                </div>

                <div className="lg:col-span-1 lg:sticky lg:top-4 z-10">
                    <div className="bg-[#444] border-4 border-black p-1 shadow-hard">
                        <div className="bg-gray-800 border-2 border-gray-600 p-4 mb-1">
                            <h3 className="font-retro text-xl text-yellow-400 text-center tracking-widest animate-pulse">
                                {t('recipePage.merchantWares')}
                            </h3>
                            <p className="font-pixel text-xs text-center text-gray-400 mt-1">
                                {t('recipePage.rareLoot')}
                            </p>
                        </div>

                        <div className="flex flex-col gap-4 p-2 bg-gray-700/50">
                            {products.length > 0 ? (
                                products.map((product) => {
                                    const isAmazon = product.affiliate_link?.includes('amazon') || product.affiliate_link?.includes('amzn');
                                    const isTemu = product.affiliate_link?.includes('temu');

                                    const buttonStyles = isAmazon
                                        ? "bg-[#232F3E] text-white hover:bg-[#37475A]"
                                        : isTemu
                                            ? "bg-[#FB7701] text-white hover:bg-[#ff8c33]"
                                            : "bg-yellow-400 text-black hover:bg-yellow-300";

                                    return (
                                        <div key={product.id} className={cn(
                                            "border-4 p-3 flex flex-col gap-3 group hover:translate-x-1 transition-transform relative",
                                            isAmazon ? "bg-blue-50 border-[#00a8e1]" : isTemu ? "bg-orange-50 border-[#ff6900]" : "bg-white border-black"
                                        )}>
                                            {/* Source Badge */}
                                            <div className={cn(
                                                "absolute -top-3 -right-3 font-pixel text-[10px] px-2 py-1 border-2 border-black rotate-12 group-hover:rotate-0 transition-transform z-20",
                                                isAmazon ? "bg-[#00a8e1] text-white" : isTemu ? "bg-[#ff6900] text-white" : "bg-black text-white"
                                            )}>
                                                {isAmazon ? 'AMAZON' : isTemu ? 'TEMU' : 'LINK'}
                                            </div>

                                            <div className="aspect-square bg-white border-2 border-black overflow-hidden relative">
                                                <img
                                                    src={product.image ? pb.files.getURL(product, product.image) : ''}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover"
                                                    style={{ imageRendering: 'pixelated' }}
                                                />
                                                {product.price && (
                                                    <span className="absolute top-1 right-1 bg-black text-white font-retro text-xs px-1 border border-white/20">
                                                        {product.price}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-center">
                                                <h4 className="font-retro text-lg leading-tight mb-3 min-h-[3rem] flex items-center justify-center text-black">
                                                    {product.name}
                                                </h4>
                                                <a
                                                    href={product.affiliate_link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={() => handleProductClick(product.id)}
                                                    className={cn(
                                                        "flex items-center justify-center gap-2 border-4 border-black font-bold font-pixel uppercase py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all w-full text-sm",
                                                        buttonStyles
                                                    )}
                                                >
                                                    <span>{t('recipePage.getLoot')}</span>
                                                    <IconExternalLink className="w-4 h-4" />
                                                </a>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="text-center py-4 text-gray-400 font-pixel">
                                    {t('recipePage.noWares')}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
