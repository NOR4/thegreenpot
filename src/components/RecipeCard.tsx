import { Link } from 'react-router-dom';
import { PixelButton } from './PixelButton';
import { IconHeart, IconStar } from './icons';

interface RecipeCardProps {
    id: string;
    title: string;
    image: string;
    difficulty: number; // 1-5
    price?: string;
    category: string;
    total_votes?: number;
}

export const RecipeCard = ({ id, title, image, difficulty, price, category, total_votes = 0 }: RecipeCardProps) => {
    return (
        <div className="w-full max-w-sm bg-gray-retro border-4 border-black p-4 flex flex-col gap-4 shadow-hard">
            {/* Card Header (Category) */}
            <div className="flex justify-between items-center border-b-4 border-black pb-2">
                <span className="font-pixel uppercase text-gray-500 tracking-wider text-lg">{category}</span>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                        <span className="font-retro text-sm text-gray-600">{total_votes}</span>
                        <IconHeart className="w-4 h-4 text-red-500 fill-current" />
                    </div>
                    {/* HP/Difficulty Bar */}
                    <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                            <IconStar
                                key={i}
                                className={`w-5 h-5 ${i < difficulty ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Card Image (Art) */}
            <div className="border-4 border-black bg-white aspect-square w-full overflow-hidden relative group">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                    style={{ imageRendering: 'pixelated' }}
                />
                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center font-retro text-white text-xs">
                    CLICK TO READ
                </div>
            </div>

            {/* Card Body */}
            <div className="flex-1 flex flex-col gap-2">
                <h3 className="font-retro text-lg truncate leading-tight mt-2">{title}</h3>
                <p className="font-pixel text-gray-600 leading-none">
                    A glorious concoction for your inventory.
                </p>
            </div>

            {/* Card Footer (Action) */}
            <div className="mt-2 text-center">
                <Link to={`/recipe/${id}`} className="block w-full">
                    <PixelButton fullWidth size="md">
                        VIEW RECIPE {price && `(${price})`}
                    </PixelButton>
                </Link>
            </div>
        </div>
    );
};
