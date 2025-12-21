import { useState, useEffect } from 'react';
import { pb } from '../lib/pocketbase';
import { IconHeart } from './icons';
import { PixelButton } from './PixelButton';
import { cn } from '../utils/cn';

interface LikeButtonProps {
    recipeId: string;
    initialLikes?: number;
}

export const LikeButton = ({ recipeId, initialLikes = 0 }: LikeButtonProps) => {
    const [likes, setLikes] = useState(initialLikes);
    const [hasLiked, setHasLiked] = useState(false);
    const [loading, setLoading] = useState(false);

    // Persistence key for localStorage
    const storageKey = `voted_${recipeId}`;

    useEffect(() => {
        // Check if user has already voted in this browser
        const voted = localStorage.getItem(storageKey) === 'true';
        setHasLiked(voted);

        async function fetchLikeCount() {
            try {
                // Fetch the latest count from the recipe record itself
                const record = await pb.collection('recipes').getOne(recipeId, {
                    fields: 'total_votes'
                });
                setLikes(record.total_votes || 0);
            } catch (err) {
                console.error("Error fetching like count:", err);
            }
        }

        fetchLikeCount();
    }, [recipeId, storageKey]);

    const handleToggleLike = async () => {
        setLoading(true);
        try {
            if (hasLiked) {
                // Unvote - decrement total_votes
                await pb.collection('recipes').update(recipeId, {
                    'total_votes-': 1
                });
                localStorage.removeItem(storageKey);
                setHasLiked(false);
                setLikes(p => Math.max(0, p - 1));
            } else {
                // Vote - increment total_votes
                await pb.collection('recipes').update(recipeId, {
                    'total_votes+': 1
                });
                localStorage.setItem(storageKey, 'true');
                setHasLiked(true);
                setLikes(p => p + 1);
            }
        } catch (err) {
            console.error("Failed to toggle like:", err);
            alert("Failed to update vote. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <PixelButton
            onClick={handleToggleLike}
            disabled={loading}
            className={cn(
                "flex items-center gap-2 transition-colors",
                hasLiked ? "bg-pink-200 hover:bg-pink-300" : "bg-white hover:bg-gray-100"
            )}
        >
            <IconHeart className={cn("w-5 h-5", hasLiked ? "text-red-500 fill-current" : "text-black")} />
            <span>{likes} VOTES</span>
        </PixelButton>
    );
};
