
import { PixelButton } from './PixelButton';
import { IconSword, IconMoodSad } from './icons';

interface AgeGateProps {
    onVerify?: () => void;
}

export const AgeGate = ({ onVerify }: AgeGateProps) => {
    // Simple state usage for MVP demo purpose in App, but here just UI.
    // In a real app, this would control visibility via context or local state.

    const handleEnter = () => {
        console.log("Player entered the dungeon");
        if (onVerify) onVerify();
    };

    const handleExit = () => {
        window.location.href = "https://google.com";
    };

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white p-4">
            <div className="max-w-2xl w-full flex flex-col items-center gap-8 text-center animate-pulse-slow">
                <h1 className="font-retro text-4xl md:text-6xl text-[#4ade80] animate-pulse mb-8 tracking-widest leading-relaxed">
                    INSERT COIN <br /> TO START
                </h1>

                <div className="font-pixel text-2xl text-gray-400 mb-12">
                    ARE YOU OVER 18 YEARS OLD?
                </div>

                <div className="flex flex-col md:flex-row gap-6 w-full max-w-lg">
                    <PixelButton
                        variant="primary"
                        size="lg"
                        fullWidth
                        onClick={handleEnter}
                        className="text-lg"
                    >
                        <IconSword className="w-6 h-6" />
                        I AM +18
                    </PixelButton>

                    <PixelButton
                        variant="secondary"
                        size="lg"
                        fullWidth
                        onClick={handleExit}
                        className="text-lg !bg-gray-800 !text-white !border-white hover:!bg-gray-700 hover:!text-white"
                    >
                        <IconMoodSad className="w-6 h-6" />
                        EXIT GAME
                    </PixelButton>
                </div>
            </div>
        </div>
    );
};
