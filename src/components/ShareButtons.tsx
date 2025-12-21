import { PixelButton } from './PixelButton';

interface ShareButtonsProps {
    title: string;
    url: string;
}

export const ShareButtons = ({ title, url }: ShareButtonsProps) => {

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'The Green Pot Recipe',
                    text: `Check out this recipe: ${title}`,
                    url: url
                });
            } catch (err) {
                console.log("Share cancelled or failed", err);
            }
        } else {
            // Fallback: Copy to clipboard
            try {
                await navigator.clipboard.writeText(url);
                alert("Link copied to clipboard!");
            } catch (err) {
                console.error("Failed to copy link", err);
            }
        }
    };

    const shareTwitter = () => {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out ${title}`)}&url=${encodeURIComponent(url)}`, '_blank');
    };

    const shareFacebook = () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    };

    return (
        <div className="flex flex-wrap gap-2">
            <PixelButton size="sm" onClick={handleShare} className="bg-blue-400 hover:bg-blue-500 text-white">
                SHARE
            </PixelButton>
            <PixelButton size="sm" onClick={shareTwitter} className="bg-sky-500 hover:bg-sky-600 text-white hidden sm:flex">
                TWITTER
            </PixelButton>
            <PixelButton size="sm" onClick={shareFacebook} className="bg-blue-600 hover:bg-blue-700 text-white hidden sm:flex">
                FACEBOOK
            </PixelButton>
            <PixelButton size="sm" onClick={() => window.open('https://instagram.com', '_blank')} className="bg-pink-500 hover:bg-pink-600 text-white hidden sm:flex">
                INSTAGRAM
            </PixelButton>
        </div>
    );
};
