import { useState, useEffect } from 'react';
import { pb } from '../lib/pocketbase';
import { IconHeart } from './icons';
import { PixelButton } from './PixelButton';
import { cn } from '../utils/cn';
import { useAuth } from '../contexts/AuthContext';

interface LikeButtonProps {
    recipeId: string;
    initialLikes?: number;
}

export const LikeButton = ({ recipeId, initialLikes = 0 }: LikeButtonProps) => {
    const { user, openAuthModal } = useAuth();
    const [likes, setLikes] = useState(initialLikes);
    const [hasLiked, setHasLiked] = useState(false);
    const [loading, setLoading] = useState(false);

    // Initial fetch - could be improved by checking if user liked in DB if we had a likes collection
    // For now assuming we just show total counts and local state for session or we need a real 'likes' collection relation?
    // Since PocketBase 'total_votes' is just a counter, we can't easily know if *this* user liked it persistently without a new collection.
    // For MVP, I will keep the localStorage check but GATE the action on login.
    const storageKey = `voted_${recipeId}`;

    useEffect(() => {
        const voted = localStorage.getItem(storageKey) === 'true';
        setHasLiked(voted);

        async function fetchLikeCount() {
            try {
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
        if (!user) {
            openAuthModal();
            return;
        }

        setLoading(true);
        try {
            if (hasLiked) {
                await pb.collection('recipes').update(recipeId, {
                    'total_votes-': 1
                });
                localStorage.removeItem(storageKey);
                setHasLiked(false);
                setLikes(p => Math.max(0, p - 1));
            } else {
                await pb.collection('recipes').update(recipeId, {
                    'total_votes+': 1
                });
                localStorage.setItem(storageKey, 'true');
                setHasLiked(true);
                setLikes(p => p + 1);
            }
        } catch (err) {
            console.error("Failed to toggle like:", err);
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
