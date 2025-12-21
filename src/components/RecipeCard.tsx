
import { PixelButton } from './PixelButton';
import { IconHeart } from './icons';

interface RecipeCardProps {
    title: string;
    image: string;
    difficulty: number; // 1-5
    price?: string;
    category: string;
}

export const RecipeCard = ({ title, image, difficulty, price, category }: RecipeCardProps) => {
    return (
        <div className="w-full max-w-sm bg-gray-retro border-4 border-black p-4 flex flex-col gap-4 shadow-hard">
            {/* Card Header (Category) */}
            <div className="flex justify-between items-center border-b-4 border-black pb-2">
                <span className="font-pixel uppercase text-gray-500 tracking-wider text-lg">{category}</span>
                <div className="flex gap-1">
                    {/* HP/Difficulty Bar */}
                    {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < difficulty ? "text-red-500" : "text-gray-300"}>
                            <IconHeart className="w-5 h-5" />
                        </span>
                    ))}
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
                <PixelButton fullWidth size="md">
                    VIEW RECIPE {price && `(${price})`}
                </PixelButton>
            </div>
        </div>
    );
};
