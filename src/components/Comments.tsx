import { useState, useEffect } from 'react';
import { pb } from '../lib/pocketbase';
import { PixelButton } from './PixelButton';
import { useAuth } from '../contexts/AuthContext';

interface Comment {
    id: string;
    text: string;
    created: string;
    expand?: {
        user?: {
            username: string;
            email: string;
        }
    }
}

interface CommentsProps {
    recipeId: string;
}

export const Comments = ({ recipeId }: CommentsProps) => {
    const { user, openAuthModal } = useAuth();
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchComments();
    }, [recipeId]);

    async function fetchComments() {
        try {
            const result = await pb.collection('comments').getList<Comment>(1, 50, {
                filter: `recipe = "${recipeId}"`,
                sort: '-created',
                expand: 'user'
            });
            setComments(result.items);
        } catch (err) {
            console.error("Error fetching comments:", err);
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        if (!user) {
            openAuthModal();
            return;
        }

        setLoading(true);
        try {
            await pb.collection('comments').create({
                recipe: recipeId,
                user: user.id,
                text: newComment
            });
            setNewComment('');
            fetchComments(); // Refresh list
        } catch (err) {
            console.error("Error posting comment:", err);
            alert("Failed to post comment.");
        } finally {
            setLoading(false);
        }
    };

    // Handler for clicking the textarea when not logged in
    const handleAuthClick = () => {
        if (!user) {
            openAuthModal();
        }
    };

    return (
        <div className="flex flex-col gap-6 w-full">
            <h3 className="font-retro text-xl border-b-4 border-black pb-2">TAVERN CHATTER</h3>

            {/* Comment Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-gray-100 p-4 border-4 border-black shadow-hard">
                {!user && (
                    <div className="font-pixel text-red-500 text-sm mb-2 cursor-pointer hover:underline" onClick={openAuthModal}>
                        * You must be logged in to scribble a note. Click here to login.
                    </div>
                )}
                <div onClick={handleAuthClick} className="w-full">
                    <textarea
                        className={`font-pixel p-3 border-4 border-black min-h-[100px] resize-y focus:outline-none focus:bg-white w-full ${!user ? 'bg-gray-200 cursor-pointer pointer-events-none' : 'bg-white'}`}
                        placeholder="Leave a note for the chef..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        disabled={loading}
                    />
                </div>
                <div className="flex justify-end">
                    <PixelButton type="submit" disabled={loading || !newComment.trim()}>
                        {loading ? 'SCRIBBLING...' : 'POST NOTE'}
                    </PixelButton>
                </div>
            </form>

            {/* Comments List */}
            <div className="flex flex-col gap-4">
                {comments.length === 0 ? (
                    <p className="font-pixel text-gray-500 italic">No chatter yet based on this scroll.</p>
                ) : (
                    comments.map((comment) => (
                        <div key={comment.id} className="bg-white border-4 border-black p-4 shadow-sm">
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-retro text-purple-retro text-sm">
                                    {comment.expand?.user?.username || comment.expand?.user?.email || 'Anonymous Adventurer'}
                                </span>
                                <span className="font-pixel text-xs text-gray-400">
                                    {new Date(comment.created).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="font-pixel text-gray-800 break-words">{comment.text}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
